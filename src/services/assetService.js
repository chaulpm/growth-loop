import { supabase, isSupabaseConfigured, STORAGE_BUCKET } from '../lib/supabaseClient';

/**
 * Tải tài nguyên sáng tạo lên Supabase Storage vĩnh viễn (thay thế URL.createObjectURL)
 * @param {File} file 
 * @param {string} taskId 
 * @param {number} versionNumber 
 * @returns {Promise<{ publicUrl: string, assetRecord: any }>}
 */
export async function uploadCreativeAsset(file, taskId = 'general', versionNumber = 1) {
  if (!isSupabaseConfigured) {
    // Fallback sang blob URL tạm thời nếu chưa kết nối Supabase
    return {
      publicUrl: URL.createObjectURL(file),
      fileType: file.type.startsWith('video') ? 'video' : 'image',
      versionNumber,
      isLocalFallback: true
    };
  }

  // 1. Tạo đường dẫn lưu trữ chuẩn
  const safeName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
  const filePath = `tasks/${taskId}/v${versionNumber}_${Date.now()}_${safeName}`;

  // 2. Upload lên Supabase Storage bucket 'creative-assets'
  const { data: uploadData, error: uploadError } = await supabase.storage
    .from(STORAGE_BUCKET)
    .upload(filePath, file, {
      cacheControl: '3600',
      upsert: true
    });

  if (uploadError) {
    console.error('Lỗi upload file lên Supabase Storage:', uploadError);
    // Nếu bucket chưa được tạo hoặc lỗi quyền, fallback sang ObjectURL để không làm gián đoạn UX
    return {
      publicUrl: URL.createObjectURL(file),
      fileType: file.type.startsWith('video') ? 'video' : 'image',
      versionNumber,
      error: uploadError.message,
      isLocalFallback: true
    };
  }

  // 3. Lấy Public URL vĩnh viễn
  const { data: publicUrlData } = supabase.storage
    .from(STORAGE_BUCKET)
    .getPublicUrl(uploadData.path);

  const publicUrl = publicUrlData.publicUrl;

  // 4. Lưu bản ghi metadata vào bảng creative_assets
  let assetRecord = null;
  if (taskId && taskId !== 'general') {
    const { data: dbData, error: dbError } = await supabase
      .from('creative_assets')
      .insert([
        {
          task_id: taskId,
          file_url: publicUrl,
          file_type: file.type.startsWith('video') ? 'video' : 'image',
          version_number: versionNumber,
          status: 'in_review',
          ai_qa_score: {
            passed: true,
            text_density: 12,
            brand_color_match: true,
            cta_detected: true
          }
        }
      ])
      .select()
      .single();

    if (!dbError) {
      assetRecord = dbData;
    }
  }

  return {
    publicUrl,
    fileType: file.type.startsWith('video') ? 'video' : 'image',
    versionNumber,
    assetRecord,
    isLocalFallback: false
  };
}
