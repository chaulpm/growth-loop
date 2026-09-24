# TÀI LIỆU BÀN GIAO DỰ ÁN & BACKLOG PHÁT TRIỂN TIẾP
# GROWTH-LOOP (DATA-DRIVEN GROWTH OPERATING SYSTEM)

> **Mục đích tài liệu**: Tài liệu này tổng hợp toàn bộ hiện trạng sản phẩm, kiến trúc kỹ thuật, danh mục tính năng đã hoàn thiện, các hạn chế/lỗi tiềm ẩn và danh sách backlog ưu tiên để cung cấp trực tiếp cho Chatbot / Lập trình viên tiếp quản phát triển các giai đoạn tiếp theo.

---

## 1. TỔNG QUAN DỰ ÁN & ĐỊNH VỊ SẢN PHẨM

- **Tên dự án**: Growth Loop (Growth Operating System)
- **Tech Stack**:
  - **Frontend Core**: React 18, Vite 6, Tailwind CSS, Lucide React icons.
  - **State Management**: React State hooks (`useState`, `useEffect`) tập trung tại `src/App.jsx`.
  - **Styling Paradigm**: Soft Pastel Minimalist UI, Clean SaaS Enterprise layout (viền mỏng `slate-200/80`, nền thẻ trắng, đổ bóng `shadow-xs`/`shadow-2xs`, pastel gradient điểm xuyết).
  - **Môi trường chạy**: Node.js trên Windows PowerShell (`npm.cmd run dev` trên cổng `http://localhost:5173/`, `npm.cmd run build`).
- **Định vị & Triết lý Sản phẩm (Product Philosophy)**:
  - **Tập trung vào Quản lý Quy trình & Tiến độ Chiến dịch**: Growth Loop là hệ điều hành quản lý vòng đời chiến dịch (Campaign Lifecycle), tiến độ thực thi (Workflow & Kanban), kiểm soát chất lượng bàn giao (Creative QA) và cơ chế phê duyệt Kế hoạch tổng thể (Master Campaign Plan).
  - **KHÔNG theo dõi Ads Spend chi tiết**: Đã loại bỏ hoàn toàn các widget đo lường dòng tiền/ngân sách (như Budget Pacing/Burn Rate) để không biến công cụ thành phần mềm kế toán.
  - **Chuẩn hóa Ngôn ngữ Doanh nghiệp (Enterprise-Grade Copywriting)**: Toàn bộ giao diện đã được thanh lọc, **tuyệt đối không hiển thị các từ khóa phô trương công nghệ như "Gemini", "AI", "Copilot"**. Các tính năng tự động được gọi bằng các thuật ngữ chuyên môn: *"Hệ thống"*, *"Tự động"*, *"Smart"*, *"Gợi ý Tối ưu"*, *"Chẩn đoán Hệ thống"*, *"Thư viện Growth"*, *"Trợ lý Hoạch định Chiến lược"*, *"Data-Driven OS"*. Icon ✨ (Sparkles) chỉ đóng vai trò là tín hiệu thị giác (visual cue) tinh tế.

---

## 2. KIẾN TRÚC DỮ LIỆU & NGUỒN DỮ LIỆU (SOURCE OF TRUTH)

Dữ liệu mẫu thực tế của dự án được lưu trữ tại file: [`src/data/mockData.js`](file:///C:/Growth-loop/src/data/mockData.js).

### A. Danh mục 12 Sản phẩm Thực tế (2 Khối Kinh doanh):
1. **🏢 Khối MBC (Matbao-corp) - 8 Sản phẩm**:
   - `Vibe Host`: High-Performance Hosting (2 active campaigns).
   - `Tên Miền`: Domain Registrar & DNS (Thẻ đặc biệt với 9 đuôi chip: `.VN/.COM`, `.CLOUD`, `.IO`, `.AI`, `.XYZ`, `.ASIA`, `.ICU`, sắc đẹp, quốc tế - 4 active campaigns).
   - `Google Workspace`: Cloud Productivity (2 active campaigns).
   - `Microsoft 365 Copilot`: Enterprise AI & Workplace (2 active campaigns - Lưu ý: Tên sản phẩm thương mại của Microsoft giữ nguyên).
   - `Email doanh nghiệp`: Secure Business Email (1 active campaign).
   - `Cloud Hosting`: Cloud Infrastructure (0 campaign - **Thiếu Camp**).
   - `Chứng chỉ VMC`: Email Brand Identity & BIMI (0 campaign - **Thiếu Camp**).
   - `Chứng chỉ S-MIME`: Email Encryption & Digital Sign (0 campaign - **Thiếu Camp**).
2. **🧾 Khối MBI (Matbao-invoice) - 4 Sản phẩm**:
   - `Hoá đơn điện tử`: E-Invoice Nghị định 123 (3 active campaigns).
   - `Hợp đồng điện tử`: E-Contract & Digital Signature (2 active campaigns).
   - `Hoá đơn đầu vào`: Automated Invoice Processing (1 campaign - **Cần đổi KV / Warning**).
   - `Chữ ký số`: Token HSM & Cloud CA (0 campaign - **Thiếu Camp**).

### B. Danh sách Nhân sự Động (Multi-user Team Roster):
- **Lâm Quang Thịnh**: Acting Marketing Manager (Role: Quản lý / Approver).
- **Lê Phạm Minh Châu**: Senior Growth Executive (Role: Thực thi / Creator).
- **Hoàng Minh Khôi**: Social Executive.
- **Nguyễn Ngọc Khánh**: Marketing Executive.
- **Nguyễn Duy Quý**: Intern.
- **Võ Thị Thu Hiền**: SEO Executive.

---

## 3. TỔNG HỢP CÁC TÍNH NĂNG ĐÃ HOÀN THÀNH (CURRENT IMPLEMENTED FEATURES)

### 3.1. Navigation Header & Multi-User Switcher
- **Header Dark Theme (`#1E293B`)**: Độ tương phản cao, gạch chân neon sáng sắc nét cho tab đang kích hoạt.
- **Badge Định danh**: `✨ Data-Driven OS`.
- **Live Sync Indicator**: Chấm xanh nhấp nháy hiển thị trạng thái kết nối Meta Ads API.
- **Nút Báo Cáo Tuần**: Kích hoạt trực tiếp modal Báo cáo tuần từ Header.
- **Multi-user Switcher (`UserSelector.jsx`)**: Cho phép chuyển đổi linh hoạt tài khoản người dùng đang đăng nhập để mô phỏng phân quyền giữa Manager (Lâm Quang Thịnh) và Growth Executive (Lê Phạm Minh Châu).

### 3.2. Màn hình 1: Control Center (Dashboard Trung Tâm)
- **Lưới 2 Cột Cân Bằng Thị Giác (Balanced 2-Column Grid)**:
  - **Cột Trái - `CampaignCoverageWidget.jsx`**:
    - Tỷ lệ phủ sóng tổng thể danh mục (hiện tại: 67% - 8/12 sản phẩm).
    - 3 thẻ đếm trạng thái: `Active (15)`, `Thiếu Camp (4)`, `Cần đổi KV (1)`.
    - Phân bổ theo 2 khối: 🏢 MBC (5/8 - 63%) và 🧾 MBI (3/4 - 75%), hiển thị danh sách tag từng sản phẩm kèm chấm xanh (Active) hoặc đỏ (Thiếu).
    - Khối *Phân tích Thiếu hụt Chiến dịch*: Nhận diện các sản phẩm khuyết, kèm nút bấm **`+ Tạo Plan Nhanh`** mở trực tiếp luồng lập kế hoạch.
    - Chiều cao thẻ giãn nở tự nhiên (`h-full flex flex-col justify-between`) khớp pixel với cột bên phải.
  - **Cột Phải - 2 Thẻ Xếp Chồng**:
    - **`PerformanceAlertsWidget.jsx`**: Danh sách cảnh báo hiệu suất theo thời gian thực (CPL tăng, CTR giảm, ROAS cao); khối *Chẩn đoán Hệ thống*; 3 phương án A/B Creative phác thảo sẵn (có nút mở rộng và duyệt lên Meta Ads).
    - **`GrowthExperimentsWidget.jsx`**: *Thư viện Growth (Growth Library)*; kết quả A/B Test đang chạy trực tiếp (Variant A vs Variant B Winner); đúc kết tự động chu kỳ trước.
- **Hàng Dưới - `TaskQualityControlWidget.jsx`**:
  - Quản lý quy trình kiểm soát chất lượng & Phê duyệt Master Campaign Plan.
  - **Thẻ Epic Master Plan nằm ngang**: Hiển thị Kế hoạch của Vibe Host với 2 chiến dịch con (`Camp 1 Teasing 60% KPI`, `Camp 2 Retargeting 40% KPI`), timeline, ngân sách.
  - **Cơ chế Khóa Task Con Phụ Thuộc (Dependency Locking)**: 2 task con trên Kanban bị khóa cứng với nhãn *"Chờ Lâm Quang Thịnh duyệt Master Plan để mở khóa"*.
  - **Nút Phê duyệt / Từ chối Kế hoạch**:
    - Khi Manager bấm *"Duyệt Kế Hoạch"*: Kế hoạch chuyển sang trạng thái *Đã duyệt*, tự động mở khóa (unlock) toàn bộ các task con để team bắt tay thực thi.
    - Khi bấm *"Từ chối / Yêu cầu sửa"*: Giữ nguyên trạng thái khóa và hiển thị phản hồi.
  - Hỗ trợ đổi người tạo (Creator) và người duyệt (Reviewer) động thông qua popup chọn nhân sự.

### 3.3. Màn hình 2: Product Master & Planner
- **Bảng Danh mục Sản phẩm 3 Vùng (`ProductCard3Zone.jsx`)**:
  - Vùng 1 (Trái - 5/12): 5 trường dữ liệu sản phẩm (Tên, Nhánh đề tài, Nhóm chủ đề, Bài toán nỗi đau, Đối tượng mục tiêu). Thẻ đặc biệt cho Tên Miền hiển thị danh sách chips mở rộng.
  - Vùng 2 (Giữa - 3/12): Đồng bộ Meta Ads API thời gian thực (Trạng thái Live/Disconnected, Số chiến dịch đang chạy, Ngày bắt đầu, Leads, SQLs, CPL, CVR, Spend).
  - Vùng 3 (Phải - 4/12): Khối *Chẩn đoán Hệ thống* (Badge trạng thái, Vấn đề, Giải pháp) và nút bấm CTA hành động theo ngữ cảnh (ví dụ: *"Tạo Camp Speed Demo"*, *"Tạo Camp Combo CA + HĐ"*).
- **Bộ Lọc Thương Hiệu Inline (Segmented Control)**:
  - 3 Nút lọc: `Tất cả (12)`, `🏢 MBC (Matbao-corp) (8)`, `🧾 MBI (Matbao-invoice) (4)`.
  - Chấm đỏ nhấp nháy (`animate-ping`) cảnh báo thương hiệu đang có sản phẩm thiếu camp hoặc cảnh báo rủi ro.
- **Thanh tìm kiếm theo từ khóa** và nút **`+ Thêm Sản Phẩm`**.

### 3.4. Màn hình 3: Task & Workflow (Kanban Board & Slide-over Feedback)
- **Banner Gợi Ý Tối Ưu**: Tự động phát hiện các task đang bị quá hạn duyệt ở cột *In Review* và cung cấp nút *"Xem & Duyệt Ngay"*.
- **2 Chế độ hiển thị**:
  - `Kanban Cột Chuẩn`: 5 cột (`Todo`, `In Progress`, `In Review`, `Revision`, `Done`) với màu viền semantic phân biệt.
  - `Swimlanes theo Chiến Dịch`: Nhóm task theo từng campaign cha để quản lý toàn diện.
- **Thẻ Task Đa Năng**:
  - Hiển thị avatar & tên nhân sự phụ trách thực tế.
  - Hiển thị nhãn chiến dịch cha.
  - Nếu task thuộc Master Plan chưa duyệt: Hiển thị icon ổ khóa vàng và khóa thao tác kéo thả.
  - Nút bấm nhanh mở popup **Creative Brief**.
- **Slide-Over Feedback Panel (`SlideOverFeedbackPanel.jsx`)**:
  - Mở thanh trượt từ cạnh phải khi click vào task.
  - Vùng Upload & Preview file bàn giao (Hình ảnh, Video, Copywriting).
  - Khối **Yêu Cầu Ban Đầu (Creative Brief)**: Mở rộng để đối chiếu trực tiếp với brief chuẩn 5 điểm.
  - Khối **Hệ Thống Auto-QA**: Nút bấm *"Kiểm Tra Nhanh"* tự động kiểm tra mật độ text, độ an toàn logo, kích thước banner và xuất báo cáo chẩn đoán hệ thống.
  - Khung phản hồi & chat: Gửi yêu cầu sửa (`Revision`) kèm ghi chú, hoặc bấm *"Duyệt & Hoàn Thành"* (`Done`).
- **Đúc Kết Bài Học A/B Test (`LearningCaptureModal.jsx`)**:
  - Khi hoàn thành task hoặc kết thúc A/B test, modal mở ra cho phép chọn Variant A hay Variant B chiến thắng, nhập tỷ lệ CVR vượt trội và lưu bài học vào *Thư viện Growth*.

### 3.5. Hệ Thống Modals & Trợ Lý Vận Hành
1. **Trợ lý Hoạch định Chiến lược (`GeminiGuidedPlannerModal.jsx`)**:
   - Luồng hội thoại thông minh thay thế form 20 trường.
   - Bước 1: Chọn sản phẩm cần lên kế hoạch.
   - Bước 2: Tự động phác thảo Timeline, Thông điệp chủ đạo (Key Message), KPI mục tiêu (SQLs).
   - Bước 3: Tự động chia tách thành 2 chiến dịch con: Camp 1 (Teasing/Phủ nhận thức) và Camp 2 (Retargeting/Chốt đơn).
   - Bước 4: Khối chọn phân quyền duyệt (Người lập kế hoạch / Người duyệt kế hoạch).
   - Bấm *"Chốt Kế Hoạch"*: Tự động tạo Master Plan gửi Manager duyệt và sinh ngay các task con vào Kanban board.
2. **Báo Cáo Tuần Tự Động (`WeeklyReportModal.jsx`)**:
   - Bộ chọn tuần động (`Week Picker`): Chọn xem và chuyển đổi giữa Tuần 37, Tuần 38, Tuần 39...
   - Chỉnh sửa trực tiếp số liệu KPI (`Inline Editing`): Nhấp đúp vào số Lead/SQL để sửa số thực tế.
   - Nút **`✨ Chạy Phân Tích`**: Hệ thống phân tích số liệu vừa nhập, đánh giá tỷ lệ đạt mục tiêu của MBC và MBI, tổng hợp nguyên nhân và đề xuất hành động.
   - Nút **`Lưu Bản Nháp`** và **`Sửa Chữ`**: Cho phép chỉnh sửa câu chữ báo cáo.
   - Nút **`Bắn báo cáo vào Teams`**: Định dạng văn bản chuẩn Microsoft Teams Markdown và bắn bản tóm tắt vào kênh Teams của ban giám đốc/quản lý kèm thông báo toast.
   - Popup chọn người nhận báo cáo (`Kính gửi (To)`): Gợi ý Lâm Quang Thịnh (Acting Marketing Manager).
3. **Quản Lý Team & Tự Động Nhắc Việc (`TeamManagementModal.jsx`)**:
   - Quản lý danh sách nhân sự thực tế, gắn vai trò Approver / Assignee.
   - Cấu hình kênh thông báo chuẩn hóa: *Gửi Direct Message qua Teams* và *Mention (@) vào Channel của Team*.
   - Cài đặt nhắc hạn deadline tự động: Bật/tắt toggle, cấu hình số giờ nhắc trước hạn (ví dụ: trước 24h và trước 2h).
   - Cấu hình Tone of Voice nhắc việc: *Nhẹ nhàng/Cổ vũ*, *Chuyên nghiệp*, *Báo động đỏ* kèm khung xem trước mô phỏng **MS Teams Adaptive Card** (FactSet, Bot header, nút CTA *[ Mở Task ]*).
4. **Thanh Trợ Lý Vận Hành Sidebar (`GeminiGlobalPanel.jsx`)**:
   - Mở thanh trợ lý trượt cạnh phải.
   - Gợi ý câu hỏi thông minh theo ngữ cảnh tab đang xem.
   - Nhận diện lệnh giọng nói (Voice command) và lệnh văn bản để truy vấn dữ liệu nhanh.

---

## 4. CÁC HẠN CHẾ, VẤN ĐỀ VÀ BUGS TIỀM ẨN CẦN GIẢI QUYẾT

Khi chuyển giao dự án, chatbot/lập trình viên tiếp theo cần lưu ý các vấn đề kỹ thuật sau:

### ⚠️ Hạn chế 1: Chưa có Database & Backend Thực Tế (State Mất Khi F5)
- **Vấn đề**: Hiện tại 100% dữ liệu đang được quản lý thông qua React State trong `App.jsx` và nạp ban đầu từ `src/data/mockData.js`. Khi người dùng refresh trình duyệt (F5), mọi dữ liệu mới thêm (sản phẩm mới tạo, kế hoạch vừa duyệt, task vừa tạo, chỉnh sửa KPI báo cáo tuần) sẽ bị khôi phục về trạng thái mock ban đầu.
- **Giải pháp cần làm**: Xây dựng Backend API (REST hoặc GraphQL với Node.js/Express, NestJS hoặc Supabase/Firebase) và kết nối Database (PostgreSQL / Supabase / MongoDB). Cần lưu trữ bảng `products`, `campaigns`, `master_plans`, `tasks`, `users`, `weekly_reports`.

### ⚠️ Hạn chế 2: Chưa có Hệ Thống Xác Thực & Phân Quyền Thật (Auth & Real RBAC)
- **Vấn đề**: Multi-user switcher (`UserSelector.jsx`) hiện chỉ đổi object `currentUser` trong React state phía client. Bất kỳ ai cũng có thể bấm đổi sang tài khoản của Lâm Quang Thịnh để duyệt kế hoạch mà không cần đăng nhập mật khẩu hay bảo mật.
- **Giải pháp cần làm**: 
  - Triển khai Authentication (NextAuth, Supabase Auth, Firebase Auth hoặc JWT Auth).
  - Phân quyền Backend (Role-Based Access Control - RBAC) dựa trên 3 bảng đã thiết kế ERD: `users`, `roles`, `permissions`.
  - Chỉ cho phép tài khoản có quyền `campaign:approve` mới được gọi API duyệt Master Plan.

### ⚠️ Hạn chế 3: Tích Hợp Meta Ads API Đang Là Mock Tĩnh
- **Vấn đề**: Trạng thái đồng bộ Meta Ads trong `ProductCard3Zone` (Leads, SQLs, CPL, Ad Account ID) đang đọc từ mock data cố định, chưa có webhook hoặc cron job lấy chỉ số quảng cáo thực tế từ Meta Marketing API (Graph API).
- **Giải pháp cần làm**: Xây dựng API connector kết nối với Facebook Graph API, lưu `access_token`, `ad_account_id` và định kỳ đồng bộ các metrics: `spend`, `impressions`, `clicks`, `leads`.

### ⚠️ Hạn chế 4: Trí Tuệ Tự Động Hóa (AI Engine) Đang Dùng Giả Lập Timeout
- **Vấn đề**: Các tính năng thông minh như *"Trợ lý Hoạch định Chiến lược"*, *"Chạy Phân Tích Báo Cáo"*, *"Auto-QA kiểm tra Creative"* và *"Trợ lý Vận hành Panel"* hiện đang dùng `setTimeout(..., 800 - 1100ms)` và template tĩnh để sinh phản hồi.
- **Giải pháp cần làm**: Tích hợp LLM API thật (như Google Gemini 1.5 Flash/Pro API, Anthropic Claude API hoặc OpenAI API). Thiết kế System Prompt chuẩn hóa cho từng tác vụ, sử dụng Function Calling và ép kiểu phản hồi dạng JSON Schema (Structured Output).

### ⚠️ Hạn chế 5: Upload File Asset Đang Dùng URL Tạm Thời
- **Vấn đề**: Trong `SlideOverFeedbackPanel.jsx`, khi người dùng tải lên ảnh hoặc video creative, file chỉ được tạo link xem trước bằng `URL.createObjectURL(file)`. Link này chỉ tồn tại trong phiên duyệt web hiện tại và sẽ lỗi khi đóng tab hoặc tải lại.
- **Giải pháp cần làm**: Tích hợp dịch vụ Cloud Storage (AWS S3, Cloudinary, Supabase Storage hoặc Google Cloud Storage) để lưu trữ file thật và trả về public URL lâu dài.

### ⚠️ Hạn chế 6: Nút Gửi Báo Cáo MS Teams & Email Cần Kết Nối Webhook/Graph API Thực Tế
- **Vấn đề**: Nút *"Bắn báo cáo vào Teams"* hiện copy nội dung chuẩn Teams Markdown vào Clipboard và hiển thị Toast mô phỏng; nút *"Gửi Báo Cáo"* chỉ hiển thị thông báo Toast giả lập.
- **Giải pháp cần làm**: Tích hợp Microsoft Graph API / Teams Incoming Webhook để tự động đẩy tin nhắn và Adaptive Card vào Channel Teams của Ban Giám Đốc/Marketing Management, đồng thời kết nối dịch vụ Email (Resend, SendGrid, Amazon SES) để tự động gửi email HTML báo cáo cho ban giám đốc lúc 16:30 thứ Sáu hàng tuần.

### ⚠️ Hạn chế 7: Tối Ưu Hóa Giao Diện Cho Màn Hình Cực Nhỏ (< 640px)
- **Vấn đề**: Bảng Kanban 5 cột và Modal Báo cáo tuần được thiết kế tối ưu nhất cho màn hình Desktop (từ 1024px trở lên). Trên màn hình điện thoại di động nhỏ (< 375px), một số thành phần bảng KPI có thể cần cuộn ngang.
- **Giải pháp cần làm**: Tinh chỉnh responsive mobile-first cho các bảng biểu và hỗ trợ swipe chuyển cột trên màn hình điện thoại.

---

## 5. DANH SÁCH TÁC VỤ PHÁT TRIỂN TIẾP THEO (FEATURE BACKLOG ROADMAP)

Dưới đây là thứ tự ưu tiên đề xuất cho chatbot / lập trình viên tiếp theo:

### 🎯 Giai đoạn 1: Kết Nối Backend & Lưu Trữ Dữ Liệu Bền Vững (Priority: Cao Nhất)
- [ ] **Task 1.1**: Thiết lập Cơ sở dữ liệu (PostgreSQL / Supabase) với Schema chuẩn:
  - Bảng `products` (id, name, brand, branch, topic_group, problem_statement, target_user, meta_sync_data, created_at).
  - Bảng `campaigns` (id, product_id, title, status, budget, start_date, end_date).
  - Bảng `master_plans` (id, product_id, title, creator_id, reviewer_id, status, budget, kpi, sub_campaigns_json).
  - Bảng `tasks` (id, master_plan_id, title, assignee_id, stage, due_date, brief_json, asset_url).
  - Bảng `users` (id, name, email, avatar, role, is_active).
  - Bảng `weekly_reports` (id, week_number, period, metrics_json, executive_summary, status).
- [ ] **Task 1.2**: Thay thế React useState trong `App.jsx` bằng các React Query / SWR hooks gọi REST API CRUD.

### 🎯 Giai đoạn 2: Kết Nối LLM API Cho Tính Năng Trợ Lý Tự Động (Priority: Cao)
- [ ] **Task 2.1**: Tích hợp Gemini API / OpenAI API vào luồng `GeminiGuidedPlannerModal.jsx` để sinh nội dung Campaign Framework thật dựa trên 5 trường dữ liệu của sản phẩm.
- [ ] **Task 2.2**: Tích hợp LLM phân tích số liệu thực tế trong `WeeklyReportModal.jsx` để tự động đối soát chỉ số thực tế vs mục tiêu và viết nhận định điều hành.
- [ ] **Task 2.3**: Xây dựng endpoint AI Auto-QA đọc file ảnh/video của Creative để nhận diện text và kiểm tra tỷ lệ vi phạm chính sách ads.

### 🎯 Giai đoạn 3: Phân Quyền Người Dùng & Quản Trị Tổ Chức (Priority: Trung Bình)
- [ ] **Task 3.1**: Triển khai trang Đăng nhập / Đăng ký (Login / SSO).
- [ ] **Task 3.2**: Phân quyền chi tiết:
  - C-Level / Manager (Lâm Quang Thịnh): Toàn quyền duyệt Master Plan, chỉnh sửa KPI, gửi báo cáo.
  - Growth Executive (Lê Phạm Minh Châu): Quyền lập Plan, tạo task, chạy chiến dịch.
  - Team Members: Chỉ xem và kéo task của mình, nộp bài bàn giao.

### 🎯 Giai đoạn 4: Tích Hợp Kênh Giao Tiếp Thực Tế (Priority: Mở Rộng)
- [ ] **Task 4.1**: Tích hợp MS Teams Bot / Teams Incoming Webhook gửi thông báo tự động và thẻ Adaptive Card tương tác khi có Master Plan cần duyệt hoặc task trễ hạn.
- [ ] **Task 4.2**: Kết nối Meta Ads API trực tiếp bằng OAuth để đồng bộ số liệu CPL, Leads thực tế.
- [ ] **Task 4.3**: Xuất file Báo cáo tuần ra định dạng PDF / Excel chuyên nghiệp.

---

## 6. HƯỚNG DẪN KHỞI CHẠY & KIỂM TRA MÃ NGUỒN

1. **Khởi chạy ứng dụng**:
   ```powershell
   cd c:\Growth-loop
   npm.cmd install
   npm.cmd run dev
   ```
   Truy cập: `http://localhost:5173/`

2. **Kiểm tra biên dịch & lỗi cú pháp**:
   ```powershell
   npm.cmd run build
   ```
   *(Đảm bảo trả về mã `0 errors` và tạo thư mục `dist/` thành công)*.

3. **Cấu trúc thư mục mã nguồn chính**:
   - `src/App.jsx`: Component gốc điều phối toàn bộ State và hiển thị các màn hình/modal.
   - `src/components/Navigation.jsx`: Thanh Header điều hướng chính.
   - `src/components/dashboard/`: Các widgets của màn hình Control Center.
   - `src/components/product-master/`: Bảng danh mục sản phẩm và thẻ chi tiết 3 vùng.
   - `src/components/workflow/`: Kanban Board, thanh trượt kiểm duyệt và modal đúc kết bài học.
   - `src/components/report/`: Modal Báo Cáo Tuần và bộ chọn tuần.
   - `src/components/gemini/`: Các modal trợ lý hoạch định, sidebar trợ lý và popup creative brief.
   - `src/components/team/`: Modal quản lý nhân sự và cài đặt tự động giục deadline.
   - `src/data/mockData.js`: Cơ sở dữ liệu mẫu toàn diện của hệ thống.

---

## 7. ĐẶC TẢ KỸ THUẬT: TÍCH HỢP PHÊ DUYỆT MASTER PLAN TRỰC TIẾP TRÊN MS TEAMS QUA ADAPTIVE CARD

### 1. Mục Đích Tính Năng (Business & Technical Objectives)
- **Tối ưu thời gian phản hồi (Low Latency Approval)**: Cho phép C-Level / Approver (như Lâm Quang Thịnh - Acting Marketing Manager) nhận thông báo có Master Plan mới ngay trên Microsoft Teams (Desktop & Mobile App) của doanh nghiệp.
- **Duyệt không cần chuyển ngữ cảnh (Zero-Context Switching)**: Người duyệt có thể đọc nhanh tóm tắt thông số cốt lõi (Ngân sách, SQLs KPI, Thông điệp chính, Phân bổ 2 sub-campaigns) và bấm nút **"Phê duyệt"** hoặc **"Từ chối"** kèm lý do trực tiếp trên thẻ tương tác (Interactive Adaptive Card) mà không cần đăng nhập hay mở web Growth Loop.
- **Đồng bộ thời gian thực (Real-time Bi-directional Sync)**: Trạng thái duyệt trên Teams được đồng bộ tức thì về hệ thống Growth Loop, tự động mở khóa các task con trên Kanban Board.

---

### 2. Cấu Trúc Nội Dung Thẻ (Card Schema Specs)

Thẻ được thiết kế theo chuẩn **Adaptive Card 1.4+** với bố cục trực quan, phân tầng thông tin rõ ràng:

1. **Header (Phần Đầu Thẻ)**:
   - Icon nhận diện Bot & Huy hiệu hệ thống: `[⚡ Growth Loop Enterprise Bot]`
   - Tiêu đề chính: `📋 YÊU CẦU PHÊ DUYỆT KẾ HOẠCH CHIẾN DỊCH (MASTER PLAN)`
   - FactSet khởi tạo:
     * **Sản phẩm:** `Mắt Bão - Cloud Hosting Doanh Nghiệp (MBN)`
     * **Người lập kế hoạch:** `Lê Phạm Minh Châu (Senior Growth Executive)`
     * **Thời gian gửi:** `Hôm nay, 16:30`
     * **Tổng ngân sách:** `15.000.000 VNĐ`
     * **Trạng thái:** `⏳ Đang chờ Quản lý phê duyệt`

2. **Body (Phần Thân Thẻ)**:
   - **Mục tiêu cốt lõi (Target KPI)**: Số lượng SQLs kỳ vọng (ví dụ: `240 SQLs`), CPL mục tiêu (`125.000 VNĐ`).
   - **Thông điệp chủ đạo (Key Message / Angle)**: Định hướng truyền thông chính của chiến dịch.
   - **Phân bổ Sub-campaigns (Phễu 2 tầng)**:
     * *Phễu 1 (Teasing/Nhận diện)*: Kênh Facebook Video & Carousel, ngân sách 6.000.000 VNĐ.
     * *Phễu 2 (Retargeting/Chốt đơn)*: Kênh Lead Ads ưu đãi hoá đơn đầu vào, ngân sách 9.000.000 VNĐ.

3. **Footer & ActionSet (Các Nút Tương Tác)**:
   - **Nút "Phê duyệt" (`Action.Submit`)**:
     * Gửi payload phê duyệt tức thì về Backend Growth Loop (`action: "approve"`).
     * Style: `positive` (Nút màu xanh lá hoặc tím chủ đạo).
   - **Nút "Từ chối" (`Action.ShowCard`)**:
     * Mở form con xổ xuống (Inline Sub-card) chứa ô nhập lý do `rejectReason` (`Input.Text` multiline, `isRequired: true`) và nút bấm con `[ ⚠️ Xác Nhận Từ Chối ]` (`Action.Submit` với `action: "reject"`).
   - **Nút "Xem trên Web" (`Action.OpenUrl`)**:
     * Mở trực tiếp URL chi tiết của Master Plan trên Growth Loop web portal để xem đầy đủ biểu đồ và creative briefs.

---

### 3. Payload Mẫu Chuẩn Adaptive Card (JSON Schema v1.4)

```json
{
  "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
  "type": "AdaptiveCard",
  "version": "1.4",
  "msteams": {
    "width": "Full"
  },
  "body": [
    {
      "type": "Container",
      "style": "emphasis",
      "bleed": true,
      "items": [
        {
          "type": "ColumnSet",
          "columns": [
            {
              "type": "Column",
              "width": "auto",
              "items": [
                {
                  "type": "Image",
                  "url": "https://img.icons8.com/color/48/microsoft-teams.png",
                  "size": "Small"
                }
              ]
            },
            {
              "type": "Column",
              "width": "stretch",
              "items": [
                {
                  "type": "TextBlock",
                  "text": "GROWTH LOOP NOTIFICATION",
                  "size": "Small",
                  "weight": "Bolder",
                  "color": "Accent"
                },
                {
                  "type": "TextBlock",
                  "text": "📋 Yêu Cầu Phê Duyệt Master Plan Chiến Dịch",
                  "size": "Medium",
                  "weight": "Bolder",
                  "wrap": true
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "type": "FactSet",
      "facts": [
        {
          "title": "Sản phẩm / Brand:",
          "value": "Mắt Bão - Cloud Hosting Doanh Nghiệp"
        },
        {
          "title": "Người lập:",
          "value": "Lê Phạm Minh Châu (Senior Growth Executive)"
        },
        {
          "title": "Người duyệt chỉ định:",
          "value": "Lâm Quang Thịnh (Acting Marketing Manager)"
        },
        {
          "title": "Tổng ngân sách:",
          "value": "15.000.000 VNĐ"
        },
        {
          "title": "Mục tiêu SQLs:",
          "value": "240 SQLs (CPL trần 125.000 VNĐ)"
        },
        {
          "title": "Trạng thái:",
          "value": "⏳ Đang Chờ Duyệt"
        }
      ]
    },
    {
      "type": "Container",
      "separator": true,
      "items": [
        {
          "type": "TextBlock",
          "text": "🎯 **Thông Điệp Chủ Đạo:** 'Giải pháp Cloud Hosting chuẩn tốc độ cao - Miễn phí dịch chuyển dữ liệu 100%'",
          "wrap": true,
          "size": "Small"
        },
        {
          "type": "TextBlock",
          "text": "📊 **Phân Bổ Sub-campaigns:**",
          "weight": "Bolder",
          "size": "Small",
          "spacing": "Medium"
        },
        {
          "type": "TextBlock",
          "text": "• **Camp 1 (Teasing/Nhận diện):** Facebook Video Review 15s + Carousel - Ngân sách: 6.000.000 VNĐ\n• **Camp 2 (Retargeting/Chốt đơn):** Facebook Lead Ads Tặng Voucher Hosting - Ngân sách: 9.000.000 VNĐ",
          "wrap": true,
          "size": "Small",
          "spacing": "Small"
        }
      ]
    }
  ],
  "actions": [
    {
      "type": "Action.Submit",
      "title": "✅ Phê Duyệt Kế Hoạch",
      "style": "positive",
      "data": {
        "action": "approve",
        "planId": "plan-1727160000",
        "approver": "Lâm Quang Thịnh",
        "approverEmail": "approver@demo.local"
      }
    },
    {
      "type": "Action.ShowCard",
      "title": "❌ Từ Chối / Yêu Cầu Sửa",
      "style": "destructive",
      "card": {
        "type": "AdaptiveCard",
        "body": [
          {
            "type": "TextBlock",
            "text": "Lý do từ chối hoặc góp ý chỉnh sửa:",
            "weight": "Bolder",
            "size": "Small"
          },
          {
            "type": "Input.Text",
            "id": "rejectReason",
            "isMultiline": true,
            "placeholder": "Ví dụ: Giảm 20% ngân sách phễu 1 dồn sang retargeting...",
            "isRequired": true,
            "errorMessage": "Vui lòng nhập lý do từ chối kế hoạch"
          }
        ],
        "actions": [
          {
            "type": "Action.Submit",
            "title": "⚠️ Xác Nhận Từ Chối",
            "data": {
              "action": "reject",
              "planId": "plan-1727160000",
              "approver": "Lâm Quang Thịnh",
              "approverEmail": "approver@demo.local"
            }
          }
        ]
      }
    },
    {
      "type": "Action.OpenUrl",
      "title": "🔗 Xem Trên Web",
      "url": "https://growth-loop.internal/campaigns/plan-1727160000"
    }
  ]
}
```

---

### 4. Luồng Xử Lý Kỹ Thuật (Architecture & Bi-directional Workflow)

```
[Growth Lead]
     │ (1) Bấm "Chốt Kế Hoạch"
     ▼
[Growth Loop Backend]
     │ (2) Tạo Payload Adaptive Card v1.4
     ▼
[MS Graph API / Webhook] ────────► [MS Teams Client của Approver]
                                             │
                                   (3) Approver bấm "Duyệt"
                                       hoặc "Từ chối" + lý do
                                             ▼
[Growth Loop Webhook Callback] ◄──────────────┘
     │
     │ (4) Xác thực HMAC & Token bảo mật
     │ (5) Cập nhật Database: status = 'approved' | 'rejected'
     │
     ├─────────────────────────────────────────┐
     ▼                                         ▼
[Update Teams Card in-place]         [Auto-spawn Tasks on Kanban]
"✅ Đã duyệt bởi Lâm Quang Thịnh"     Sinh các task con phân vai
                                     (Content, Design, Video, Ads)
```

#### Chi Tiết 4 Bước Vận Hành:

- **Bước 1 (Trigger & Dispatch)**:
  * Khi Senior Growth Executive (Lê Phạm Minh Châu) hoàn tất form trong `GeminiGuidedPlannerModal.jsx` và bấm *"Chốt Kế Hoạch"*, Frontend gửi request `POST /api/v1/master-plans`.
  * Backend lưu bản ghi với trạng thái `pending_approval`.
  * Background Worker kích hoạt Microsoft Graph API (hoặc Teams Incoming Webhook) gửi thẻ Adaptive Card trực tiếp tới cuộc trò chuyện cá nhân (1:1 chat) hoặc Channel của Người duyệt (Lâm Quang Thịnh).

- **Bước 2 (User Action on Teams)**:
  * Người duyệt mở Teams trên điện thoại hoặc máy tính, xem tóm tắt FactSet.
  * Nếu đồng ý: Bấm **`[ ✅ Phê Duyệt Kế Hoạch ]`**.
  * Nếu không đồng ý: Bấm **`[ ❌ Từ Chối / Yêu Cầu Sửa ]`**, nhập lý do vào ô text multiline và bấm **`[ ⚠️ Xác Nhận Từ Chối ]`**.
  * Teams gửi HTTP POST payload chứa `action`, `planId`, `approverEmail`, `rejectReason` (nếu có) tới webhook endpoint của hệ thống: `POST https://api.growthloop.vn/webhooks/teams/approval-callback`.

- **Bước 3 (Backend Processing & Card In-place Refresh)**:
  * Backend xác thực chữ ký HMAC bảo mật từ Microsoft Teams.
  * Cập nhật bản ghi `master_plans`:
    * Nếu Approve: `status = 'approved'`, `approved_at = NOW()`, `approved_by = 'mem-thinh'`.
    * Nếu Reject: `status = 'rejected'`, `rejected_at = NOW()`, `reject_reason = payload.rejectReason`.
  * Backend gửi HTTP response kèm payload thẻ cập nhật tại chỗ (**Update Card in-place**). Thẻ cũ trên Teams được làm mới ngay lập tức: các nút tương tác biến mất, thay bằng banner màu xanh tĩnh: `"✅ Kế hoạch chiến dịch đã được Lâm Quang Thịnh phê duyệt lúc 16:35"`.

- **Bước 4 (Kanban Board Task Automation)**:
  * Khi kế hoạch được duyệt, hệ thống tự động bóc tách các Sub-campaigns (Phễu 1 & Phễu 2) thành các Task con:
    * Task 1: *Viết Ad Copy Teasing 15s* -> Gán cho `Hoàng Minh Khôi (Social Executive)`.
    * Task 2: *Thiết kế Banner Carousel* -> Gán cho `Nguyễn Duy Quý (Intern)`.
    * Task 3: *Cài đặt chiến dịch Lead Ads* -> Gán cho `Nguyễn Ngọc Khánh (Marketing Executive)`.
  * Các task này xuất hiện ngay trên bảng Kanban Board ở cột **"Briefing / Cần Sản Xuất"**, đồng thời kích hoạt lịch đếm ngược deadline và tự động ping nhắc việc qua Teams theo cấu hình trong `TeamManagementModal.jsx`.

---

## 8. HƯỚNG DẪN KẾT NỐI SUPABASE & TRIỂN KHAI DATABASE MIGRATION

Hệ thống đã được thiết kế sẵn hạ tầng BaaS **Supabase (PostgreSQL)** với cơ chế bảo vệ kép (Hybrid Resilience):

### 1. File Migration & Khởi Tạo Database
- Mã nguồn SQL khởi tạo hoàn chỉnh: [`supabase/migrations/20260924_initial_schema.sql`](file:///c:/Growth-loop/supabase/migrations/20260924_initial_schema.sql).
- Bao gồm:
  - 7 bảng quan hệ: `users`, `products`, `master_plans`, `campaigns`, `tasks`, `creative_assets`, `weekly_reports`.
  - Trigger tự động sinh `version_hash` chống duyệt đè (Optimistic Concurrency Control).
  - Row Level Security (RLS) policies.
  - Cấu hình Supabase Storage bucket `creative-assets`.
  - Dữ liệu Seed ban đầu cho 12 sản phẩm thực tế (MBC & MBI) và 6 thành viên trong team.

### 2. Các Bước Kích Hoạt Database Thật
1. Tạo một project mới tại [Supabase Dashboard](https://supabase.com).
2. Vào **SQL Editor** $\rightarrow$ Dán toàn bộ nội dung file [`20260924_initial_schema.sql`](file:///c:/Growth-loop/supabase/migrations/20260924_initial_schema.sql) và bấm **Run**.
3. Vào **Storage** $\rightarrow$ Tạo mới bucket tên **`creative-assets`** (chọn chế độ Public bucket).
4. Vào **Project Settings** $\rightarrow$ **API** $\rightarrow$ Copy `Project URL` và `anon public key`.
5. Mở file [`.env.local`](file:///c:/Growth-loop/.env.local) và điền các giá trị:
   ```env
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-public-key
   VITE_SUPABASE_STORAGE_BUCKET=creative-assets
   ```
6. Khởi động lại ứng dụng: `npm.cmd run dev`. Hệ thống sẽ tự động chuyển từ **Mock Mode** sang **Real Database Mode** mà không cần sửa đổi mã nguồn UI.

