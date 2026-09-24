import { supabase, isSupabaseConfigured } from '../lib/supabaseClient';

export async function fetchMasterPlans() {
  if (!isSupabaseConfigured) {
    // Return sample local master plan
    return [
      {
        id: 'plan-default-1',
        productId: 'prod-vibehost',
        productName: 'Vibe Host',
        ownerId: 'mem-chau',
        ownerName: 'Lê Phạm Minh Châu',
        approverId: 'mem-thinh',
        approverName: 'Lâm Quang Thịnh',
        title: 'Chiến dịch Ra mắt Vibe Host Siêu Tốc',
        status: 'pending_approval',
        targetSql: 140,
        targetLeads: 850,
        budget: 15000000,
        timelineDays: 14,
        keyMessage: 'Hosting chuẩn tốc độ tải trang dưới 0.8s',
        versionHash: 'hash_v1_init_8832',
        createdAt: new Date().toISOString()
      }
    ];
  }

  const { data, error } = await supabase
    .from('master_plans')
    .select(`
      *,
      products (name, brand),
      owner:users!owner_id (full_name),
      approver:users!approver_id (full_name),
      campaigns (*)
    `)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Lỗi fetch master_plans:', error);
    return [];
  }

  return data.map(p => ({
    id: p.id,
    productId: p.product_id,
    productName: p.products?.name,
    ownerId: p.owner_id,
    ownerName: p.owner?.full_name,
    approverId: p.approver_id,
    approverName: p.approver?.full_name,
    title: p.title,
    status: p.status,
    targetSql: p.target_sql,
    targetLeads: p.target_leads,
    budget: p.budget,
    timelineDays: p.timeline_days,
    keyMessage: p.key_message,
    versionHash: p.version_hash,
    rejectReason: p.reject_reason,
    subCampaigns: p.campaigns || [],
    createdAt: p.created_at,
    approvedAt: p.approved_at
  }));
}

export async function createMasterPlan(planData) {
  const versionHash = 'hash_' + Date.now().toString(36) + '_' + Math.random().toString(36).substring(2, 7);

  if (!isSupabaseConfigured) {
    return {
      ...planData,
      id: 'plan-' + Date.now(),
      status: 'pending_approval',
      versionHash,
      createdAt: new Date().toISOString()
    };
  }

  const isUuid = (str) => /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(str);

  // 1. Chèn Master Plan vào Supabase
  const planPayload = {
    status: 'pending_approval',
    target_sql: planData.targetSql || (parseInt(planData.targetKpi) || 150),
    budget: typeof planData.budget === 'number' ? planData.budget : (parseInt(String(planData.budget).replace(/[^0-9]/g, '')) || 15000000),
    version_hash: versionHash
  };

  if (planData.productId && isUuid(planData.productId)) {
    planPayload.product_id = planData.productId;
  }

  const { data: planRecord, error: planError } = await supabase
    .from('master_plans')
    .insert([planPayload])
    .select()
    .single();

  if (planError) {
    console.error('Lỗi khi INSERT master_plans vào Supabase:', planError);
    return {
      ...planData,
      id: 'plan-' + Date.now(),
      status: 'pending_approval',
      versionHash,
      createdAt: new Date().toISOString()
    };
  }

  console.log('⚡ [Supabase Live] Đã INSERT thành công Master Plan vào Database:', planRecord);

  // 2. Chèn 2 chiến dịch con vào bảng campaigns
  if (planRecord?.id && planData.subCampaigns && planData.subCampaigns.length > 0) {
    try {
      const campRecords = planData.subCampaigns.map(camp => ({
        plan_id: planRecord.id,
        funnel_stage: camp.name?.toLowerCase().includes('teasing') ? 'teasing' : 'retargeting',
        kpi_allocation: typeof camp.kpi === 'number' ? camp.kpi : (parseInt(String(camp.kpi).replace(/[^0-9]/g, '')) || 30),
        budget_allocation: typeof camp.budget === 'number' ? camp.budget : (parseInt(String(camp.budget).replace(/[^0-9]/g, '')) || 5000000)
      }));

      await supabase.from('campaigns').insert(campRecords);
      console.log('⚡ [Supabase Live] Đã INSERT sub-campaigns vào Database:', campRecords);
    } catch (cErr) {
      console.warn('Lỗi chèn campaigns con:', cErr);
    }
  }

  return {
    ...planData,
    id: planRecord.id,
    status: planRecord.status,
    versionHash: planRecord.version_hash,
    createdAt: planRecord.created_at
  };
}

/**
 * Phê duyệt Master Plan kèm Khóa Lạc Quan (Optimistic Concurrency Control)
 * @param {string} planId 
 * @param {string} currentVersionHash - Mã hash lúc người duyệt đọc thẻ trên Teams
 * @param {string} approverId 
 */
export async function approveMasterPlanWithLock(planId, currentVersionHash, approverId = 'mem-thinh') {
  if (!isSupabaseConfigured) {
    return {
      id: planId,
      status: 'approved',
      approvedAt: new Date().toISOString()
    };
  }

  // Cập nhật kèm điều kiện version_hash phải KHỚP
  const { data, error } = await supabase
    .from('master_plans')
    .update({
      status: 'approved',
      approved_at: new Date().toISOString()
    })
    .eq('id', planId)
    .eq('version_hash', currentVersionHash) // <--- CHECK KHÓA LẠC QUAN CHỐNG DUYỆT ĐÈ
    .select();

  if (error) {
    console.error('Lỗi khi approve master plan:', error);
    throw error;
  }

  if (!data || data.length === 0) {
    throw new Error(
      '⚠️ XUNG ĐỘT PHIÊN BẢN (Optimistic Lock Error): ' +
      'Kế hoạch này đã được chỉnh sửa lại sau khi thẻ phê duyệt được gửi đi. ' +
      'Vui lòng mở lại bản cập nhật mới nhất trên Growth-loop để kiểm tra trước khi duyệt!'
    );
  }

  return data[0];
}

/**
 * Từ chối Master Plan kèm lý do
 */
export async function rejectMasterPlan(planId, currentVersionHash, rejectReason) {
  if (!isSupabaseConfigured) {
    return {
      id: planId,
      status: 'rejected',
      rejectReason
    };
  }

  const { data, error } = await supabase
    .from('master_plans')
    .update({
      status: 'rejected',
      reject_reason: rejectReason
    })
    .eq('id', planId)
    .eq('version_hash', currentVersionHash)
    .select();

  if (error) throw error;
  return data[0];
}
