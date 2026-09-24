import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
export const STORAGE_BUCKET = import.meta.env.VITE_SUPABASE_STORAGE_BUCKET || 'creative-assets';

// Kiểm tra xem người dùng đã cấu hình URL và Key chưa
export const isSupabaseConfigured = Boolean(
  supabaseUrl && 
  supabaseAnonKey && 
  supabaseUrl.trim() !== '' && 
  supabaseAnonKey.trim() !== '' &&
  supabaseUrl.startsWith('http')
);

if (isSupabaseConfigured) {
  console.log('⚡ [Growth-loop] Supabase: Đã kết nối thành công tới Database:', supabaseUrl);
} else {
  console.info('ℹ️ [Growth-loop] Supabase: Chưa cấu hình VITE_SUPABASE_URL. Hệ thống tự động kích hoạt Hybrid Fallback (sử dụng dữ liệu ban đầu an toàn).');
}

// Khởi tạo Supabase client nếu đã cấu hình, nếu chưa thì tạo client giả lập an toàn
export const supabase = isSupabaseConfigured 
  ? createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
      },
    })
  : null;
