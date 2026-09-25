# Growth-Loop Enterprise OS - Project Memory & System Guidelines

## 1. Project Overview
- **Product**: Growth-Loop Enterprise OS
- **Organization**: Mắt Bão Corporation (MBC / MBI)
- **Architecture**: Single Page Application (React 18 + Vite) kết nối trực tiếp Supabase BaaS (PostgreSQL) và triển khai trên Vibe Host Cloud.
- **Design Philosophy**: Soft Pastel Minimalist, Enterprise-grade SaaS, Data-Driven Operations.

---

## 2. Infrastructure & Cloud Deployment (Vibe Host MCP)
- **Deployment Platform**: Vibe Host (Mắt Bão AI Platform)
- **MCP Server Endpoint**: `https://vibehost.matbao.ai/api/agent/mcp`
- **MCP Authorization**: `Bearer <VIBEHOST_MCP_PAT_TOKEN>` (Cấu hình qua file cục bộ `.gemini/config/mcp_config.json` hoặc biến môi trường)
- **Account**: Demo Lead (`demo@growthloop.local`)
- **Plan**: Vibe Host Pro
- **MCP Configuration Files**:
  - Global: `~/.gemini/config/mcp_config.json`
  - Workspace Template: `mcp_config.example.json`
- **MCP Capabilities**:
  - `whoami`: Tra cứu thông tin tài khoản và hạn mức tài nguyên
  - `list_projects`, `get_project`: Quản lý danh sách website
  - `create_project`: Tạo và triển khai website mới qua static HTML hoặc Git repo
  - `redeploy_project`, `rollback_project`: Cập nhật mã nguồn và quản lý phiên bản
  - `get_build_logs`, `get_runtime_logs`, `diagnose_deploy`: Giám sát và chẩn đoán sự cố
- **Deployed Production Website**:
  - **Live URL**: `https://growthloop.cmc-1.vibenode.matbao.ai` (Public Demo)
  - **Legacy URL**: `https://growth-loop.cmc-1.vibenode.matbao.ai`
  - **Status**: `online`
  - **Specifications**: 1 vCPU, 512MB RAM, Nginx Static Single-Bundle SPA

---

## 3. Database Architecture (Supabase BaaS)
- **Project URL**: `https://<your-project-id>.supabase.co` (Cấu hình qua file `.env.local`)
- **Publishable Key**: `sb_publishable_<YOUR_SUPABASE_ANON_KEY>`
- **Storage Bucket**: `creative-assets`
- **Core Schema**:
  - `products`: Quản lý sản phẩm của Mắt Bão (brand MBC/MBI, tên, mô tả vấn đề, persona).
  - `tasks`: Quản lý công việc Kanban (`id`, `title`, `task_type`, `stage`, `due_date`, `campaign_id`).
    - Các cột trạng thái (stage): `not_started`, `in_progress`, `in_review`, `revision`, `done`.
  - `master_plans`: Lưu trữ kế hoạch tổng thể được chốt (`status`, `target_sql`, `budget`, `version_hash`, `product_id`).
  - `campaigns`: Phân bổ chiến dịch con theo phễu marketing (`funnel_stage`, `kpi_allocation`, `budget_allocation`).
  - `users`: Thông tin nhân sự và quyền phê duyệt.

---

## 4. UI/UX & Feature Conventions
- **Terminology**: Tránh các từ khóa mang tính phô trương công nghệ như "Gemini", "Copilot". Sử dụng thuật ngữ chuyên môn:
  - "Trợ lý Hoạch định Chiến lược" (Guided Campaign Builder)
  - "Tạo Plan Nhanh" (Smart Planning)
  - "Data-Driven OS"
- **MS Teams Integration**:
  - Nút "Bắn báo cáo vào Teams" với màu tím đặc trưng `#6264A7`.
  - Hỗ trợ Adaptive Card preview cho các thông báo task và nhắc việc.
- **Workflow & Kanban**:
  - Đồng bộ thời gian thực 2 chiều với Supabase (`updateTaskStage`, `createTasksBatch`).
  - Hiển thị badge `⚡ Supabase Live` trên thanh công cụ để minh chứng hệ thống có Database thật.
