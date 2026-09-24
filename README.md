# Growth-loop 🔄
> **Growth Marketing Campaign Management & Reminder Tool**
> *Nền tảng quản lý vòng đời chiến dịch theo sản phẩm dành cho Marketing & Growth Team — Phát triển cho cuộc thi Vibe Code 2026.*

---

## 1. Mục tiêu của sản phẩm (Objectives)

Trong các doanh nghiệp B2B SaaS hoặc công ty có nhiều dòng sản phẩm, Marketing team thường đối mặt với các vấn đề nhức nhối:
* **Bỏ sót sản phẩm**: Có quá nhiều sản phẩm cần quảng bá, dẫn đến việc nhiều sản phẩm bị "bỏ quên", không có chiến dịch marketing trong tháng.
* **Chiến dịch bị cũ (Stale Campaigns)**: Các chiến dịch đã chạy quá 30–45 ngày mà không được thay đổi thông điệp, làm giảm tỷ lệ chuyển đổi (CTR bão hòa).
* **Thiếu không gian tập trung**: Khó nắm bắt được mối quan hệ từ **Sản phẩm → Chủ đề/Brief → Chiến dịch → Trạng thái tháng → Hành động tiếp theo**.

**Growth-loop** ra đời như một trung tâm điều phối hành động (Action Center), tự động đối soát chu kỳ hàng tháng để nhắc nhở những sản phẩm còn thiếu campaign và phát hiện những chiến dịch cần làm mới.

---

## 2. Cấu trúc dữ liệu cốt lõi (Core Data Architecture)

Dự án xoay quanh luồng dữ liệu chuẩn:  
`Product (5 trường)` $\rightarrow$ `Topic / Brief` $\rightarrow$ `Campaign` $\rightarrow$ `Monthly Status` $\rightarrow$ `Action`

### A. 5 trường bắt buộc của Sản phẩm (Product Model)
1. **Tên sản phẩm (`name`)**: Tên thương mại hoặc tính năng chính (vd: *Pipeline CRM Pro*).
2. **Nhánh đề tài (`branch`)**: Ngành hàng / Lĩnh vực (vd: *B2B SaaS, FinTech, HR Tech*).
3. **Nhóm chủ đề (`topicGroup`)**: Chủ đề cốt lõi (vd: *Tối ưu hóa phễu bán hàng*).
4. **Bài toán (`problemStatement`)**: Nỗi đau khách hàng gặp phải (Pain Point).
5. **Người dùng (`targetUser`)**: Đối tượng người dùng mục tiêu (Persona).

### B. Chiến dịch theo tháng (Campaign Model)
- Gắn chặt với `productId` và tháng áp dụng (vd: `2026-09`).
- Tự động đo lường số ngày đã chạy (`daysRunning`).
- Hệ thống nhận diện 3 trạng thái hàng tháng:
  - 🔴 **Thiếu Campaign (`MISSING`)**: Chưa có kế hoạch cho tháng hiện tại.
  - 🟡 **Cần đổi mới (`NEEDS_REFRESH`)**: Đã chạy $> 30$ ngày, cần làm mới Angle.
  - 🟢 **Đang chạy tốt (`ACTIVE`)**: Đang vận hành ổn định.
- Kiến trúc sẵn sàng kết nối AI Assistant đề xuất góc tiếp cận mới.

---

## 3. Các tính năng chính (Features)

### Đã hoàn thiện (Phase 1 Starter):
- [x] **Action Reminders Center**: Tự động phát hiện và hiển thị các sản phẩm chưa có chiến dịch trong tháng & chiến dịch bị cũ.
- [x] **Product & Campaign Matrix**: Bảng hiển thị trực quan toàn bộ danh mục sản phẩm, mở rộng để xem chi tiết 5 trường dữ liệu.
- [x] **Tạo mới Sản phẩm**: Form nhập liệu chuẩn hóa 5 trường thông tin.
- [x] **Tạo & Làm mới Campaign**: Tạo chiến dịch mới hoặc làm mới nội dung cho sản phẩm kèm chọn kênh (LinkedIn, Email, Webinar...).
- [x] **Bộ lọc thông minh**: Lọc sản phẩm *Cần xử lý khẩn cấp* hoặc *Đang chạy ổn định*, tìm kiếm theo từ khóa.
- [x] **AI Growth Advisor (Architecture Preview)**: Tự động phân tích sản phẩm thiếu chiến dịch và gợi ý Angle tiếp cận ban đầu.

### Kế hoạch phát triển tiếp theo bằng Vibe Coding (Phase 2 & 3):
- [ ] Tích hợp mô hình AI LLM (Gemini / OpenAI API) để tự động sinh Brief chi tiết và bài đăng mẫu theo từng kênh.
- [ ] Kết nối Google Calendar / MS Teams / Email để gửi thông báo nhắc lịch định kỳ vào ngày 1 hàng tháng.
- [ ] Export báo cáo kế hoạch tháng ra file Excel/PDF.
- [ ] Lưu trữ dữ liệu lâu dài với Supabase hoặc Firebase.

---

## 4. Tech Stack

- **Framework**: [React 18](https://react.dev/) + [Vite](https://vitejs.dev/) (Tốc độ khởi động siêu nhanh, cực kỳ phù hợp cho Vibe Coding).
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) (Thiết kế giao diện Modern B2B SaaS sắc nét, sạch sẽ).
- **Icon System**: [Lucide React](https://lucide.dev/) (Bộ icon đường nét tinh gọn, hiện đại).

---

## 5. Hướng dẫn từng bước chạy Project (Dành cho người mới)

Dành cho bạn nếu bạn chưa từng lập trình:

### Bước 1: Mở Terminal (Command Prompt hoặc PowerShell)
Đảm bảo bạn đang đứng ở thư mục gốc của dự án:
```bash
c:\Growth-loop
```

### Bước 2: Cài đặt các thư viện phụ thuộc
*(Lưu ý trên Windows PowerShell: nên dùng lệnh `npm.cmd` để tránh lỗi Execution Policy)*:
```bash
npm.cmd install
```
*Thời gian chạy khoảng 10–30 giây. Khi xong, bạn sẽ thấy thư mục `node_modules` xuất hiện.*

### Bước 3: Khởi chạy ứng dụng
Chạy lệnh:
```bash
npm.cmd run dev
```

Sau khi chạy, terminal sẽ hiển thị dòng thông báo màu xanh tương tự:
```text
  VITE v6.2.0  ready in 180 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

### Bước 4: Mở trên trình duyệt
Mở trình duyệt (Chrome, Edge, Brave...) và truy cập vào địa chỉ:
👉 **[http://localhost:5173](http://localhost:5173)**

Bạn sẽ thấy giao diện **Growth-loop** sẵn sàng hoạt động!

---

*Phát triển bởi Growth-loop Team cho cuộc thi Vibe Code.*
