# BÁO CÁO TOÀN DIỆN HIỆN TRẠNG HỆ THỐNG GROWTH-LOOP OS & TÀI LIỆU THAM VẤN PHÁT TRIỂN

> **Mục đích tài liệu**: Cung cấp bức tranh toàn cảnh về kiến trúc, tính năng đã hoàn thiện, hạn chế kỹ thuật hiện tại và các câu hỏi chiến lược để gửi cho mô hình AI (Google Gemini / Claude / GPT) tham vấn định hướng phát triển tính năng tiếp theo cho hệ thống **Growth-loop**.

---

## 1. TỔNG QUAN DỰ ÁN & TRIẾT LÝ SẢN PHẨM

### 1.1. Định vị sản phẩm (Product Positioning)
- **Tên hệ thống**: **Growth-loop Enterprise OS**
- **Doanh nghiệp ứng dụng**: Hệ sinh thái dịch vụ chuyển đổi số TechCorp, phục vụ 2 đơn vị độc lập:
  - **🏢 Alpha (Matbao-corp)**: Hạ tầng Domain Registry, Hosting (Cloud Server Pro, Managed Cloud Hosting), Enterprise Workspace, M365 Copilot, Email Doanh nghiệp, Chứng chỉ số (VMC, S-MIME).
  - **🧾 Beta (Matbao-invoice)**: Nền tảng E-Invoicing Platform, E-Contract Suite, Smart AP Automation, Digital Signature CA (Cloud CA).
- **Mục tiêu cốt lõi**: Trở thành **Hệ điều hành vận hành Growth Marketing chuyên sâu (Execution-focused Marketing OS)**:
  - **TẬP TRUNG**: Quản trị chiến dịch đa tầng (Phễu 2 bước: Teasing & Retargeting), kiểm soát tiến độ sản xuất creative assets (Content, Design, Video), quy trình kiểm duyệt chất lượng nội dung trước khi on-air, và đúc kết bài học tự động.
  - **KHÔNG ĐI SÂU**: Không đóng vai trò kế toán chi phí quảng cáo (Ads Accounting/Burn rate) hay phân tích tài chính sâu, chỉ đo lường hiệu quả chuyển đổi mục tiêu (Leads, SQLs, CPL mục tiêu).

### 1.2. Triết lý Thiết kế (Design & Copywriting Philosophy)
- **Soft Pastel Minimalist UI**: Tone màu trắng sứ làm chủ đạo kết hợp dải màu pastel mềm mại (Tím Indigo nhạt, Xanh ngọc bích, Hồng đào), bo góc lớn (12px - 24px), viền mỏng 1px (`border-slate-200/80`), tối giản và hiện đại.
- **Enterprise-grade Copywriting**: Loại bỏ hoàn toàn các từ khóa mang tính phô trương công nghệ (*Gemini, AI, Copilot, Prompt*). Thay vào đó, sử dụng chuẩn hóa thuật ngữ chuyên ngành: *Trợ lý Hoạch định Chiến lược, Hệ thống Auto-QA, Chẩn đoán Hệ thống, Đánh giá & Đề xuất Hành động*.
- **Hệ sinh thái kết nối doanh nghiệp**: Tích hợp sâu vào công cụ làm việc chuẩn doanh nghiệp — **Microsoft Teams** (Teams Graph API & Webhooks) cho toàn bộ luồng thông báo, báo cáo và phê duyệt.

---

## 2. MA TRẬN TÍNH NĂNG ĐÃ HOÀN THÀNH (CURRENT FEATURE INVENTORY)

Dưới đây là các tính năng đã được code hoàn thiện trên giao diện Frontend:

### 2.1. Quản Trị Danh Mục Sản Phẩm (Product Master Matrix)
- **Cấu trúc dữ liệu 5 trường chuẩn hóa**: Tên sản phẩm, Ngành hàng/Topic, Vấn đề khách hàng gặp phải (Problem Statement), Đối tượng mục tiêu (Target Persona), Thông điệp & Góc tiếp cận (Angle).
- **Tổ chức 2 khối thương hiệu (Alpha vs Beta)**:
  - Bộ lọc Segmented Control inline (`Tất cả (12)`, `🏢 Alpha (8)`, `🧾 Beta (4)`).
  - Đèn báo trạng thái context-aware tự động nhấp nháy trên nút thương hiệu nếu có sản phẩm thiếu chiến dịch hoặc CPL vượt ngưỡng an toàn.
- **Thẻ Sản phẩm 3 Vùng (ProductCard3Zone)**:
  - **Vùng 1 (Performance Metrics)**: Trạng thái đồng bộ Meta Ads (Leads, SQLs, CPL, Ad Account ID), Badge cảnh báo đỏ nếu CPL cao.
  - **Vùng 2 (Campaign Framework Preview)**: Hiển thị các chiến dịch đang chạy, phân tách Phễu 1 (Teasing) & Phễu 2 (Retargeting).
  - **Vùng 3 (Action & Diagnosis)**: Nút kích hoạt nhanh luồng lập kế hoạch, hiển thị chẩn đoán nguyên nhân và khuyến nghị tối ưu.
- **Thẻ Domain Registry thiết kế đặc thù**: Hỗ trợ gắn thẻ danh sách các nhóm đuôi mở rộng (`.VN / .COM`, `.CLOUD`, `.IO`, `.AI`, `.XYZ`, `.ASIA`, `.ICU`...).

### 2.2. Luồng Hoạch Định Chiến Dịch Thông Minh (Strategic Campaign Builder)
- **Modal 4 bước định hướng**:
  - Bước 1: Chọn sản phẩm trong danh mục 12 sản phẩm thực tế.
  - Bước 2: Tự động phác thảo mục tiêu SQLs, Timeline, Key Message.
  - Bước 3: Tự động phân tách thành 2 chiến dịch con:
    * **Camp 1 (Teasing / Phủ nhận thức)**: Facebook Video Review 15s + Carousel.
    * **Camp 2 (Retargeting / Chốt đơn)**: Facebook Lead Ads voucher ưu đãi.
  - Bước 4: Chọn phân quyền duyệt: Người lập (**Sarah**) và Người duyệt (**Alex**).
- **Chốt kế hoạch (Commit Plan)**: Tự động sinh Master Plan gửi quản lý và tạo sẵn các task con phân vai tương ứng vào bảng Kanban Board.

### 2.3. Bảng Vận Hành Quy Trình Sản Xuất (Workflow & Kanban Board)
- **Bảng Kanban 5 cột chuẩn**: `Not Started` $\rightarrow$ `In Progress` $\rightarrow$ `In Review` $\rightarrow$ `Revision` $\rightarrow$ `Done`.
- **Thẻ công việc phân cấp**: Gắn thẻ loại tài nguyên (Content, Design, Video), Avatar nhân sự phụ trách, Deadline, cảnh báo trễ hạn trực quan (`⚠️ Trễ X ngày`).
- **Hỗ trợ kéo thả (Drag & Drop)**: Di chuyển task trực tiếp giữa các cột để cập nhật trạng thái tức thì.
- **Slide-over Feedback & Kiểm Duyệt (~40% màn hình)**:
  - Xem trước tài nguyên trực quan: Ảnh banner (1080x1080, 1200x628), Video Storyboard (Hook 3s), Bản thảo Ad Copy kèm bộ đếm từ.
  - Đối chiếu nhanh với Brief gốc (Target Persona, Key Message, Deliverables).
  - **Tính năng Auto-QA kiểm tra Creative**: Tự động rà soát mật độ chữ $(< 20\%)$, mã màu thương hiệu TechCorp (`#2563EB` / `#059669`), nút kêu gọi hành động (CTA).
  - Luồng feedback 2 chiều: Nút `[ Phê Duyệt ]` (đẩy sang Done) và `[ Yêu Cầu Sửa ]` (đẩy về Revision kèm góp ý chi tiết).
- **Modal Đúc Kết Bài Học (Growth Library Modal)**: Khi kéo task vào `Done`, hệ thống gợi ý ghi lại bài học kinh nghiệm (Learning Note) và lưu trữ vào Thư viện Growth để tái sử dụng cho các chiến dịch tương lai.

### 2.4. Màn Hình Báo Cáo Tuần (Interactive Weekly Report)
- **Bộ chọn tuần linh hoạt (Week Picker)**: Dropdown cho phép chuyển đổi xem lại các kỳ báo cáo (Tuần 37, Tuần 38, Tuần 39, Tuần 40...).
- **Chỉnh sửa số liệu trực tiếp (Inline KPI Editing)**: Nhấp đúp vào chỉ số Thực tế/Mục tiêu (Leads, SQLs) để chỉnh sửa số liệu phát sinh.
- **Nút "✨ Chạy Phân Tích" chủ động**: Sau khi sửa số liệu, người dùng chủ động kích hoạt hệ thống tự động tổng hợp tỷ lệ đạt KPI của Alpha & Beta, viết nhận định điều hành và action plan.
- **Tích hợp Microsoft Teams**:
  - Nút **"Bắn báo cáo vào Teams"** màu tím chuẩn Teams (`#6264A7`) kèm icon logo MS Teams.
  - Tự động đóng gói nội dung sang chuẩn **Teams Markdown** và copy vào Clipboard.
- **Xuất bản**: Hỗ trợ chế độ In / Xuất PDF chuẩn giao diện in ấn (`window.print()`).

### 2.5. Quản Lý Đội Ngũ & Tự Động Nhắc Việc (Team Management & Automation)
- **Cơ sở dữ liệu nhân sự thực tế (Source of Truth)**:
  1. `Alex` - Head of Marketing (Người duyệt kế hoạch / Kính gửi báo cáo).
  2. `Sarah` - Growth Lead (Người lập kế hoạch / Owner).
  3. `Member A` - Social Executive (Bài viết, content, social).
  4. `Member B` - Marketing Executive (Vận hành chiến dịch, paid ads).
  5. `Member D` - SEO Executive (Nội dung web, organic search).
  6. `Member C` - Intern (Hỗ trợ thiết kế, assets).
- **Cài đặt nhắc việc tự động qua MS Teams**:
  - Kênh thông báo: *Gửi Direct Message qua Teams* và *Mention (@) vào Channel của Team*.
  - Cấu hình mốc giờ nhắc việc trước deadline (ví dụ: trước 24 giờ và trước 2 giờ).
  - Cấu hình Tone of Voice: *Nhẹ nhàng/Cổ vũ*, *Chuyên nghiệp*, *Báo động đỏ (Khẩn cấp)*.
  - **Khung xem trước chuẩn MS Teams Adaptive Card**: Mô phỏng trực tiếp bot header, FactSet 2 cột, nội dung văn phong và nút CTA `[ 🔗 Mở Task ]`.

### 2.6. Bảng Điều Khiển Trung Tâm (Minimalist Dashboard / Control Center)
- **Thanh chỉ số nhanh (KPI Summary Strip)**: Hiển thị Tổng số SQLs, Tỷ lệ hoàn thành mục tiêu tháng, Số lượng Creative Assets đang sản xuất.
- **Widget Độ Phủ Chiến Dịch (Campaign Coverage)**: Phân tích trực quan sản phẩm nào đang chạy chiến dịch, sản phẩm nào bị bỏ trống để ưu tiên lập kế hoạch.
- **Widget Giám Sát Chất Lượng Creative (Creative QA Health)**: Tỷ lệ duyệt lần 1 (First-time Pass Rate), số lượng assets bị trả về yêu cầu sửa.
- **Widget Tiến Độ Vận Hành & Điểm Nghẽn (Velocity & Bottlenecks)**: Thời gian hoàn tất trung bình của task, cảnh báo nhân sự đang bị quá tải hoặc task đang tồn ứ ở khâu kiểm duyệt.
- **Thư Viện Growth (Growth Library)**: Nơi lưu trữ và tra cứu các bài học kinh nghiệm, công thức headline và góc tiếp cận thành công từ các đợt chạy trước.

### 2.7. Trợ Lý Vận Hành Trượt Phải (Operational Assistant Panel)
- Trượt từ mép phải màn hình, không che khuất không gian làm việc.
- Context-aware suggestions: Tự động đổi danh sách câu hỏi gợi ý tùy theo người dùng đang ở tab Sản phẩm, tab Kanban hay Báo cáo.
- Hỗ trợ mô phỏng lệnh giọng nói (Voice Command) và lệnh nhanh: Ping nhắc việc qua MS Teams cho thành viên trong team.

---

## 3. CÁC HẠN CHẾ KỸ THUẬT & "NỢ CÔNG NGHỆ" CẦN NÂNG CẤP (TECH DEBT & LIMITATIONS)

Dự án hiện tại đang ở giai đoạn **Functional Interactive Prototype (Frontend SPA hoàn chỉnh)**. Để đưa vào vận hành thực tế cho toàn bộ phòng ban, hệ thống cần giải quyết các bài toán sau:

| # | Hạn chế hiện tại | Thực trạng mã nguồn | Giải pháp cần thiết |
|---|-------------------|---------------------|----------------------|
| **1** | **Chưa có Database & Backend API** | 100% dữ liệu đang lưu trong React State (`App.jsx`) và khởi tạo từ [`mockData.js`](file:///C:/Growth-loop/src/data/mockData.js). Bấm F5 dữ liệu sẽ trở về ban đầu. | Xây dựng Backend REST/GraphQL API (Node.js/NestJS hoặc Supabase/PostgreSQL) để lưu bền vững: `products`, `campaigns`, `master_plans`, `tasks`, `users`, `weekly_reports`. |
| **2** | **Xác thực & Phân quyền giả lập** | Đổi user trong `UserSelector.jsx` chỉ đổi state phía client, không kiểm tra token/mật khẩu. Ai cũng có thể thao tác với vai trò của Manager. | Triển khai Authentication (NextAuth, Supabase Auth hoặc SSO Microsoft Entra ID của TechCorp) và áp dụng RBAC ở cấp API Backend. |
| **3** | **Đồng bộ Meta Ads API là Mock** | Các chỉ số Leads, SQLs, CPL, Ad Account ID trong thẻ sản phẩm đang đọc tĩnh từ JSON. | Đăng ký Meta Developer App, tích hợp Marketing API (Facebook Graph API OAuth2) để định kỳ kéo số liệu ads thật theo từng Ad Set. |
| **4** | **Trí tuệ nhân tạo (AI Engine) dùng Timeout** | Tính năng phác thảo plan, Auto-QA hình ảnh và phân tích báo cáo tuần đang dùng `setTimeout(..., 800ms)` và trả về template text dựng sẵn. | Kết nối LLM API thật (Google Gemini 1.5 Flash/Pro qua `@google/genai` SDK). Xây dựng Structured Output (JSON Schema) cho Campaign Builder và Auto-QA. |
| **5** | **Upload Asset dùng URL tạm thời** | Ảnh/Video upload trong Slide-over dùng `URL.createObjectURL(file)`, mất dữ liệu khi đóng tab hoặc reload. | Tích hợp Cloud Storage (Supabase Storage, Cloudinary, AWS S3 hoặc Azure Blob Storage) để lưu file thật và lấy URL vĩnh viễn. |
| **6** | **Tương tác MS Teams mới chỉ là 1 chiều** | Báo cáo tuần copy markdown vào Clipboard; Nhắc việc Teams chỉ là preview giao diện. | Triển khai Microsoft Graph API & Incoming Webhook / Bot Framework để bắn Adaptive Card thật vào Teams Channel và nhận Webhook Callback khi Sếp bấm nút Duyệt. |

---

## 4. BỘ CÂU HỎI CHIẾN LƯỢC GỬI CHO GEMINI (PROMPT CONSULTATION GUIDE)

> **Hướng dẫn sử dụng**: Bạn hãy copy toàn bộ nội dung trong khung prompt bên dưới và dán vào Google Gemini (hoặc AI tương đương) để nhận phản hồi tư vấn chuyên sâu.

```markdown
Chào Gemini, bạn là một Chuyên gia Cấp cao về Kiến trúc Hệ thống (Principal Solutions Architect) kiêm Giám đốc Sản phẩm Tăng trưởng (Head of Growth / VP of Product).

Dưới đây là tài liệu mô tả hiện trạng chi tiết của sản phẩm "Growth-loop Enterprise OS" - một hệ điều hành quản trị vận hành chiến dịch Growth Marketing cho doanh nghiệp TechCorp (gồm 2 khối: Alpha - Hạ tầng Hosting/Domain và Beta - E-Invoicing Platform/Hợp đồng số).

Hệ thống hiện đã hoàn thiện 100% giao diện tương tác Frontend bằng React 18, Tailwind CSS, tích hợp luồng sản phẩm 3 vùng, Kanban board 5 cột, Slide-over kiểm duyệt creative, Báo cáo tuần điều hành và mô phỏng tích hợp Microsoft Teams Adaptive Card.

Hãy đọc kỹ báo cáo hiện trạng phía trên và giúp tôi giải quyết các bài toán sau:

### NHÓM CÂU HỎI 1: TƯ VẤN KIẾN TRÚC BACKEND & DATABASE LÝ TƯỞNG
1. Để đưa Growth-loop từ bản Frontend Prototype lên Production phục vụ nội bộ 20 - 50 marketers và C-Level, kiến trúc Backend nào là tối ưu nhất về tốc độ triển khai, chi phí và khả năng bảo trì?
   - Lựa chọn giữa: (A) Backend-as-a-Service (Supabase / PostgreSQL) vs (B) Full Custom API (Node.js/NestJS + PostgreSQL + Prisma) vs (C) Next.js Server Actions.
   - Hãy đề xuất Database Schema chuẩn (bao gồm quan hệ giữa Products, Campaigns, Master Plans, Tasks, Users, Creative Assets và Weekly Reports).

### NHÓM CÂU HỎI 2: ĐÁNH GIÁ ĐỘ HOÀN THIỆN TÍNH NĂNG (FEATURE GAP ANALYSIS)
2. Xét từ góc độ một Growth Lead / Marketing Director quản lý thực tế:
   - Hệ thống Growth-loop hiện tại còn đang "thiếu vắng" những mắt xích vận hành quan trọng nào trong chu trình Growth Loop (Lập kế hoạch ➔ Thực thi ➔ Đo lường ➔ Đúc kết bài học)?
   - Có cần bổ sung thêm các phân hệ sau không, và nếu có thì nên thiết kế như thế nào:
     a) Module Đo lường Đóng góp Đa kênh (Multi-touch Attribution hoặc liên kết Google Analytics 4 / CRM)?
     b) Kho quản lý tài nguyên số tập trung (Digital Asset Management - DAM) cho phép quản lý phiên bản (Version Control v1, v2, v3) của từng Banner/Video?
     c) Công cụ tính toán độ tin cậy thống kê cho các thử nghiệm A/B Testing (A/B Test Significance Calculator)?
     d) Cổng thông tin phê duyệt độc lập dành riêng cho Khách hàng / Ban Giám Đốc (Client / Executive Approval Portal)?

### NHÓM CÂU HỎI 3: THIẾT KẾ CÁC TÍNH NĂNG AI THỰC TẾ (PRAGMATIC AI INTEGRATION)
3. Chúng tôi muốn kết nối Google Gemini API (Gemini 1.5 Flash / Pro) vào hệ thống thay cho các timeout giả lập. Hãy thiết kế:
   - System Prompt và JSON Schema cụ thể cho tính năng "Trợ lý Hoạch định Chiến lược" (tự động phân rã sản phẩm thành chiến dịch 2 tầng Teasing & Retargeting).
   - Cơ chế Vision AI cho tính năng "Auto-QA Creative": Làm thế nào để gửi file ảnh Banner lên Gemini Vision và nhận về điểm số tuân thủ Brand Guidelines (Mật độ chữ, màu sắc, CTA)?
   - Workflow RAG (Retrieval-Augmented Generation) cho "Thư viện Growth": Làm thế nào để khi marketer tạo brief mới, Gemini tự động tìm kiếm các bài học thành công trong quá khứ để đưa ra khuyến nghị?

### NHÓM CÂU HỎI 4: TỐI ƯU HÓA QUY TRÌNH DUYỆT TRÊN MS TEAMS
4. Dựa trên đặc tả kỹ thuật MS Teams Adaptive Card (Mục 7 của Handover):
   - Làm thế nào để triển khai luồng Webhook Callback an toàn giữa Microsoft Teams Bot Framework và Backend Growth Loop?
   - Cần xử lý các trường hợp ngoại lệ như thế nào (ví dụ: Token hết hạn, mạng chập chờn, hoặc Sếp bấm nút Duyệt sau khi kế hoạch đã bị người khác sửa đổi)?

### NHÓM CÂU HỎI 5: LỘ TRÌNH PHÁT TRIỂN ĐỀ XUẤT (ACTIONABLE ROADMAP)
5. Hãy lập cho tôi một Lộ trình hành động (Actionable Sprint Plan) chia làm 3 giai đoạn (Phase 1: 2 tuần, Phase 2: 1 tháng, Phase 3: 3 tháng) với danh sách đầu việc cụ thể và mức độ ưu tiên rõ ràng.
```

---

## 5. HƯỚNG DẪN TRUY CẬP MÃ NGUỒN & CÁC TÀI LIỆU LIÊN QUAN

- **Thư mục dự án**: `c:\Growth-loop`
- **Tài liệu bàn giao chi tiết (Đầy đủ JSON Specs & Wireframe)**: [`PROJECT_HANDOVER.md`](file:///c:/Growth-loop/PROJECT_HANDOVER.md)
- **Hướng dẫn tổng kết tính năng và tiến độ**: [`walkthrough.md`](file:///C:/Users/MBAdmin/.gemini/antigravity/brain/710c0145-f54d-4fd9-afd2-88f19dcac51b/walkthrough.md)
- **Cơ sở dữ liệu mẫu thực tế**: [`src/data/mockData.js`](file:///c:/Growth-loop/src/data/mockData.js)
- **Local Dev Server**: Đang chạy trực tiếp tại `http://localhost:5173/`
