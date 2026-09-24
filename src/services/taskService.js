import { supabase, isSupabaseConfigured } from '../lib/supabaseClient';
import { DASHBOARD_DATA } from '../data/mockData';

export async function fetchTasks() {
  if (!isSupabaseConfigured) {
    return DASHBOARD_DATA.teamTasks || [];
  }

  const { data, error } = await supabase
    .from('tasks')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Lỗi khi fetch tasks từ Supabase, fallback sang mock:', error);
    return DASHBOARD_DATA.teamTasks || [];
  }

  if (!data || data.length === 0) {
    return DASHBOARD_DATA.teamTasks || [];
  }

  const teamRoster = [
    { name: 'Hoàng Minh Khôi', role: 'Social Executive' },
    { name: 'Nguyễn Duy Quý', role: 'Intern' },
    { name: 'Nguyễn Ngọc Khánh', role: 'Marketing Executive' },
    { name: 'Lê Phạm Minh Châu', role: 'Senior Growth Executive' },
    { name: 'Võ Thị Thu Hiền', role: 'SEO Executive' }
  ];

  return data.map((t, idx) => {
    const member = teamRoster[idx % teamRoster.length];
    return {
      id: t.id,
      title: t.title,
      stage: t.stage || 'not_started',
      type: t.task_type || 'Content',
      team: t.task_type || 'Content',
      campaign: 'Kế hoạch Mắt Bão',
      brand: idx % 2 === 0 ? 'MBC' : 'MBI',
      assignee: member.name,
      assigneeRole: member.role,
      dueDate: t.due_date,
      deadline: t.due_date ? new Date(t.due_date).toLocaleDateString('vi-VN') : '15/10/2026',
      isOverdue: t.due_date ? new Date(t.due_date) < new Date() : false,
      isRealDb: true,
      brief: {},
      learningNotes: null,
      assets: []
    };
  });
}

export async function updateTaskStage(taskId, newStage, learningNotes = null) {
  if (!isSupabaseConfigured) {
    return { id: taskId, stage: newStage, learningNotes };
  }

  const updatePayload = {
    stage: newStage
  };

  const { data, error } = await supabase
    .from('tasks')
    .update(updatePayload)
    .eq('id', taskId)
    .select();

  if (error) {
    console.error('Lỗi update task stage lên Supabase:', error);
    throw error;
  }

  console.log(`⚡ [Supabase Live] Đã cập nhật task ${taskId} sang cột '${newStage}'!`);
  return data?.[0] || { id: taskId, stage: newStage };
}

export async function createTasksBatch(tasksList) {
  if (!isSupabaseConfigured) {
    return tasksList;
  }

  const isUuid = (str) => /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(str);
  
  const dbTasks = tasksList.map((t) => {
    const row = {
      title: t.title,
      stage: t.stage || 'not_started',
      task_type: t.type || t.task_type || 'Content',
      due_date: t.dueDate || new Date(Date.now() + 7 * 86400000).toISOString()
    };
    if (t.campaignId && isUuid(t.campaignId)) {
      row.campaign_id = t.campaignId;
    }
    return row;
  });

  const { data, error } = await supabase
    .from('tasks')
    .insert(dbTasks)
    .select();

  if (error) {
    console.error('Lỗi chèn batch tasks vào Supabase:', error);
    return tasksList;
  }

  console.log('⚡ [Supabase Live] Đã INSERT batch tasks mới thành công:', data);
  return data;
}
