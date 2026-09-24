-- ============================================================================
-- GROWTH-LOOP ENTERPRISE OS - DATABASE SCHEMA (POSTGRESQL / SUPABASE)
-- Migration: 20260924_initial_schema.sql
-- ============================================================================

-- 1. BẬT TIỆN ÍCH MÃ HÓA & UUID
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ============================================================================
-- 2. BẢNG USERS (NHÂN SỰ VÀ PHÂN QUYỀN)
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.users (
    id TEXT PRIMARY KEY, -- 'mem-thinh', 'mem-chau', hoặc Supabase Auth UUID
    full_name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    role TEXT NOT NULL,
    department TEXT NOT NULL,
    avatar TEXT,
    avatar_color TEXT DEFAULT 'bg-indigo-600',
    platform TEXT DEFAULT 'Gửi Direct Message qua Teams',
    contact TEXT,
    auto_reminder BOOLEAN DEFAULT true,
    is_approver BOOLEAN DEFAULT false,
    is_owner BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ============================================================================
-- 3. BẢNG PRODUCTS (DANH MỤC 12 SẢN PHẨM MBC & MBI)
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.products (
    id TEXT PRIMARY KEY, -- 'prod-vibehost', 'prod-domain', etc.
    brand TEXT NOT NULL CHECK (brand IN ('MBC', 'MBI')),
    name TEXT NOT NULL,
    category TEXT NOT NULL,
    target_persona TEXT NOT NULL,
    problem_statement TEXT NOT NULL,
    key_message TEXT,
    domain_extensions JSONB DEFAULT '[]'::jsonb, -- Dành cho mảng Tên Miền
    meta_sync_data JSONB DEFAULT '{}'::jsonb, -- Leads, SQLs, CPL, Ad Account ID
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ============================================================================
-- 4. BẢNG MASTER_PLANS (KẾ HOẠCH TỔNG THỂ & KHÓA LẠC QUAN VERSION_HASH)
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.master_plans (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    product_id TEXT NOT NULL REFERENCES public.products(id) ON DELETE RESTRICT,
    owner_id TEXT NOT NULL REFERENCES public.users(id) ON DELETE RESTRICT,
    approver_id TEXT NOT NULL REFERENCES public.users(id) ON DELETE RESTRICT,
    title TEXT NOT NULL,
    status TEXT NOT NULL CHECK (status IN ('draft', 'pending_approval', 'approved', 'rejected')) DEFAULT 'pending_approval',
    target_sql INTEGER NOT NULL DEFAULT 0,
    target_leads INTEGER NOT NULL DEFAULT 0,
    budget BIGINT NOT NULL DEFAULT 0,
    timeline_days INTEGER DEFAULT 14,
    key_message TEXT,
    version_hash TEXT NOT NULL, -- Khóa lạc quan chống duyệt đè (Optimistic Concurrency Control)
    reject_reason TEXT,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
    approved_at TIMESTAMPTZ
);

-- Trigger tự động cập nhật version_hash mỗi khi Master Plan bị chỉnh sửa
CREATE OR REPLACE FUNCTION public.fn_generate_master_plan_hash()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = timezone('utc'::text, now());
    -- Hash kết hợp giữa id, budget, target_sql và thời điểm sửa để tạo checksum duy nhất
    NEW.version_hash = md5(NEW.id::text || NEW.updated_at::text || NEW.budget::text || NEW.target_sql::text);
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_master_plans_hash ON public.master_plans;
CREATE TRIGGER trg_master_plans_hash
BEFORE INSERT OR UPDATE ON public.master_plans
FOR EACH ROW EXECUTE FUNCTION public.fn_generate_master_plan_hash();

-- ============================================================================
-- 5. BẢNG CAMPAIGNS (CHIẾN DỊCH CON PHỄU 2 BƯỚC: TEASING & RETARGETING)
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.campaigns (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    plan_id UUID NOT NULL REFERENCES public.master_plans(id) ON DELETE CASCADE,
    product_id TEXT NOT NULL REFERENCES public.products(id) ON DELETE RESTRICT,
    title TEXT NOT NULL,
    funnel_stage TEXT NOT NULL CHECK (funnel_stage IN ('teasing', 'retargeting')),
    channel TEXT NOT NULL DEFAULT 'Facebook Ads',
    kpi_allocation JSONB NOT NULL DEFAULT '{"target_sqls": 0, "target_leads": 0, "budget": 0, "cpl_target": 0}'::jsonb,
    status TEXT NOT NULL CHECK (status IN ('active', 'draft', 'paused', 'completed')) DEFAULT 'draft',
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ============================================================================
-- 6. BẢNG TASKS (CÔNG VIỆC TRÊN BẢNG KANBAN 5 CỘT)
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.tasks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    campaign_id UUID REFERENCES public.campaigns(id) ON DELETE SET NULL,
    plan_id UUID REFERENCES public.master_plans(id) ON DELETE CASCADE,
    assignee_id TEXT NOT NULL REFERENCES public.users(id) ON DELETE RESTRICT,
    title TEXT NOT NULL,
    stage TEXT NOT NULL CHECK (stage IN ('not_started', 'in_progress', 'in_review', 'revision', 'done')) DEFAULT 'not_started',
    task_type TEXT NOT NULL CHECK (task_type IN ('Content', 'Design', 'Video', 'Web Dev', 'Growth')),
    due_date TIMESTAMPTZ,
    brief_json JSONB DEFAULT '{}'::jsonb,
    learning_notes TEXT, -- Đúc kết bài học khi kéo vào cột Done
    order_index INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ============================================================================
-- 7. BẢNG CREATIVE_ASSETS (QUẢN LÝ TÀI NGUYÊN SỐ & PHIÊN BẢN V1, V2, V3)
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.creative_assets (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    task_id UUID NOT NULL REFERENCES public.tasks(id) ON DELETE CASCADE,
    file_url TEXT NOT NULL, -- Đường dẫn file lưu trên Supabase Storage
    file_type TEXT NOT NULL CHECK (file_type IN ('image', 'video', 'copy', 'document')),
    version_number INTEGER NOT NULL DEFAULT 1,
    status TEXT NOT NULL CHECK (status IN ('draft', 'in_review', 'approved', 'rejected')) DEFAULT 'in_review',
    ai_qa_score JSONB DEFAULT '{"passed": true, "text_density": 12, "brand_color_match": true, "cta_detected": true}'::jsonb,
    reviewer_feedback TEXT,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ============================================================================
-- 8. BẢNG WEEKLY_REPORTS (BÁO CÁO TUẦN ĐIỀU HÀNH)
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.weekly_reports (
    id TEXT PRIMARY KEY, -- 'w-37', 'w-38', 'w-39'
    week_number INTEGER NOT NULL,
    period TEXT NOT NULL,
    title TEXT NOT NULL,
    executive_summary TEXT,
    recipients TEXT DEFAULT 'Lâm Quang Thịnh',
    status TEXT DEFAULT 'active',
    conversion_metrics JSONB DEFAULT '[]'::jsonb,
    the_good JSONB DEFAULT '[]'::jsonb,
    the_bad_and_risks JSONB DEFAULT '[]'::jsonb,
    action_plan JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ============================================================================
-- 9. ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================================================
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.master_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.creative_assets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.weekly_reports ENABLE ROW LEVEL SECURITY;

-- Cho phép đọc công khai (Anon & Authenticated)
CREATE POLICY "Public Read Users" ON public.users FOR SELECT USING (true);
CREATE POLICY "Public Read Products" ON public.products FOR SELECT USING (true);
CREATE POLICY "Public Read MasterPlans" ON public.master_plans FOR SELECT USING (true);
CREATE POLICY "Public Read Campaigns" ON public.campaigns FOR SELECT USING (true);
CREATE POLICY "Public Read Tasks" ON public.tasks FOR SELECT USING (true);
CREATE POLICY "Public Read Assets" ON public.creative_assets FOR SELECT USING (true);
CREATE POLICY "Public Read Reports" ON public.weekly_reports FOR SELECT USING (true);

-- Cho phép thêm/sửa cho ứng dụng nội bộ (Có thể siết bằng Supabase Auth JWT sau này)
CREATE POLICY "Allow All Insert Users" ON public.users FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow All Update Users" ON public.users FOR UPDATE USING (true);

CREATE POLICY "Allow All Insert MasterPlans" ON public.master_plans FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow All Update MasterPlans" ON public.master_plans FOR UPDATE USING (true);

CREATE POLICY "Allow All Insert Campaigns" ON public.campaigns FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow All Update Campaigns" ON public.campaigns FOR UPDATE USING (true);

CREATE POLICY "Allow All Insert Tasks" ON public.tasks FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow All Update Tasks" ON public.tasks FOR UPDATE USING (true);

CREATE POLICY "Allow All Insert Assets" ON public.creative_assets FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow All Update Assets" ON public.creative_assets FOR UPDATE USING (true);

CREATE POLICY "Allow All Insert Reports" ON public.weekly_reports FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow All Update Reports" ON public.weekly_reports FOR UPDATE USING (true);

-- ============================================================================
-- 10. DỮ LIỆU SEED BAN ĐẦU (SEED DATA: 6 USERS & 12 REAL PRODUCTS)
-- ============================================================================

-- Seed 6 Nhân sự thực tế (Demo)
INSERT INTO public.users (id, full_name, email, role, department, avatar, avatar_color, platform, contact, auto_reminder, is_approver, is_owner)
VALUES 
('mem-thinh', 'Lâm Quang Thịnh', 'thinh.lam@demo.local', 'Acting Marketing Manager', 'Marketing Management', 'LT', 'bg-indigo-700', 'Gửi Direct Message qua Teams', 'thinh.lam@demo.local', false, true, false),
('mem-chau', 'Lê Phạm Minh Châu', 'chau.le@demo.local', 'Senior Growth Executive', 'Growth Marketing', 'LC', 'bg-emerald-600', 'Gửi Direct Message qua Teams', 'chau.le@demo.local', true, false, true),
('mem-khoi', 'Hoàng Minh Khôi', 'khoi.hoang@demo.local', 'Social Executive', 'Social & Content', 'HK', 'bg-purple-600', 'Mention (@) vào Channel của Team', '@khoi.hoang', true, false, false),
('mem-khanh', 'Nguyễn Ngọc Khánh', 'khanh.nguyen@demo.local', 'Marketing Executive', 'Paid Media & Operations', 'NK', 'bg-blue-600', 'Gửi Direct Message qua Teams', 'khanh.nguyen@demo.local', true, false, false),
('mem-hien', 'Võ Thị Thu Hiền', 'hien.vo@demo.local', 'SEO Executive', 'Organic & Web SEO', 'VH', 'bg-teal-600', 'Gửi Direct Message qua Teams', 'hien.vo@demo.local', true, false, false),
('mem-quy', 'Nguyễn Duy Quý', 'quy.nguyen@demo.local', 'Intern', 'Marketing Operations', 'NQ', 'bg-amber-600', 'Mention (@) vào Channel của Team', '@quy.nguyen', true, false, false)
ON CONFLICT (id) DO UPDATE SET full_name = EXCLUDED.full_name, role = EXCLUDED.role;

-- Seed 12 Sản phẩm thực tế (8 MBC + 4 MBI)
INSERT INTO public.products (id, brand, name, category, target_persona, problem_statement, key_message, domain_extensions, meta_sync_data)
VALUES
-- KHỐI MBC
('prod-vibehost', 'MBC', 'Vibe Host', 'High-Performance Hosting', 'Lập trình viên, Web Agency, Doanh nghiệp cần website tải cực nhanh', 'Hosting thông thường dễ bị chậm và nghẽn khi có đợt traffic tăng đột biến', 'Tốc độ vượt trội - Chuẩn tải trang dưới 0.8 giây', '[]'::jsonb, '{"campaignCount": 2, "leads": 190, "sqls": 14, "cpl": 4.10, "isSynced": true, "adAccountId": "act_88319201"}'::jsonb),
('prod-domain', 'MBC', 'Tên Miền', 'Domain Registry & Brand Protection', 'Chủ shop, Startup, Doanh nghiệp vừa thành lập muốn bảo vệ tên thương hiệu', 'Khách hàng phân vân giữa tên miền quốc gia và quốc tế, lo sợ bị đối thủ mua mất tên thương hiệu', 'Đăng ký tên miền chính thức - Khởi tạo nhận diện thương hiệu online chỉ trong 1 phút', '["Tên miền .VN / .COM", "Tên miền .CLOUD", "Tên miền .IO", "Tên miền .AI", "Tên miền .XYZ", "Tên miền .ASIA", "Tên miền .ICU", "Tên miền ngành sắc đẹp", "Tên miền quốc tế"]'::jsonb, '{"campaignCount": 4, "leads": 540, "sqls": 38, "cpl": 2.80, "isSynced": true, "adAccountId": "act_88319201"}'::jsonb),
('prod-gws', 'MBC', 'Google Workspace', 'Cloud Productivity', 'Doanh nghiệp SMEs cần môi trường làm việc cộng tác và bảo mật email', 'Dùng email miễn phí thiếu chuyên nghiệp, dễ bị spam và khó quản lý phân quyền nhân sự', 'Bộ công cụ làm việc chuẩn Google - Hỗ trợ kỹ thuật 24/7 và xuất hóa đơn VAT hợp lệ', '[]'::jsonb, '{"campaignCount": 3, "leads": 210, "sqls": 19, "cpl": 5.20, "isSynced": true, "adAccountId": "act_88319201"}'::jsonb),
('prod-m365', 'MBC', 'Microsoft 365 Copilot', 'Enterprise AI & Workplace', 'Lãnh đạo doanh nghiệp, Trưởng phòng muốn tăng tốc độ xử lý công việc bằng AI', 'Nhân sự mất quá nhiều thời gian tổng hợp báo cáo, viết email và làm slide thuyết trình', 'Tích hợp Trí tuệ Nhân tạo vào Word, Excel, Teams - Tăng 40% năng suất làm việc', '[]'::jsonb, '{"campaignCount": 2, "leads": 145, "sqls": 16, "cpl": 7.50, "isSynced": true, "adAccountId": "act_88319201"}'::jsonb),
('prod-bizmail', 'MBC', 'Email doanh nghiệp', 'Secure Business Email', 'Hộ kinh doanh và doanh nghiệp nhỏ cần email theo tên miền với chi phí tiết kiệm', 'Chi phí các gói Cloud Workplace quá cao trong khi nhu cầu chỉ là gửi nhận email tin cậy', 'Email theo tên miền riêng - Bộ lọc chống spam 99% - Chi phí tối ưu cho SMEs', '[]'::jsonb, '{"campaignCount": 2, "leads": 130, "sqls": 11, "cpl": 3.90, "isSynced": true, "adAccountId": "act_88319201"}'::jsonb),
('prod-cloudhost', 'MBC', 'Cloud Hosting', 'Cloud Infrastructure', 'Doanh nghiệp thương mại điện tử, Website lượng truy cập lớn cần độ ổn định 99.9%', 'Server sập vào các dịp flash sale khiến doanh nghiệp tổn thất doanh thu lớn', 'Hạ tầng Cloud mạnh mẽ - Khả năng tự động co giãn tài nguyên trong tích tắc', '[]'::jsonb, '{"campaignCount": 0, "leads": 0, "sqls": 0, "cpl": 0, "isSynced": false, "adAccountId": "act_88319201"}'::jsonb),
('prod-vmc', 'MBC', 'Chứng chỉ VMC', 'Email Brand Identity & BIMI', 'Ngân hàng, Fintech, Tập đoàn cần hiển thị logo tích xanh trên hộp thư Gmail', 'Email gửi cho khách hàng thường xuyên bị rơi vào spam hoặc bị đối tượng xấu giả mạo', 'Gắn logo thương hiệu xác thực lên hộp thư khách hàng - Nâng tầm uy tín', '[]'::jsonb, '{"campaignCount": 0, "leads": 0, "sqls": 0, "cpl": 0, "isSynced": false, "adAccountId": "act_88319201"}'::jsonb),
('prod-smime', 'MBC', 'Chứng chỉ S-MIME', 'Email Encryption & Digital Sign', 'Tổ chức tài chính, Bảo hiểm, Doanh nghiệp cần bảo mật và mã hóa email tuyệt đối', 'Rủi ro rò rỉ nội dung hợp đồng hoặc thông tin nhạy cảm qua email thông thường', 'Ký số và mã hóa đầu cuối email - Tiêu chuẩn an toàn bảo mật cấp doanh nghiệp', '[]'::jsonb, '{"campaignCount": 0, "leads": 0, "sqls": 0, "cpl": 0, "isSynced": false, "adAccountId": "act_88319201"}'::jsonb),

-- KHỐI MBI
('prod-einvoice', 'MBI', 'Hoá đơn điện tử', 'E-Invoice Nghị định 123', 'Doanh nghiệp, Kế toán trưởng cần xuất và quản lý hóa đơn hợp lệ theo quy định Thuế', 'Quy trình xuất hóa đơn thủ công tốn thời gian và dễ sai sót thông tin kê khai', 'Phần mềm hóa đơn điện tử chuẩn Nghị định 123 - Kết nối trực tiếp cơ quan Thuế', '[]'::jsonb, '{"campaignCount": 3, "leads": 340, "sqls": 32, "cpl": 3.60, "isSynced": true, "adAccountId": "act_77410294"}'::jsonb),
('prod-econtract', 'MBI', 'Hợp đồng điện tử', 'E-Contract & Digital Signature', 'Phòng Pháp chế, HR, Kinh doanh cần ký kết thỏa thuận từ xa không cần gặp mặt', 'Ký hợp đồng giấy tốn chi phí chuyển phát nhanh và mất nhiều ngày để hoàn tất chữ ký', 'Ký kết hợp đồng số mọi lúc mọi nơi - Pháp lý vững chắc theo Luật Giao dịch điện tử', '[]'::jsonb, '{"campaignCount": 2, "leads": 175, "sqls": 18, "cpl": 4.80, "isSynced": true, "adAccountId": "act_77410294"}'::jsonb),
('prod-invoicedoc', 'MBI', 'Hoá đơn đầu vào', 'Automated Invoice Processing', 'Kế toán doanh nghiệp xử lý hàng trăm hóa đơn mua hàng mỗi tháng', 'Nhập liệu thủ công từng hóa đơn vào phần mềm kế toán vừa chậm vừa dễ thất lạc chứng từ', 'Tự động kiểm tra tính hợp lệ và cảnh báo rủi ro thuế từ doanh nghiệp bỏ trốn', '[]'::jsonb, '{"campaignCount": 1, "leads": 110, "sqls": 12, "cpl": 4.20, "isSynced": true, "adAccountId": "act_77410294"}'::jsonb),
('prod-digitalsign', 'MBI', 'Chữ ký số', 'Token HSM & Cloud CA', 'Chủ doanh nghiệp, Kế toán cần ký số kê khai thuế, hải quan và phát hành hóa đơn', 'Chữ ký số USB Token cũ dễ mất mát, bất tiện khi phải ký trên thiết bị di động', 'Chữ ký số từ xa Cloud CA - Ký mọi văn bản ngay trên điện thoại không cần USB', '[]'::jsonb, '{"campaignCount": 0, "leads": 0, "sqls": 0, "cpl": 0, "isSynced": false, "adAccountId": "act_77410294"}'::jsonb)
ON CONFLICT (id) DO UPDATE SET 
    name = EXCLUDED.name, 
    category = EXCLUDED.category,
    target_persona = EXCLUDED.target_persona,
    problem_statement = EXCLUDED.problem_statement,
    domain_extensions = EXCLUDED.domain_extensions;
