// Dữ liệu thực tế cho Growth OS: 2 Khối Alpha (SaaS & Cloud) & Beta (Enterprise Solutions)

export const INITIAL_PRODUCTS = [
  // ==========================================
  // KHỐI 1: 🚀 Khối Alpha (SaaS & Cloud) - 8 Sản phẩm
  // ==========================================
  {
    id: "mbc-vibe-host",
    brand: "Alpha",
    brandName: "Khối Alpha (SaaS & Cloud)",
    name: "Cloud Server Pro",
    branch: "High-Performance Hosting",
    topicGroup: "Hosting tốc độ cao cho Web & App",
    problemStatement: "Website doanh nghiệp tải chậm, sập nguồn khi chạy quảng cáo tăng traffic, mất khách hàng tiềm năng.",
    targetUser: "Web Developer, Digital Agency, Doanh nghiệp TMĐT",
    createdAt: "2026-08-01",
    metaSync: {
      status: "live",
      adAccountId: "act_alpha_892104",
      lastSynced: "3 phút trước",
      activeCampaignsCount: 2,
      startDate: "10/09/2026",
      conversions: { leads: 190, sqls: 14, cpl: "$4.10", spend: "$779", cvr: "7.4%" },
      runningCampaigns: [
        { name: "[PERF] Cloud Server NVMe Tải trang dưới 0.8s", status: "Active", spend: "$450", leads: 115 },
        { name: "[AGENCY] Gói Hosting chuyên dụng cho WordPress", status: "Active", spend: "$329", leads: 75 }
      ]
    },
    aiDiagnosis: {
      badge: "Speed Winner",
      problem: "Tệp Web Designer và Agency phản hồi tốt với thông điệp tốc độ NVMe.",
      solution: "Chạy chiến dịch Speed Demo so sánh thời gian tải trang thực tế nhắm tệp Agency.",
      actionCtaText: "Chạy Camp Speed Demo",
      urgency: "success"
    }
  },
  {
    id: "mbc-domain",
    brand: "Alpha",
    brandName: "Khối Alpha (SaaS & Cloud)",
    name: "Tên Miền",
    branch: "Domain Registrar & DNS",
    topicGroup: "Đăng ký & Quản trị Tên miền Quốc gia / Quốc tế",
    isSpecialDomainCard: true,
    domainChips: [
      ".VN / .COM",
      ".CLOUD",
      ".IO",
      ".AI",
      ".XYZ",
      ".ASIA",
      ".ICU",
      "Tên miền ngành sắc đẹp",
      "Tên miền quốc tế"
    ],
    problemStatement: "Doanh nghiệp mới thành lập khó chọn tên miền đẹp, chi phí đăng ký và gia hạn thiếu minh bạch.",
    targetUser: "Doanh nghiệp mới thành lập, Founder Startup, Marketer",
    createdAt: "2026-08-05",
    metaSync: {
      status: "live",
      adAccountId: "act_alpha_892105",
      lastSynced: "1 phút trước",
      activeCampaignsCount: 4,
      startDate: "01/09/2026",
      conversions: { leads: 540, sqls: 38, cpl: "$2.80", spend: "$1,512", cvr: "7.0%" },
      runningCampaigns: [
        { name: "[PROMO] Tên miền .VN trợ giá doanh nghiệp mới", status: "Active", spend: "$620", leads: 220 },
        { name: "[TECH] Tên miền .IO & .CLOUD cho Startup", status: "Active", spend: "$410", leads: 140 },
        { name: "[RETAIL] Tên miền ngành sắc đẹp & TMĐT", status: "Active", spend: "$282", leads: 100 },
        { name: "[GLOBAL] Combo .COM + Email Doanh nghiệp", status: "Active", spend: "$200", leads: 80 }
      ]
    },
    aiDiagnosis: {
      badge: "High Volume",
      problem: "Nhu cầu đăng ký .VN & .COM cuối quý 3 đang tăng mạnh trên tệp doanh nghiệp thành lập mới.",
      solution: "Scale mạnh gói combo Tên miền .VN tặng Email Doanh nghiệp 1 năm.",
      actionCtaText: "Scale Combo .VN + Email",
      urgency: "success"
    }
  },
  {
    id: "mbc-google-workspace",
    brand: "Alpha",
    brandName: "Khối Alpha (SaaS & Cloud)",
    name: "Google Workspace",
    branch: "Cloud Productivity",
    topicGroup: "Hệ sinh thái làm việc cộng tác & Gmail Doanh nghiệp",
    problemStatement: "Doanh nghiệp lo lắng về việc mất dữ liệu, thiếu hóa đơn VAT hợp lệ và không có hỗ trợ tiếng Việt khi mua trực tiếp từ Google.",
    targetUser: "Giám đốc CNTT, Trưởng phòng Vận hành, SMBs",
    createdAt: "2026-08-10",
    metaSync: {
      status: "live",
      adAccountId: "act_alpha_892106",
      lastSynced: "5 phút trước",
      activeCampaignsCount: 2,
      startDate: "05/09/2026",
      conversions: { leads: 210, sqls: 19, cpl: "$5.20", spend: "$1,092", cvr: "9.0%" },
      runningCampaigns: [
        { name: "[B2B] Chuyển đổi Google Workspace có hóa đơn VAT", status: "Active", spend: "$650", leads: 125 },
        { name: "[RESELLER] Nâng cấp dung lượng Drive 2TB cho Agency", status: "Active", spend: "$442", leads: 85 }
      ]
    },
    aiDiagnosis: {
      badge: "High Intent",
      problem: "Khách hàng quan tâm nhất yếu tố hỗ trợ kỹ thuật 24/7 và hóa đơn VAT điện tử.",
      solution: "Tập trung thông điệp Hỗ trợ kỹ thuật 24/7 của TechCorp và chính sách di chuyển dữ liệu 0đ.",
      actionCtaText: "Đẩy Angle Hỗ Trợ 24/7",
      urgency: "success"
    }
  },
  {
    id: "mbc-ms365-copilot",
    brand: "Alpha",
    brandName: "Khối Alpha (SaaS & Cloud)",
    name: "Microsoft 365 Copilot",
    branch: "Enterprise AI & Workplace",
    topicGroup: "Ứng dụng Trí tuệ nhân tạo AI vào văn phòng hiện đại",
    problemStatement: "Doanh nghiệp muốn ứng dụng AI để tăng năng suất nhân sự nhưng không biết cách triển khai và tính toán ROI.",
    targetUser: "CEO, CFO, Head of Digital Transformation tại SMBs 20-200 nhân sự",
    createdAt: "2026-08-12",
    metaSync: {
      status: "live",
      adAccountId: "act_alpha_892107",
      lastSynced: "6 phút trước",
      activeCampaignsCount: 2,
      startDate: "08/09/2026",
      conversions: { leads: 145, sqls: 16, cpl: "$7.50", spend: "$1,087", cvr: "11.0%" },
      runningCampaigns: [
        { name: "[AI-BIZ] Khóa tập huấn ứng dụng Copilot cho Ban điều hành", status: "Active", spend: "$587", leads: 80 },
        { name: "[PILOT] Gói dùng thử Microsoft 365 Copilot 30 ngày", status: "Active", spend: "$500", leads: 65 }
      ]
    },
    aiDiagnosis: {
      badge: "Enterprise AI",
      problem: "Doanh nghiệp SMB có nhu cầu AI cao nhưng cần kịch bản ứng dụng cụ thể (Use Cases).",
      solution: "Tạo chiến dịch Case study: 10 tác vụ Word/Excel/Teams Copilot làm tự động trong 5 phút.",
      actionCtaText: "Tạo Camp Case Study AI",
      urgency: "success"
    }
  },
  {
    id: "mbc-business-email",
    brand: "Alpha",
    brandName: "Khối Alpha (SaaS & Cloud)",
    name: "Email doanh nghiệp",
    branch: "Secure Business Email",
    topicGroup: "Hộp thư theo tên miền riêng chống Spam & Blacklist",
    problemStatement: "Doanh nghiệp dùng email cá nhân mất uy tín, email gửi khách hay bị rơi vào hòm thư rác (Spam).",
    targetUser: "Chủ shop TMĐT, Giám đốc kinh doanh, Kế toán",
    createdAt: "2026-08-15",
    metaSync: {
      status: "live",
      adAccountId: "act_alpha_892108",
      lastSynced: "10 phút trước",
      activeCampaignsCount: 1,
      startDate: "12/09/2026",
      conversions: { leads: 130, sqls: 11, cpl: "$3.90", spend: "$507", cvr: "8.5%" },
      runningCampaigns: [
        { name: "[SMB] Email tên miền riêng uy tín 100% vào Inbox", status: "Active", spend: "$507", leads: 130 }
      ]
    },
    aiDiagnosis: {
      badge: "High Conversion",
      problem: "Tỷ lệ chuyển đổi vượt trội ở nhóm khách hàng vừa mua tên miền trong 7 ngày.",
      solution: "Kích hoạt tệp Retargeting tự động nhắm toàn bộ khách hàng đăng ký domain gần nhất.",
      actionCtaText: "Tạo Camp Retarget Domain",
      urgency: "success"
    }
  },
  {
    id: "mbc-cloud-hosting",
    brand: "Alpha",
    brandName: "Khối Alpha (SaaS & Cloud)",
    name: "Cloud Hosting",
    branch: "Cloud Infrastructure",
    topicGroup: "Hạ tầng đám mây co giãn theo lưu lượng",
    problemStatement: "Doanh nghiệp gặp nghẽn mạng khi có chiến dịch khuyến mại lớn, chi phí máy chủ vật lý quá đắt đỏ.",
    targetUser: "CTO, Quản trị hệ thống, Doanh nghiệp E-Commerce",
    createdAt: "2026-09-01",
    metaSync: {
      status: "disconnected",
      adAccountId: "act_alpha_892109",
      lastSynced: "Chưa liên kết",
      activeCampaignsCount: 0,
      startDate: "Chưa có",
      conversions: { leads: 0, sqls: 0, cpl: "$0", spend: "$0", cvr: "0%" },
      runningCampaigns: []
    },
    aiDiagnosis: {
      badge: "Thiếu Camp",
      problem: "Chưa có chiến dịch chạy riêng cho dòng Cloud Hosting chịu tải cao trong tháng này.",
      solution: "Tạo camp Top-of-Funnel mùa sale cuối năm nhắm tệp E-commerce & sàn bán hàng.",
      actionCtaText: "Tạo Camp E-Commerce Cloud",
      urgency: "danger"
    }
  },
  {
    id: "mbc-vmc",
    brand: "Alpha",
    brandName: "Khối Alpha (SaaS & Cloud)",
    name: "Chứng chỉ VMC",
    branch: "Email Brand Identity & BIMI",
    topicGroup: "Xác thực thương hiệu hiển thị Logo tích xanh trên Gmail",
    problemStatement: "Thương hiệu lớn bị giả mạo email lừa đảo (phishing), tỷ lệ mở email thông báo bị sụt giảm nghiêm trọng.",
    targetUser: "Ngân hàng, Fintech, Tập đoàn bán lẻ, CISO",
    createdAt: "2026-09-05",
    metaSync: {
      status: "disconnected",
      adAccountId: "act_alpha_892110",
      lastSynced: "Chưa liên kết",
      activeCampaignsCount: 0,
      startDate: "Chưa có",
      conversions: { leads: 0, sqls: 0, cpl: "$0", spend: "$0", cvr: "0%" },
      runningCampaigns: []
    },
    aiDiagnosis: {
      badge: "Bảo Mật Cao Cấp",
      problem: "Sản phẩm bảo mật giá trị cao, độ nhận diện về chuẩn BIMI còn mới tại Việt Nam.",
      solution: "Chạy chiến dịch Lead Magnet: Ebook hướng dẫn gắn logo tích xanh Gmail cho doanh nghiệp.",
      actionCtaText: "Chạy Lead Magnet BIMI",
      urgency: "danger"
    }
  },
  {
    id: "mbc-smime",
    brand: "Alpha",
    brandName: "Khối Alpha (SaaS & Cloud)",
    name: "Chứng chỉ S-MIME",
    branch: "Email Encryption & Digital Sign",
    topicGroup: "Mã hóa nội dung thư tín & chữ ký số email doanh nghiệp",
    problemStatement: "Nguy cơ rò rỉ dữ liệu mật khi trao đổi văn bản qua email, bị tin tặc chặn bắt thông tin thanh toán.",
    targetUser: "Phòng Pháp chế, Ban Tài chính, IT Security Manager",
    createdAt: "2026-09-08",
    metaSync: {
      status: "disconnected",
      adAccountId: "act_alpha_892111",
      lastSynced: "Chưa liên kết",
      activeCampaignsCount: 0,
      startDate: "Chưa có",
      conversions: { leads: 0, sqls: 0, cpl: "$0", spend: "$0", cvr: "0%" },
      runningCampaigns: []
    },
    aiDiagnosis: {
      badge: "Thiếu Camp",
      problem: "Chưa có độ phủ chiến dịch tiếp cận các đơn vị có yêu cầu tuân thủ an toàn thông tin (ISO 27001).",
      solution: "Tạo chiến dịch Account-Based Marketing (ABM) nhắm thẳng tệp CISO & Giám đốc IT.",
      actionCtaText: "Kích Hoạt ABM CISO",
      urgency: "danger"
    }
  },

  // ==========================================
  // KHỐI 2: ⚡ Khối Beta (Enterprise Solutions) - 4 Sản phẩm
  // ==========================================
  {
    id: "mbi-einvoice",
    brand: "Beta",
    brandName: "Khối Beta (Enterprise Solutions)",
    name: "Hoá đơn điện tử",
    branch: "E-Invoice Nghị định 123",
    topicGroup: "Hệ thống phát hành & quản trị hóa đơn thuế hợp chuẩn",
    problemStatement: "Doanh nghiệp lo lắng về việc nghẽn truyền dữ liệu sang cơ quan Thuế, khó tích hợp vào phần mềm kế toán sẵn có.",
    targetUser: "Kế toán trưởng, Giám đốc tài chính, Chủ doanh nghiệp",
    createdAt: "2026-08-01",
    metaSync: {
      status: "live",
      adAccountId: "act_beta_391028",
      lastSynced: "2 phút trước",
      activeCampaignsCount: 3,
      startDate: "01/09/2026",
      conversions: { leads: 340, sqls: 32, cpl: "$3.60", spend: "$1,224", cvr: "9.4%" },
      runningCampaigns: [
        { name: "[PROMO] Tặng 500 số hóa đơn điện tử cho DN thành lập mới", status: "Active", spend: "$650", leads: 190 },
        { name: "[TAX] Hóa đơn điện tử khởi tạo từ máy tính tiền", status: "Active", spend: "$374", leads: 95 },
        { name: "[INTEG] Tích hợp tự động Misa, Fast, Bravo trong 3 phút", status: "Active", spend: "$200", leads: 55 }
      ]
    },
    aiDiagnosis: {
      badge: "Top Performer",
      problem: "Mùa quyết toán quý 3 đang nóng, CPL ở mức tối ưu nhất danh mục ($3.60/Lead).",
      solution: "Scale tăng thêm 25% ngân sách cho ưu đãi tặng 500 số hóa đơn cho doanh nghiệp mới.",
      actionCtaText: "Scale Offer 500 Số HĐ",
      urgency: "success"
    }
  },
  {
    id: "mbi-econtract",
    brand: "Beta",
    brandName: "Khối Beta (Enterprise Solutions)",
    name: "Hợp đồng điện tử",
    branch: "E-Contract & Digital Signature",
    topicGroup: "Giải pháp ký kết hợp đồng số không giấy tờ",
    problemStatement: "Ký kết văn bản giấy mất 5-7 ngày luân chuyển chuyển phát nhanh, tốn chi phí in ấn và dễ thất lạc chứng từ.",
    targetUser: "Trưởng phòng Mua hàng, Giám đốc kinh doanh, Pháp chế",
    createdAt: "2026-08-15",
    metaSync: {
      status: "live",
      adAccountId: "act_beta_391029",
      lastSynced: "7 phút trước",
      activeCampaignsCount: 2,
      startDate: "06/09/2026",
      conversions: { leads: 175, sqls: 18, cpl: "$4.80", spend: "$840", cvr: "10.3%" },
      runningCampaigns: [
        { name: "[LEGAL] Ký hợp đồng điện tử xác thực Bộ Công Thương", status: "Active", spend: "$520", leads: 110 },
        { name: "[MOBILE] Trải nghiệm ký số trên điện thoại trong 10 giây", status: "Active", spend: "$320", leads: 65 }
      ]
    },
    aiDiagnosis: {
      badge: "High Intent",
      problem: "Doanh nghiệp quan tâm cao nhất đến tính pháp lý và độ bảo mật của chữ ký số.",
      solution: "Tạo webinar demo ký kết từ xa trên mobile kết hợp xác thực CCCD gắn chip chuẩn CeCA.",
      actionCtaText: "Tạo Camp Webinar Ký Số",
      urgency: "success"
    }
  },
  {
    id: "mbi-input-invoice",
    brand: "Beta",
    brandName: "Khối Beta (Enterprise Solutions)",
    name: "Hoá đơn đầu vào",
    branch: "Automated Invoice Processing",
    topicGroup: "Tự động tra cứu, đối soát & phát hiện hóa đơn rủi ro",
    problemStatement: "Kế toán mất hàng giờ nhập liệu hóa đơn mua vào thủ công, nguy cơ dính hóa đơn từ doanh nghiệp bỏ trốn bị phạt thuế.",
    targetUser: "Kế toán thuế, Kế toán trưởng, Giám đốc tài chính",
    createdAt: "2026-08-20",
    metaSync: {
      status: "live",
      adAccountId: "act_beta_391030",
      lastSynced: "9 phút trước",
      activeCampaignsCount: 1,
      startDate: "11/09/2026",
      conversions: { leads: 110, sqls: 12, cpl: "$4.20", spend: "$462", cvr: "10.9%" },
      runningCampaigns: [
        { name: "[ALERT] Tự động kiểm tra hóa đơn rủi ro trước khi nộp báo cáo", status: "Active", spend: "$462", leads: 110 }
      ]
    },
    aiDiagnosis: {
      badge: "Tối Ưu Phễu",
      problem: "Nỗi đau kế toán sợ bị truy thu thuế do hóa đơn bất hợp pháp đang chạm đỉnh.",
      solution: "Khai thác trực diện Angle: 'Cảnh báo hóa đơn rủi ro tức thì trước khi kê khai thuế'.",
      actionCtaText: "Tạo Camp Cảnh Báo Thuế",
      urgency: "warning"
    }
  },
  {
    id: "mbi-digital-signature",
    brand: "Beta",
    brandName: "Khối Beta (Enterprise Solutions)",
    name: "Chữ ký số",
    branch: "Token HSM & Cloud CA",
    topicGroup: "Chứng thư số cá nhân & doanh nghiệp ký thuế, hải quan, bảo hiểm",
    problemStatement: "USB Token dễ thất lạc, không tiện ký duyệt khi đi công tác xa; thủ tục cấp đổi gia hạn phức tạp.",
    targetUser: "Chủ doanh nghiệp, Kế toán, Người đại diện pháp luật",
    createdAt: "2026-09-01",
    metaSync: {
      status: "disconnected",
      adAccountId: "act_beta_391031",
      lastSynced: "Chưa liên kết",
      activeCampaignsCount: 0,
      startDate: "Chưa có",
      conversions: { leads: 0, sqls: 0, cpl: "$0", spend: "$0", cvr: "0%" },
      runningCampaigns: []
    },
    aiDiagnosis: {
      badge: "Thiếu Camp",
      problem: "Chưa có chiến dịch riêng trong tháng; khách hàng thường chỉ mua bị động khi hết hạn.",
      solution: "Chạy chiến dịch Cross-sell: Combo Ký số Cloud CA kèm phần mềm phần mềm hóa đơn điện tử.",
      actionCtaText: "Tạo Camp Combo CA + HĐ",
      urgency: "danger"
    }
  }
];

// Dữ liệu cho Dashboard The Control Center (Cập nhật theo thực tế 12 sản phẩm Alpha & Beta)
export const DASHBOARD_DATA = {
  coverage: {
    totalProducts: 12,
    coveredProducts: 8,
    missingProducts: 4,
    needsRefresh: 2,
    activeCampaignsTotal: 15,
    coveragePercent: 67
  },

  // Widget 2: Performance Alerts (Gắn liền với sản phẩm Alpha & Beta)
  performanceAlerts: [
    {
      id: "alt-01",
      severity: "critical",
      productName: "Microsoft 365 Copilot",
      metricChange: "CPL +15%, SQL -31%",
      aiSuggestion: "Tệp đối tượng Broad IT đang bão hòa. Hệ thống đã phác thảo 3 phương án A/B Test Case Study để thay thế.",
      actionText: "Xem 3 Phương án A/B",
      time: "25m",
      abTestOptions: [
        { name: "Concept A: Case Study", angle: "10 tác vụ Excel/Word tự động hóa trong 5 phút", format: "Carousel 4 slides" },
        { name: "Concept B: Góc nhìn ROI", angle: "Tiết kiệm 40 giờ làm việc mỗi tháng cho phòng Kế toán & HR", format: "Single Image + Badge" },
        { name: "Concept C: Video Demo 30s", angle: "Tóm tắt email và họp Teams tự động bằng tiếng Việt", format: "Short Video 9:16" }
      ]
    },
    {
      id: "alt-02",
      severity: "warning",
      productName: "Cloud Server Pro",
      metricChange: "CTR Search -22%",
      aiSuggestion: "Hệ thống đề xuất A/B test tiêu đề mới: 'Uptime 99.99% & Miễn phí chuyển website NVMe trong 1 giờ'.",
      actionText: "Duyệt Copy Mới",
      time: "2h"
    },
    {
      id: "alt-03",
      severity: "success",
      productName: "E-Invoicing Platform (Beta)",
      metricChange: "ROAS 5.4x (Đạt đỉnh)",
      aiSuggestion: "Ưu đãi tặng 500 số hóa đơn đang chuyển đổi vượt KPI ($3.60/Lead). Đề xuất tăng 25% ngân sách.",
      actionText: "Scale +25% Budget",
      time: "09:15"
    }
  ],

  // Master Campaign Plans chờ Quản Lý (Alex) duyệt
  masterPlans: [
    {
      id: "plan-vibe-host-q4",
      productId: "mbc-vibe-host",
      productName: "Cloud Server Pro",
      brand: "Alpha",
      title: "[Master Plan] Kế hoạch Cloud Server Pro: Chống nghẽn cổ chai mùa cao điểm",
      creator: "Sarah",
      creatorRole: "Growth Lead",
      reviewer: "Alex",
      reviewerRole: "Head of Marketing",
      approver: "Alex",
      approverRole: "Head of Marketing",
      timeline: "01/10/2026 - 31/10/2026",
      timelineDays: 31,
      targetKpi: "50 SQLs",
      budget: "$1,200",
      keyMessage: "Tăng tốc Website NVMe - Chống nghẽn cổ chai mùa cao điểm",
      status: "pending_approval", // 'pending_approval' | 'approved' | 'rejected'
      statusLabel: "Chờ duyệt",
      createdAt: "Hôm nay 10:15",
      subCampaigns: [
        {
          id: "camp-01",
          name: "Camp 1 (Teasing/Phủ)",
          title: "Giới thiệu hạ tầng NVMe",
          share: "60% KPI",
          kpi: "30 SQLs",
          budget: "$720",
          description: "Phủ nhận thức tệp khách hàng tiềm năng mới, truyền thông điểm mạnh công nghệ NVMe và Uptime 99.99%."
        },
        {
          id: "camp-02",
          name: "Camp 2 (Retargeting/Chốt deal)",
          title: "Promo tặng thêm tháng sử dụng",
          share: "40% KPI",
          kpi: "20 SQLs",
          budget: "$480",
          description: "Bám đuổi tệp ghé thăm web chưa đăng ký, thôi thúc chốt hợp đồng với ưu đãi."
        }
      ],
      dependentTaskIds: ["tsk-gen-vibe-1", "tsk-gen-vibe-2"]
    }
  ],

  // Widget 3: Task & Quality Control & Kanban Workflow Board
  teamTasks: [
    {
      id: "tsk-gen-vibe-1",
      title: "[Camp 1] Viết Ad Copy & Bài Social: Giới thiệu hạ tầng NVMe",
      campaign: "Kế hoạch Cloud Server Pro",
      brand: "Alpha",
      team: "Content",
      type: "Content",
      assignee: "Member A",
      assigneeRole: "Social Media Lead",
      stage: "in_progress",
      status: "pending",
      statusLabel: "Chờ mở khóa",
      deadline: "10/10/2026",
      isOverdue: false,
      masterPlanId: "plan-vibe-host-q4",
      isLocked: true,
      lockMessage: "Chờ Alex duyệt Master Plan để mở khóa",
      severity: "normal",
      urgency: "normal",
      creativeBrief: {
        objective: "Triển khai Camp 1 (Teasing/Phủ): Giới thiệu hạ tầng NVMe",
        targetPersona: "Chủ doanh nghiệp, Quản trị viên IT",
        keyMessage: "Tăng tốc Website NVMe - Chống nghẽn cổ chai mùa cao điểm",
        deliverables: "3 bài Ad Copy Facebook Ads + 2 bài Social Post",
        toneOfVoice: "Ấn tượng, thôi thúc, kỹ thuật đáng tin cậy"
      }
    },
    {
      id: "tsk-gen-vibe-2",
      title: "[Camp 2] Thiết kế Bộ Banner KV Promo: Promo tặng thêm tháng sử dụng",
      campaign: "Kế hoạch Cloud Server Pro",
      brand: "Alpha",
      team: "Design",
      type: "Design",
      assignee: "Member C",
      assigneeRole: "Design & Creative",
      stage: "not_started",
      status: "pending",
      statusLabel: "Chờ mở khóa",
      deadline: "15/10/2026",
      isOverdue: false,
      masterPlanId: "plan-vibe-host-q4",
      isLocked: true,
      lockMessage: "Chờ Alex duyệt Master Plan để mở khóa",
      severity: "normal",
      urgency: "normal",
      creativeBrief: {
        objective: "Triển khai Camp 2 (Retargeting/Chốt deal): Promo tặng thêm tháng sử dụng",
        targetPersona: "Khách hàng ghé thăm web chưa đăng ký",
        keyMessage: "Tăng tốc Website NVMe - Chống nghẽn cổ chai mùa cao điểm",
        deliverables: "Bộ banner đa kích thước (1200x628, 1080x1080, 1080x1920)",
        toneOfVoice: "Thúc đẩy hành động, ưu đãi rõ ràng, nổi bật"
      }
    },
    {
      id: "tsk-01",
      title: "Banner Carousel 5 slides: Ưu đãi Tên Miền .VN tặng Email",
      campaign: "Tên Miền TechCorp",
      brand: "Alpha",
      team: "Design",
      type: "Design",
      assignee: "Member C",
      assigneeRole: "Design & Creative",
      stage: "in_review",
      status: "overdue",
      statusLabel: "Trễ 2 ngày",
      deadline: "20/09/2026",
      isOverdue: true,
      overdueDays: 2,
      severity: "critical",
      urgency: "danger",
      creativeBrief: {
        objective: "Quảng cáo Facebook Ads Carousel 5 slides cho chương trình Đăng ký .VN tặng Email Doanh nghiệp",
        targetPersona: "Chủ doanh nghiệp thành lập mới, Startup, cá nhân làm thương hiệu",
        keyMessage: "Khởi tạo thương hiệu chuyên nghiệp: Tên miền .VN + Email Doanh nghiệp riêng bảo mật 100%",
        deliverables: "5 slides vuông 1080x1080 (Carousel Ads) chuẩn Material 3 + Logo TechCorp",
        toneOfVoice: "Hiện đại, tươi sáng, khuyến mại hấp dẫn, uy tín",
        brandSpecs: "Brand Primary: #2563EB (Alpha Blue), Font: Inter / Be Vietnam Pro, Text ratio < 20%"
      },
      assetPreview: {
        type: "design",
        assetName: "Carousel_DotVN_Email_Slide1-5.png",
        dimensions: "1080x1080 (Square)",
        format: "PNG / 5 Slides",
        mockupTitle: "ĐĂNG KÝ TÊN MIỀN .VN — TẶNG NGAY EMAIL DOANH NGHIỆP",
        mockupSubtitle: "Tạo dựng uy tín thương hiệu ngay từ ngày đầu với tên miền quốc gia và hộp thư số riêng.",
        mockupCta: "Đăng Ký Ngay",
        mockupOffer: "Combo Tiết Kiệm 40%",
        previewBg: "from-blue-600 to-indigo-800",
        uploadedAt: "19/09/2026 16:30",
        version: "v1.2"
      },
      qaReport: {
        tested: false,
        textDensityScore: 24,
        brandScore: 100,
        ctaScore: 100,
        analysisText: "Text trên banner (24%) hơi nhiều so với chuẩn khuyến nghị 20% của Meta Ads, có thể giảm bớt câu phụ. Màu sắc nhận diện #2563EB và nút CTA 'Đăng Ký Ngay' chuẩn Brand Guidelines."
      },
      feedbackChat: [
        { id: "c1", sender: "Marketer", name: "Sarah", time: "20/09 09:30", text: "Member C ơi, banner slide 2 và 3 chữ còn hơi dày, check thử quy tắc 20% text của Meta xem có bị cảnh báo giảm reach không nhé." },
        { id: "c2", sender: "Assignee", name: "Member C", time: "20/09 11:15", text: "Dạ em đã tinh giản bớt 2 dòng mô tả và tăng size nút CTA lên rồi ạ! Sarah vào duyệt lại giúp em nhé." }
      ]
    },
    {
      id: "tsk-02",
      title: "Banner Leaderboard 1200x628: Tặng 500 số Hóa đơn điện tử [A/B Test]",
      campaign: "E-Invoicing Platform",
      brand: "Beta",
      team: "Design",
      type: "Design",
      assignee: "Member B",
      assigneeRole: "Performance Marketing",
      stage: "in_review",
      status: "overdue",
      statusLabel: "Trễ 1 ngày",
      deadline: "21/09/2026",
      isOverdue: true,
      overdueDays: 1,
      isAbTest: true,
      abTestVariants: {
        variantA: "Variant A: Tặng 500 số Hóa đơn điện tử (CPL $3.20 - CVR 7.8%)",
        variantB: "Variant B: Miễn phí phần mềm kế toán 1 năm (CPL $4.20 - CVR 5.1%)",
        defaultRationale: "Variant A mang lại CPL thấp hơn 24% và CVR vượt 53% nhờ thông điệp rõ ràng về số lượng cụ thể (500 số) đánh trúng tâm lý kế toán mùa quyết toán."
      },
      severity: "critical",
      urgency: "danger",
      creativeBrief: {
        objective: "Banner hiển thị Lead Form chiến dịch tặng 500 số hóa đơn điện tử mùa quyết toán quý 3",
        targetPersona: "Kế toán trưởng, Giám đốc tài chính, Doanh nghiệp mới thành lập",
        keyMessage: "Tặng 500 số phần mềm hóa đơn điện tử chuẩn Nghị định 123 + Kết nối tự động phần mềm kế toán",
        deliverables: "Banner ngang 1200x628 (Lead Gen / Single Image) + Logo Khối Beta",
        toneOfVoice: "Chuyên nghiệp, tin cậy, rõ nét pháp lý",
        brandSpecs: "Brand Primary: #059669 (Beta Emerald), Phông chữ rõ ràng, số 500 làm điểm nhấn thị giác"
      },
      assetPreview: {
        type: "design",
        assetName: "Beta_Promo500_Leaderboard_1200x628.jpg",
        dimensions: "1200x628 (Landscape)",
        format: "JPG / Web Optimized",
        mockupTitle: "TẶNG 500 SỐ HÓA ĐƠN ĐIỆN TỬ CHO DOANH NGHIỆP MỚI",
        mockupSubtitle: "Hợp chuẩn Nghị định 123/2020/NĐ-CP • Kích hoạt tức thì trong 5 phút.",
        mockupCta: "Nhận Ưu Đãi",
        mockupOffer: "Miễn Phí 100%",
        previewBg: "from-emerald-600 to-teal-800",
        uploadedAt: "21/09/2026 14:00",
        version: "v1.0"
      },
      qaReport: {
        tested: false,
        textDensityScore: 16,
        brandScore: 98,
        ctaScore: 95,
        analysisText: "Banner đạt chuẩn xuất sắc: Mật độ chữ 16% (< 20%), màu xanh Emerald #059669 chuẩn bộ nhận diện Khối Beta. Điểm nhấn '500 Số HĐ' cực kỳ thu hút thị giác."
      },
      feedbackChat: [
        { id: "c1", sender: "Assignee", name: "Member B", time: "21/09 14:05", text: "Banner Leaderboard cho chiến dịch Khối Beta em đã lên xong, nhờ Lead review sớm để set camp chạy phễu lead tối nay ạ." }
      ]
    },
    {
      id: "tsk-03",
      title: "Ad Copy Facebook: Cảnh báo rủi ro hóa đơn từ DN bỏ trốn",
      campaign: "Smart AP Automation",
      brand: "Beta",
      team: "Content",
      type: "Content",
      assignee: "Member A",
      assigneeRole: "Social Media Lead",
      stage: "in_review",
      status: "pending_qa",
      statusLabel: "Chờ duyệt",
      deadline: "22/09/2026",
      isOverdue: false,
      severity: "warning",
      urgency: "warning",
      creativeBrief: {
        objective: "Bản sao quảng cáo Facebook đánh vào nỗi đau kế toán sợ bị truy thu thuế",
        targetPersona: "Kế toán thuế, Kế toán trưởng, Giám đốc điều hành",
        keyMessage: "Tự động tra cứu và phát hiện hóa đơn rủi ro từ doanh nghiệp bỏ trốn trong 1 click",
        deliverables: "Ad Copy Facebook: Hook 3 dòng + Body text 4 bullet points + CTA + 3 Hashtags",
        toneOfVoice: "Cảnh báo khẩn, chính xác pháp lý, đồng cảm với áp lực quyết toán"
      },
      assetPreview: {
        type: "copy",
        headline: "⚠️ Doanh nghiệp bạn có đang cầm phải hóa đơn từ doanh nghiệp bỏ trốn?",
        primaryText: "Chỉ một hóa đơn mua vào sai phạm có thể khiến doanh nghiệp bị truy thu thuế và xử phạt hàng trăm triệu đồng!\n\n🔍 Giải pháp Smart AP Automation:\n✅ Tự động đồng bộ từ cổng Tổng cục Thuế\n✅ Cảnh báo tức thì nhà cung cấp ngừng hoạt động hoặc rủi ro cao\n✅ Đối soát bảng kê chi tiết chỉ trong 30 giây\n\n👉 Dùng thử miễn phí kiểm tra 100 hóa đơn đầu tiên ngay hôm nay!",
        ctaButton: "Dùng Thử Miễn Phí",
        wordCount: 78
      },
      qaReport: {
        tested: false,
        textDensityScore: 100,
        brandScore: 95,
        ctaScore: 92,
        analysisText: "Hook mở đầu mạnh mẽ, đánh trúng tâm lý lo ngại truy thu thuế của Kế toán. CTA rõ ràng, có offer dùng thử 100 hóa đơn phù hợp chuyển đổi Top-of-Funnel."
      },
      feedbackChat: [
        { id: "c1", sender: "Assignee", name: "Member A", time: "22/09 08:30", text: "Em đã hoàn thiện Ad Copy theo angle cảnh báo rủi ro thuế doanh nghiệp, Sarah xem qua giúp em nhé!" }
      ]
    },
    {
      id: "tsk-04",
      title: "Short Video 15s: Demo so sánh tốc độ tải trang Vibe Host < 0.8s",
      campaign: "Cloud Server NVMe",
      brand: "Alpha",
      team: "Video",
      type: "Video",
      assignee: "Member A",
      assigneeRole: "Social Media Lead",
      stage: "revision",
      status: "overdue",
      statusLabel: "Yêu cầu sửa",
      deadline: "21/09/2026",
      isOverdue: true,
      overdueDays: 1,
      severity: "critical",
      urgency: "danger",
      creativeBrief: {
        objective: "Video ngắn TikTok / Reels so sánh tốc độ tải trang Vibe Host với hosting thông thường",
        targetPersona: "Web Developer, Agency lập trình website, E-commerce Admin",
        keyMessage: "Tải trang < 0.8s, chịu tải 10,000 traffic không sập nguồn nhờ ổ cứng NVMe Enterprise",
        deliverables: "Video dọc 9:16 (15 giây) kèm màn hình đo lường Google PageSpeed",
        toneOfVoice: "Trực quan, phong cách tech dev, dứt khoát"
      },
      assetPreview: {
        type: "video",
        assetName: "VibeHost_SpeedTest_9x16_Cut2.mp4",
        duration: "0:15",
        resolution: "1080x1920 (9:16)",
        hook: "Website bạn load mất mấy giây? Xem thử cú chạm này!",
        storyboard: [
          { sec: "0-3s", scene: "Hook: Màn hình so sánh 2 điện thoại cùng mở web" },
          { sec: "4-10s", scene: "Vibe Host load 0.78s - Bên kia vẫn xoay tròn" },
          { sec: "11-15s", scene: "Logo TechCorp Vibe Host + CTA Nhận ưu đãi 30%" }
        ]
      },
      qaReport: {
        tested: false,
        textDensityScore: 90,
        brandScore: 75,
        ctaScore: 90,
        analysisText: "Video có hook cuốn hút. Tuy nhiên logo nhận diện TechCorp xuất hiện ở giây thứ 11 là quá muộn với video ngắn 15s (người xem lướt qua sau 3-5s). Cần đưa watermark logo TechCorp lên góc trên ngay từ giây đầu."
      },
      feedbackChat: [
        { id: "c1", sender: "Marketer", name: "Sarah", time: "21/09 17:00", text: "Member A ơi, video làm rất hay nhưng logo TechCorp xuất hiện ở giây thứ 11 là muộn quá, khách lướt qua mất. Bạn dời logo lên góc trên bên trái cố định từ giây 0:01 và thêm âm thanh ting nhẹ khi đạt 0.78s nhé!" },
        { id: "c2", sender: "Assignee", name: "Member A", time: "21/09 17:40", text: "Dạ em nhận feedback rồi ạ, đang render lại bản cut mới sẽ gửi lại trong tối nay!" }
      ]
    },
    {
      id: "tsk-05",
      title: "Video 9:16: Trải nghiệm ký hợp đồng trên Mobile trong 10s",
      campaign: "E-Contract Suite",
      brand: "Beta",
      team: "Video",
      type: "Video",
      assignee: "Member C",
      assigneeRole: "Design & Creative",
      stage: "not_started",
      status: "pending",
      statusLabel: "Chưa bắt đầu",
      deadline: "25/09/2026",
      isOverdue: false,
      severity: "normal",
      urgency: "normal",
      creativeBrief: {
        objective: "Quảng cáo Video ngắn trải nghiệm ký hợp đồng từ xa trên điện thoại",
        targetPersona: "Trưởng phòng Mua hàng, Giám đốc kinh doanh, Pháp chế",
        keyMessage: "Ký kết mọi lúc mọi nơi trên điện thoại, xác thực CCCD gắn chip CeCA",
        deliverables: "Video 9:16 (30 giây) quay màn hình thao tác app mobile",
        toneOfVoice: "Nhanh chóng, tiện lợi, hiện đại"
      },
      assetPreview: {
        type: "video",
        assetName: "Chưa tải lên",
        duration: "0:30 (Dự kiến)",
        resolution: "1080x1920 (9:16)",
        hook: "Đang đi cafe vẫn chốt hợp đồng tiền tỷ trong 10 giây",
        storyboard: []
      },
      qaReport: { tested: false },
      feedbackChat: []
    },
    {
      id: "tsk-06",
      title: "Infographic: Tiêu chuẩn bảo mật ISO 27001 cho S-MIME",
      campaign: "Chứng chỉ S-MIME",
      brand: "Alpha",
      team: "Design",
      type: "Design",
      assignee: "Member C",
      assigneeRole: "Design & Creative",
      stage: "not_started",
      status: "pending",
      statusLabel: "Chưa bắt đầu",
      deadline: "26/09/2026",
      isOverdue: false,
      severity: "normal",
      urgency: "normal",
      creativeBrief: {
        objective: "Tài liệu trực quan kỹ thuật hỗ trợ chiến dịch ABM cho tệp CISO",
        targetPersona: "Giám đốc an toàn thông tin (CISO), IT Security Manager",
        keyMessage: "Mã hóa đầu cuối bảo vệ toàn bộ email tài chính, đạt chuẩn ISO 27001",
        deliverables: "Infographic dọc độ phân giải cao phục vụ LinkedIn Ads",
        toneOfVoice: "Bảo mật cao cấp, kỹ thuật chuẩn xác"
      },
      assetPreview: {
        type: "design",
        assetName: "Chưa tải lên",
        dimensions: "1200x2400 (Infographic dọc)",
        format: "Figma / PNG",
        mockupTitle: "TIÊU CHUẨN MÃ HÓA EMAIL DOANH NGHIỆP S-MIME",
        mockupSubtitle: "Bảo mật toàn diện luồng thông tin tài chính trước các cuộc tấn công MITM.",
        mockupCta: "Tải Ebook Chi Tiết",
        mockupOffer: "ISO 27001 Compliant",
        previewBg: "from-slate-800 to-indigo-950",
        uploadedAt: "Chưa có",
        version: "Draft"
      },
      qaReport: { tested: false },
      feedbackChat: []
    },
    {
      id: "tsk-07",
      title: "Ebook Lead Magnet: 10 Tác vụ Copilot AI tự làm cho DN",
      campaign: "Microsoft 365 Copilot",
      brand: "Alpha",
      team: "Content",
      type: "Content",
      assignee: "Member D",
      assigneeRole: "SEO & Content",
      stage: "in_progress",
      status: "in_progress",
      statusLabel: "Đang làm",
      deadline: "24/09/2026",
      isOverdue: false,
      severity: "normal",
      urgency: "normal",
      creativeBrief: {
        objective: "Tài liệu Lead Magnet tạo SQL cho chiến dịch Microsoft 365 Copilot",
        targetPersona: "C-Level, Giám đốc chuyển đổi số, Trưởng phòng Kế toán & HR",
        keyMessage: "Tiết kiệm 45 giờ làm việc mỗi tháng cho nhân viên văn phòng",
        deliverables: "Ebook PDF 6 trang kèm Infographic phân tích ROI",
        toneOfVoice: "Chuyên gia, giàu số liệu thực chứng"
      },
      assetPreview: {
        type: "copy",
        headline: "Ebook: 10 Tác vụ Microsoft 365 Copilot tự động hóa trong 5 phút",
        primaryText: "Đang soạn thảo Section 3: Tự động tổng hợp báo cáo tài chính Excel và tóm tắt biên bản họp Teams bằng tiếng Việt...",
        ctaButton: "Tải Ebook Ngay",
        wordCount: 1420
      },
      qaReport: { tested: false },
      feedbackChat: [
        { id: "c1", sender: "Assignee", name: "Member D", time: "21/09 10:00", text: "Em đã hoàn thành 4/6 trang, đang bổ sung case study thực tế của đối tác." }
      ]
    },
    {
      id: "tsk-08",
      title: "Bộ Banner Display: Quảng bá Cloud Hosting chịu tải cao",
      campaign: "Managed Cloud Hosting",
      brand: "Alpha",
      team: "Design",
      type: "Design",
      assignee: "Member B",
      assigneeRole: "Performance Marketing",
      stage: "in_progress",
      status: "in_progress",
      statusLabel: "Đang làm",
      deadline: "23/09/2026",
      isOverdue: false,
      severity: "normal",
      urgency: "normal",
      creativeBrief: {
        objective: "Banner quảng cáo Google Display Network mùa sale cuối năm cho E-Commerce",
        targetPersona: "CTO, Quản trị hệ thống, Doanh nghiệp sàn thương mại điện tử",
        keyMessage: "Hạ tầng đám mây co giãn tức thì, chịu 50,000 truy cập đồng thời dịp Mega Sale",
        deliverables: "Bộ 5 kích thước Google Display chuẩn (300x250, 728x90, 160x600, 300x600, 320x100)",
        toneOfVoice: "Mạnh mẽ, tin cậy, cảm giác tốc độ"
      },
      assetPreview: {
        type: "design",
        assetName: "CloudHosting_GDN_Set5.fig",
        dimensions: "5 Kích thước GDN",
        format: "Figma Master File",
        mockupTitle: "CLOUD HOSTING CO GIÃN TỰ ĐỘNG CHO MÙA SALE CUỐI NĂM",
        mockupSubtitle: "Không lo sập web khi lượng đơn hàng tăng đột biến gấp 10 lần.",
        mockupCta: "Trải Nghiệm Miễn Phí",
        mockupOffer: "Uptime 99.99%",
        previewBg: "from-blue-700 to-cyan-900",
        uploadedAt: "22/09/2026 09:10",
        version: "v0.8"
      },
      qaReport: { tested: false },
      feedbackChat: []
    },
    {
      id: "tsk-09",
      title: "Chuỗi 3 Email Drip: Chăm sóc khách hàng vừa mua tên miền",
      campaign: "Email Doanh Nghiệp Cross-sell",
      brand: "Alpha",
      team: "Content",
      type: "Content",
      assignee: "Member D",
      assigneeRole: "SEO & Content",
      stage: "done",
      status: "ready",
      statusLabel: "Hoàn thành",
      deadline: "19/09/2026",
      isOverdue: false,
      severity: "success",
      urgency: "success",
      creativeBrief: {
        objective: "Bán chéo Email Doanh Nghiệp cho khách vừa đăng ký domain TechCorp",
        targetPersona: "Khách hàng cá nhân/doanh nghiệp vừa kích hoạt tên miền trong 7 ngày",
        keyMessage: "Đã có tên miền đẹp, nâng tầm uy tín ngay bằng hộp thư theo tên miền",
        deliverables: "Chuỗi 3 email automation (Sau 1 giờ, Sau 3 ngày, Sau 7 ngày)",
        toneOfVoice: "Tận tâm, gợi mở giải pháp"
      },
      assetPreview: {
        type: "copy",
        headline: "Chuỗi 3 Email Drip Campaign đã kết nối Automation Hub",
        primaryText: "Email 1: Chúc mừng sở hữu tên miền + Hướng dẫn cài đặt\nEmail 2: Tại sao 88% khách hàng không tin tưởng email @gmail.com khi giao dịch\nEmail 3: Ưu đãi độc quyền kích hoạt hộp thư doanh nghiệp 1 năm tặng 6 tháng",
        ctaButton: "Kích Hoạt Ngay",
        wordCount: 890
      },
      qaReport: {
        tested: true,
        textDensityScore: 100,
        brandScore: 100,
        ctaScore: 100,
        analysisText: "Chuỗi email hoàn thiện xuất sắc, tỷ lệ mở test nội bộ đạt 48%."
      },
      feedbackChat: [
        { id: "c1", sender: "Marketer", name: "Sarah", time: "19/09 15:00", text: "Chuỗi email rất tốt Member D ơi, chị đã bấm duyệt và tích hợp lên hệ thống CRM rồi ạ!" }
      ]
    },
    {
      id: "tsk-10",
      title: "Bộ Icon & Typography nhận diện cho Chứng chỉ VMC",
      campaign: "Chứng chỉ VMC",
      brand: "Alpha",
      team: "Design",
      type: "Design",
      assignee: "Member C",
      assigneeRole: "Design & Creative",
      stage: "done",
      status: "ready",
      statusLabel: "Hoàn thành",
      deadline: "18/09/2026",
      isOverdue: false,
      severity: "success",
      urgency: "success",
      creativeBrief: {
        objective: "Bộ tài nguyên đồ họa giải thích chuẩn logo tích xanh BIMI trên Gmail",
        targetPersona: "Ngân hàng, Fintech, Tập đoàn bán lẻ, CISO",
        keyMessage: "Xác thực danh tính thương hiệu, chống giả mạo email 100%",
        deliverables: "Icon SVG vector + Infographic giải thích cơ chế VMC",
        toneOfVoice: "Bảo mật cao cấp, trang trọng"
      },
      assetPreview: {
        type: "design",
        assetName: "VMC_Vector_Assets_Bundle.zip",
        dimensions: "Vector SVG",
        format: "SVG / Vector Kit",
        mockupTitle: "BẢO CHỨNG THƯƠNG HIỆU VỚI LOGO TÍCH XANH GMAIL",
        mockupSubtitle: "Chứng chỉ VMC hợp chuẩn quốc tế chống giả mạo email.",
        mockupCta: "Tìm Hiểu Chi Tiết",
        mockupOffer: "BIMI Certified",
        previewBg: "from-indigo-900 to-purple-950",
        uploadedAt: "18/09/2026 11:30",
        version: "Final"
      },
      qaReport: {
        tested: true,
        textDensityScore: 100,
        brandScore: 100,
        ctaScore: 100,
        analysisText: "Tài nguyên vector đạt chuẩn thiết kế cao cấp."
      },
      feedbackChat: [
        { id: "c1", sender: "Marketer", name: "Sarah", time: "18/09 16:30", text: "Bộ icon rất đẹp và sắc nét, chị đã duyệt đưa vào thư viện tài nguyên chung!" }
      ]
    }
  ],

  // Widget 4: Gemini Learning Library (Kế thừa cho toàn hệ thống TechCorp)
  experiments: {
    activeTest: {
      title: "A/B Test Tên Miền: Combo .VN vs Giảm giá đơn lẻ",
      product: "Domain Registry (Alpha)",
      duration: "Ngày 9/14",
      variantA: { angle: "Giảm 30% phí đăng ký .VN", cvr: "4.1%" },
      variantB: { angle: "Tặng kèm Email Doanh Nghiệp 1 năm", cvr: "6.8%" },
      leading: "Variant B (+2.7% CVR)",
      confidence: "97% Conf."
    },
    aiLearning: {
      period: "Tháng 08/2026",
      headline: "Khách hàng B2B chuyển đổi cao gấp 2.1x khi mua theo Combo Giải pháp",
      points: [
        "Khách hàng đăng ký Tên Miền có nhu cầu mua kèm Email Doanh nghiệp trong 7 ngày đầu lên tới 42%.",
        "Doanh nghiệp đăng ký E-Invoicing Platform có tỷ lệ chuyển đổi sang Chữ ký số & Hợp đồng điện tử đạt 35%.",
        "Khuyến nghị Tối ưu: Triển khai các gói Combo chéo giữa Khối Alpha và Khối Beta trong chu kỳ Tháng 9."
      ]
    }
  }
};

// ==========================================
// DANH SÁCH NHÂN SỰ ĐỘNG LINH HOẠT (MULTI-USER WORKSPACE TEAM ROSTER)
// ==========================================
export const CURRENT_USER = {
  id: 'mem-chau',
  name: 'Sarah',
  role: 'Growth Lead',
  department: 'Growth Marketing',
  avatar: "SA",
  avatarColor: 'bg-emerald-600',
  email: 'chau.le@demo.local'
};

export const INITIAL_TEAM_MEMBERS = [
  // 1. Quản Lý / Người Duyệt (Approver)
  { 
    id: 'mem-thinh', 
    name: 'Alex', 
    role: 'Head of Marketing', 
    department: 'Marketing Management', 
    isApprover: true, 
    avatar: "AL", 
    avatarColor: 'bg-indigo-700', 
    platform: 'Gửi Direct Message qua Teams', 
    contact: 'alex@growthloop.demo', 
    autoReminder: false 
  },

  // 2. Growth Lead / Người Lập Kế Hoạch (Owner)
  { 
    id: 'mem-chau', 
    name: 'Sarah', 
    role: 'Growth Lead', 
    department: 'Growth Marketing', 
    isApprover: false, 
    isOwner: true, 
    avatar: "SA", 
    avatarColor: 'bg-emerald-600', 
    platform: 'Gửi Direct Message qua Teams', 
    contact: 'chau.le@demo.local', 
    autoReminder: true 
  },

  // 3. Social Media Lead (Bài đăng, copy, mạng xã hội)
  { 
    id: 'mem-khoi', 
    name: 'Member A', 
    role: 'Social Media Lead', 
    department: 'Social & Content', 
    isApprover: false, 
    avatar: "MA", 
    avatarColor: 'bg-purple-600', 
    platform: 'Mention (@) vào Channel của Team', 
    contact: '@member.a', 
    autoReminder: true 
  },

  // 4. Performance Marketing (Setup quảng cáo / vận hành)
  { 
    id: 'mem-khanh', 
    name: 'Member B', 
    role: 'Performance Marketing', 
    department: 'Paid Media & Operations', 
    isApprover: false, 
    avatar: "MB", 
    avatarColor: 'bg-blue-600', 
    platform: 'Gửi Direct Message qua Teams', 
    contact: 'member.b@growthloop.demo', 
    autoReminder: true 
  },

  // 5. SEO & Content (Tối ưu nội dung web / tìm kiếm)
  { 
    id: 'mem-hien', 
    name: 'Member D', 
    role: 'SEO & Content', 
    department: 'Organic & Web SEO', 
    isApprover: false, 
    avatar: "MD", 
    avatarColor: 'bg-teal-600', 
    platform: 'Gửi Direct Message qua Teams', 
    contact: 'member.d@growthloop.demo', 
    autoReminder: true 
  },

  // 6. Intern (Hỗ trợ / chuẩn bị tài nguyên)
  { 
    id: 'mem-quy', 
    name: 'Member C', 
    role: "Design & Creative", 
    department: 'Marketing Operations', 
    isApprover: false, 
    avatar: "MC", 
    avatarColor: 'bg-amber-600', 
    platform: 'Mention (@) vào Channel của Team', 
    contact: '@member.c', 
    autoReminder: true 
  }
];

// ==========================================
// DỮ LIỆU BÁO CÁO TUẦN GEMINI AUTO-GENERATED (PRD 6.10)
// ==========================================
export const WEEKLY_REPORT_DATA = {
  currentWeekId: "w-38",
  weekTitle: "Báo Cáo Growth Marketing - Tuần 38",
  period: "15/09/2026 - 21/09/2026",
  generatedTime: "Chiều Thứ Sáu, 16:30",
  defaultRecipients: "Alex",
  availableWeeks: [
    {
      id: "w-37",
      weekNumber: 37,
      title: "Báo Cáo Growth Marketing - Tuần 37",
      period: "08/09/2026 - 14/09/2026",
      generatedTime: "Thứ Sáu 14/09, 17:00",
      status: "closed",
      statusLabel: "Đã chốt",
      isCurrent: false,
      items: [
        {
          id: "conv-mbi",
          brand: "Beta",
          brandName: "Khối Beta (Enterprise Solutions)",
          icon: "🧾",
          metricLabel: "Đơn hàng",
          unit: "Đơn",
          target: 22,
          targetDisplay: "22 Đơn",
          actual: 24,
          actualDisplay: "24",
          rate: 109.09,
          status: "Safe",
          statusLabel: "An Toàn",
          aiReason: "Chiến dịch tặng 500 số hóa đơn bùng nổ đơn hàng, chuyển đổi từ phễu dùng thử đạt 18%.",
          aiSuggestion: "Mở rộng tệp lookalike 2% từ tệp khách hàng thanh toán thành công."
        },
        {
          id: "conv-mbn",
          brand: "MBN",
          brandName: "Khối Alpha (SaaS & Cloud)",
          icon: "🏢",
          metricLabel: "Doanh số",
          unit: "VNĐ",
          target: 421198055,
          targetDisplay: "421M VNĐ",
          actual: 489000000,
          actualDisplay: "489M",
          rate: 116.10,
          status: "Safe",
          statusLabel: "An Toàn",
          aiReason: "Gói combo .VN và Email doanh nghiệp duy trì sức hút cao.",
          aiSuggestion: "Chuẩn bị creative mới cho tuần 38 tránh suy giảm tương tác."
        }
      ]
    },
    {
      id: "w-38",
      weekNumber: 38,
      title: "Báo Cáo Growth Marketing - Tuần 38",
      period: "15/09/2026 - 21/09/2026",
      generatedTime: "Chiều Thứ Sáu, 16:30",
      status: "active",
      statusLabel: "Hiện tại",
      isCurrent: true
    },
    {
      id: "w-39",
      weekNumber: 39,
      title: "Báo Cáo Growth Marketing - Tuần 39",
      period: "22/09/2026 - 28/09/2026",
      generatedTime: "Hôm nay, 11:30",
      status: "draft",
      statusLabel: "Mới nhất",
      isCurrent: false,
      items: [
        {
          id: "conv-mbi",
          brand: "Beta",
          brandName: "Khối Beta (Enterprise Solutions)",
          icon: "🧾",
          metricLabel: "Đơn hàng",
          unit: "Đơn",
          target: 22,
          targetDisplay: "22 Đơn",
          actual: 19,
          actualDisplay: "19",
          rate: 86.36,
          status: "Safe",
          statusLabel: "An Toàn",
          aiReason: "",
          aiSuggestion: ""
        },
        {
          id: "conv-mbn",
          brand: "MBN",
          brandName: "Khối Alpha (SaaS & Cloud)",
          icon: "🏢",
          metricLabel: "Doanh số",
          unit: "VNĐ",
          target: 421198055,
          targetDisplay: "421M VNĐ",
          actual: 512000000,
          actualDisplay: "512M",
          rate: 121.56,
          status: "Safe",
          statusLabel: "An Toàn",
          aiReason: "",
          aiSuggestion: ""
        }
      ]
    },
    {
      id: "w-40",
      weekNumber: 40,
      title: "Báo Cáo Growth Marketing - Tuần 40",
      period: "29/09/2026 - 05/10/2026",
      generatedTime: "Dự thảo tuần tới",
      status: "upcoming",
      statusLabel: "Sắp tới",
      isCurrent: false,
      items: [
        {
          id: "conv-mbi",
          brand: "Beta",
          brandName: "Khối Beta (Enterprise Solutions)",
          icon: "🧾",
          metricLabel: "Đơn hàng",
          unit: "Đơn",
          target: 25,
          targetDisplay: "25 Đơn",
          actual: 0,
          actualDisplay: "0",
          rate: 0,
          status: "Red-flag",
          statusLabel: "Chưa có số liệu",
          aiReason: "",
          aiSuggestion: ""
        },
        {
          id: "conv-mbn",
          brand: "MBN",
          brandName: "Khối Alpha (SaaS & Cloud)",
          icon: "🏢",
          metricLabel: "Doanh số",
          unit: "VNĐ",
          target: 450000000,
          targetDisplay: "450M VNĐ",
          actual: 0,
          actualDisplay: "0M",
          rate: 0,
          status: "Red-flag",
          statusLabel: "Chưa có số liệu",
          aiReason: "",
          aiSuggestion: ""
        }
      ]
    }
  ],
  executiveSummary: "Tuần qua, hiệu suất mảng Khối Beta (Khối Beta (Enterprise Solutions)) tăng trưởng mạnh với CPL giảm 15% và đạt đỉnh 32 SQLs. Tuy nhiên, mảng Tên Miền và Cloud Hosting đang thiếu hụt chiến dịch mới, đồng thời có 2 banner của Member C đang trễ hạn duyệt có nguy cơ ảnh hưởng phễu đầu vào tuần tới.",
  conversionTracking: {
    sectionTitle: "THEO DÕI TỐI ƯU CHUYỂN ĐỔI (Alpha & Beta)",
    items: [
      {
        id: "conv-mbi",
        brand: "Beta",
        brandName: "Khối Beta (Enterprise Solutions)",
        icon: "🧾",
        metricLabel: "Đơn hàng",
        unit: "Đơn",
        target: 22,
        targetDisplay: "22 Đơn",
        actual: 18,
        actualDisplay: "18",
        rate: 81.82,
        status: "Safe", // >= 80% Safe, < 80% Red-flag
        statusLabel: "An Toàn",
        aiReason: "Đang test chạy song song lượt truy cập và mua. TA có dấu hiệu tăng tần suất (2.93).",
        aiSuggestion: "Lên thêm asset Chữ ký số, Email Drip. Tạo banner mới tối ưu hơn & Đổi TA.",
        history: [
          { period: "Tháng 8 (1/8 - 10/8)", target: "22 Đơn", actual: "18 Đơn", rate: "81.82%", status: "Safe" },
          { period: "Tháng 8 (10/8 - 17/8)", target: "22 Đơn", actual: "26 Đơn", rate: "118.18%", status: "Safe" },
          { period: "Tháng 8 (17/8 - 24/8)", target: "22 Đơn", actual: "18 Đơn", rate: "81.82%", status: "Red-flag" },
          { period: "Tháng 8 (24/8 - 31/8)", target: "22 Đơn", actual: "17 Đơn", rate: "77.27%", status: "Red-flag" },
          { period: "Tháng 9 (1/9 - 7/9)", target: "22 Đơn", actual: "16 Đơn", rate: "72.73%", status: "Red-flag" },
          { period: "Tháng 9 (8/9 - 14/9)", target: "22 Đơn", actual: "24 Đơn", rate: "109.09%", status: "Safe" },
          { period: "Tháng 9 (15/9 - 21/9)", target: "22 Đơn", actual: "18 Đơn", rate: "81.82%", status: "Safe" }
        ]
      },
      {
        id: "conv-mbn",
        brand: "MBN",
        brandName: "Khối Alpha (SaaS & Cloud)",
        icon: "🏢",
        metricLabel: "Doanh số",
        unit: "VNĐ",
        target: 421198055,
        targetDisplay: "421M VNĐ",
        actual: 543654500,
        actualDisplay: "543M",
        rate: 129.07,
        status: "Safe", // >= 80% Safe, < 80% Red-flag
        statusLabel: "An Toàn",
        aiReason: "Doanh thu mảng Tên miền .VN combo Email doanh nghiệp tăng trưởng vượt kỳ vọng (+29%), tỷ lệ gia hạn hosting ổn định.",
        aiSuggestion: "Tiếp tục duy trì ngân sách camp hiện tại, mở rộng thêm tệp lookalike 1%.",
        history: [
          { period: "Tháng 8 (1/8 - 10/8)", target: "421.2M", actual: "543.6M", rate: "129.07%", status: "Safe" },
          { period: "Tháng 8 (10/8 - 17/8)", target: "421.2M", actual: "1,124.0M", rate: "266.88%", status: "Safe" },
          { period: "Tháng 8 (17/8 - 24/8)", target: "421.2M", actual: "454.9M", rate: "108.01%", status: "Safe" },
          { period: "Tháng 9 (15/9 - 21/9)", target: "421.2M", actual: "543.6M", rate: "129.07%", status: "Safe" }
        ]
      }
    ]
  },
  theGood: [
    {
      id: "good-1",
      productName: "E-Invoicing Platform (Beta)",
      campaignName: "Tặng 500 số hóa đơn cho DN mới",
      brand: "Beta",
      badge: "Vượt 20% Target",
      spend: "$1,224",
      leads: 340,
      sqls: 32,
      cpl: "$3.60",
      roas: "5.4x",
      aiExplanation: "Đạt 32 SQLs (Vượt 20% target). Mẫu quảng cáo Carousel ưu đãi 500 số đang có CPL thấp nhất toàn danh mục ($3.60/lead)."
    },
    {
      id: "good-2",
      productName: "Domain & Email Combo (Alpha)",
      campaignName: "Đăng ký .VN tặng Email Doanh nghiệp",
      brand: "Alpha",
      badge: "Top Conversion",
      spend: "$1,512",
      leads: 540,
      sqls: 38,
      cpl: "$2.80",
      roas: "4.8x",
      aiExplanation: "Khách hàng đăng ký tên miền có nhu cầu mua kèm Email Doanh nghiệp đạt tỷ lệ chuyển đổi gấp 2.1x so với mua lẻ."
    },
    {
      id: "good-3",
      productName: "E-Contract Suite (Beta)",
      campaignName: "Ký kết số trên Mobile xác thực CeCA",
      brand: "Beta",
      badge: "High Intent",
      spend: "$840",
      leads: 175,
      sqls: 18,
      cpl: "$4.80",
      roas: "4.2x",
      aiExplanation: "Tỷ lệ chuyển đổi từ Lead sang SQL đạt 10.3%, khách hàng phản hồi rất tích cực về tính năng ký trực tiếp trên smartphone."
    }
  ],
  theBadAndRisks: [
    {
      id: "risk-1",
      type: "Hiệu suất giảm",
      productName: "Microsoft 365 Copilot",
      severity: "danger",
      metric: "CPL +15%, SQL -31%",
      detail: "Tệp đối tượng Broad IT trên Facebook Ads đang có dấu hiệu bão hòa sau 3 tuần chạy liên tục."
    },
    {
      id: "risk-2",
      type: "Lỗ hổng chiến dịch (Campaign Gap)",
      productName: "Cloud Hosting & Chứng chỉ VMC",
      severity: "warning",
      metric: "0 chiến dịch active",
      detail: "Chưa kích hoạt chiến dịch tháng 9, ước tính đang bỏ lỡ khoảng 150+ SQLs từ tệp doanh nghiệp E-commerce chuẩn bị mùa sale cuối năm."
    },
    {
      id: "risk-3",
      type: "Tiến độ công việc (Task Risks)",
      productName: "Cross-Sell: Domain & E-Invoice",
      severity: "warning",
      metric: "2 banner trễ hạn",
      detail: "Hiện có 2 banner thiết kế của Member C đang trễ hạn duyệt ở cột In Review (trễ 1-2 ngày), có nguy cơ làm hoãn lịch on-air tuần tới."
    }
  ],
  actionPlan: [
    { id: "act-1", text: "Tạm dừng Adset Broad Microsoft 365 Copilot; kích hoạt 3 Concept A/B Test Case Study AI tự động hóa.", checked: false },
    { id: "act-2", text: "Họp nhanh với Member C lúc 9:00 Thứ Hai để chốt duyệt dứt điểm 2 banner đang trễ hạn ở cột In Review.", checked: false },
    { id: "act-3", text: "Khởi tạo chiến dịch Top-of-Funnel Cloud Hosting cho tệp doanh nghiệp E-commerce và sàn bán hàng.", checked: false },
    { id: "act-4", text: "Scale tăng thêm 25% ngân sách cho chiến dịch Tặng 500 số E-Invoicing Platform đang đạt ROAS 5.4x.", checked: false }
  ]
};


