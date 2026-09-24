import React, { useState, useEffect } from 'react';
import { 
  X, 
  Sparkles, 
  Bot, 
  Calendar, 
  MessageSquare, 
  Target, 
  Layers, 
  ArrowRight, 
  CheckCircle2, 
  Clock,
  Sparkle,
  Users,
  ShieldCheck
} from 'lucide-react';
import UserSelector from '../common/UserSelector';
import { INITIAL_TEAM_MEMBERS, CURRENT_USER } from '../../data/mockData';

export default function GeminiGuidedPlannerModal({ 
  isOpen, 
  onClose, 
  products = [], 
  teamMembers = INITIAL_TEAM_MEMBERS,
  currentUser = CURRENT_USER,
  onApproveCampaign 
}) {
  const defaultProduct = products.find(p => p.id === 'mbc-vibe-host') || products[0];
  const [selectedProduct, setSelectedProduct] = useState(defaultProduct || null);
  
  // Interactive Mini Form State
  const [startDate, setStartDate] = useState('2026-10-01');
  const [endDate, setEndDate] = useState('2026-10-31');
  const [keyMessage, setKeyMessage] = useState('Tăng tốc Website NVMe - Chống nghẽn cổ chai mùa cao điểm');
  const [targetKpi, setTargetKpi] = useState(50);
  const [isApproved, setIsApproved] = useState(false);

  // Dynamic Multi-user Workspace Assignment State
  const [selectedOwner, setSelectedOwner] = useState(currentUser || CURRENT_USER);
  const defaultApprover = teamMembers.find(m => m.id === 'mem-thinh') || teamMembers.find(m => m.isApprover) || { name: 'Lâm Quang Thịnh', role: 'Acting Marketing Manager' };
  const [selectedApprover, setSelectedApprover] = useState(defaultApprover);

  // Sync default product when products list loads
  useEffect(() => {
    if (products.length > 0 && !selectedProduct) {
      const p = products.find(item => item.id === 'mbc-vibe-host') || products[0];
      setSelectedProduct(p);
    }
  }, [products, selectedProduct]);

  if (!isOpen) return null;

  // Calculate duration in days
  const calculateDays = (start, end) => {
    if (!start || !end) return 31;
    const s = new Date(start);
    const e = new Date(end);
    const diffTime = e - s;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    return diffDays > 0 ? diffDays : 1;
  };

  const formatDateDisplay = (dateStr) => {
    if (!dateStr) return '';
    const parts = dateStr.split('-');
    if (parts.length === 3) {
      return `${parts[2]}/${parts[1]}/${parts[0]}`;
    }
    return dateStr;
  };

  const handleSelectProduct = (prod) => {
    setSelectedProduct(prod);
    if (prod.id === 'mbc-vibe-host') {
      setKeyMessage('Tăng tốc Website NVMe - Chống nghẽn cổ chai mùa cao điểm');
    } else if (prod.brand === 'MBI') {
      setKeyMessage(`Hóa đơn điện tử ${prod.name} - Tự động hóa chuẩn quy định Thuế, tiết kiệm 70% thời gian`);
    } else {
      setKeyMessage(`Hạ tầng ${prod.name} - Tối ưu hiệu năng, bảo mật và hỗ trợ kỹ thuật 24/7`);
    }
  };

  // Dynamic campaign outputs based on selected product and target KPI
  const camp1Title = selectedProduct?.id === 'mbc-vibe-host'
    ? 'Giới thiệu hạ tầng NVMe'
    : `Phủ tệp & Định vị thương hiệu: ${selectedProduct?.name || 'Sản phẩm'}`;

  const camp2Title = selectedProduct?.id === 'mbc-vibe-host'
    ? 'Promo tặng thêm tháng sử dụng'
    : `Retargeting & Promo ưu đãi: ${selectedProduct?.name || 'Sản phẩm'}`;

  const camp1Kpi = Math.round(targetKpi * 0.6);
  const camp2Kpi = Math.max(0, targetKpi - camp1Kpi);
  const totalDays = calculateDays(startDate, endDate);

  // Handler: Chốt Kế Hoạch & Sinh Task Thực Thi vào Kanban Board
  const handleConfirmAndGenerate = () => {
    setIsApproved(true);

    const planId = 'plan-' + Date.now().toString().slice(-4);
    const task1Id = 'tsk-gen-' + Date.now().toString().slice(-4) + '-1';
    const task2Id = 'tsk-gen-' + Date.now().toString().slice(-4) + '-2';
    const totalDays = calculateDays(startDate, endDate);

    const camp1Kpi = Math.round(targetKpi * 0.6);
    const camp2Kpi = targetKpi - camp1Kpi;

    // Auto-generate 2 execution tasks for team (Planning -> Assigning)
    // Initially locked until Master Plan is approved by Lâm Quang Thịnh
    const generatedTasks = [
      {
        id: task1Id,
        title: `[Camp 1] Viết Ad Copy & Bài Social: ${camp1Title}`,
        campaign: `Kế hoạch ${selectedProduct?.name || 'Mới'}`,
        brand: selectedProduct?.brand || 'MBC',
        team: 'Content',
        type: 'Content',
        assignee: 'Hoàng Minh Khôi',
        assigneeRole: 'Social Executive',
        stage: 'in_progress',
        status: 'pending',
        statusLabel: 'Chờ mở khóa',
        deadline: '10/10/2026',
        isOverdue: false,
        masterPlanId: planId,
        isLocked: true,
        lockMessage: `Chờ ${selectedApprover?.name || 'Lâm Quang Thịnh'} duyệt Master Plan để mở khóa`,
        severity: 'normal',
        urgency: 'normal',
        creativeBrief: {
          objective: `Triển khai Camp 1 (Teasing/Phủ): ${camp1Title}`,
          targetPersona: selectedProduct?.targetUser || 'Chủ doanh nghiệp, Quản trị viên IT',
          keyMessage: keyMessage,
          deliverables: '3 bài Ad Copy Facebook Ads + 2 bài Social Post organic',
          toneOfVoice: 'Ấn tượng, thôi thúc, kỹ thuật đáng tin cậy'
        },
        assetPreview: {
          type: 'content',
          headline: `[Bản thảo Camp 1] ${camp1Title}`,
          primaryText: `Thông điệp: ${keyMessage}\nTarget KPI: ${camp1Kpi} SQLs (60% tổng KPI chiến dịch)`,
          ctaButton: 'Tìm Hiểu Thêm',
          version: 'v1.0 (Auto-generated)'
        },
        qaReport: { tested: false }
      },
      {
        id: task2Id,
        title: `[Camp 2] Thiết kế Bộ Banner KV Promo: ${camp2Title}`,
        campaign: `Kế hoạch ${selectedProduct?.name || 'Mới'}`,
        brand: selectedProduct?.brand || 'MBC',
        team: 'Design',
        type: 'Design',
        assignee: 'Nguyễn Duy Quý',
        assigneeRole: 'Intern',
        stage: 'not_started',
        status: 'pending',
        statusLabel: 'Chờ mở khóa',
        deadline: '15/10/2026',
        isOverdue: false,
        masterPlanId: planId,
        isLocked: true,
        lockMessage: `Chờ ${selectedApprover?.name || 'Lâm Quang Thịnh'} duyệt Master Plan để mở khóa`,
        severity: 'normal',
        urgency: 'normal',
        creativeBrief: {
          objective: `Triển khai Camp 2 (Retargeting/Chốt deal): ${camp2Title}`,
          targetPersona: selectedProduct?.targetUser || 'Khách hàng ghé thăm web chưa đăng ký',
          keyMessage: keyMessage,
          deliverables: 'Bộ banner đa kích thước (1200x628, 1080x1080, 1080x1920) chuẩn Meta Ads',
          toneOfVoice: 'Thúc đẩy hành động, ưu đãi rõ ràng, nổi bật'
        },
        assetPreview: {
          type: 'design',
          headline: `[Thiết kế KV Camp 2] ${camp2Title}`,
          primaryText: `Offer chốt deal: ${keyMessage}\nTarget KPI: ${camp2Kpi} SQLs (40% tổng KPI chiến dịch)`,
          ctaButton: 'Nhận Ưu Đãi Ngay',
          version: 'v1.0 (Auto-generated)'
        },
        qaReport: { tested: false }
      }
    ];

    const newMasterPlan = {
      id: planId,
      productId: selectedProduct?.id || 'prod-custom',
      productName: selectedProduct?.name || 'Sản phẩm mới',
      brand: selectedProduct?.brand || 'MBC',
      title: `[Master Plan] Kế hoạch ${selectedProduct?.name || ''}: ${keyMessage.slice(0, 45)}`,
      creator: selectedOwner?.name || 'Lê Phạm Minh Châu',
      creatorRole: selectedOwner?.role || 'Senior Growth Executive',
      reviewer: selectedApprover?.name || 'Lâm Quang Thịnh',
      reviewerRole: selectedApprover?.role || 'Acting Marketing Manager',
      approver: selectedApprover?.name || 'Lâm Quang Thịnh',
      approverRole: selectedApprover?.role || 'Acting Marketing Manager',
      timeline: `${formatDateDisplay(startDate)} - ${formatDateDisplay(endDate)}`,
      timelineDays: totalDays,
      targetKpi: `${targetKpi} SQLs`,
      budget: '$1,200',
      keyMessage: keyMessage,
      status: 'pending_approval',
      statusLabel: 'Chờ duyệt',
      createdAt: 'Vừa tạo',
      subCampaigns: [
        {
          id: 'camp-01',
          name: 'Camp 1 (Teasing/Phủ)',
          title: camp1Title,
          share: '60% KPI',
          kpi: `${camp1Kpi} SQLs`,
          budget: '$720',
          description: `Triển khai Camp 1: ${camp1Title}`
        },
        {
          id: 'camp-02',
          name: 'Camp 2 (Retargeting/Chốt deal)',
          title: camp2Title,
          share: '40% KPI',
          kpi: `${camp2Kpi} SQLs`,
          budget: '$480',
          description: `Triển khai Camp 2: ${camp2Title}`
        }
      ],
      dependentTaskIds: [task1Id, task2Id]
    };

    setTimeout(() => {
      onApproveCampaign({
        productId: selectedProduct?.id || 'prod-custom',
        title: `[Chiến dịch] ${selectedProduct?.name || ''} - ${keyMessage.slice(0, 40)}...`,
        targetMonth: "2026-10",
        keyMessage: keyMessage,
        timeline: `${formatDateDisplay(startDate)} - ${formatDateDisplay(endDate)} (${totalDays} ngày)`,
        targetKpi: `${targetKpi} SQLs`,
        topicBrief: `Key message: "${keyMessage}". Đề xuất 2 Campaigns: 1. ${camp1Title} (60% KPI: ${camp1Kpi} SQLs), 2. ${camp2Title} (40% KPI: ${camp2Kpi} SQLs).`,
        startDate: startDate,
        deadline: endDate,
        channels: ["Meta Ads", "Google Ads"]
      }, generatedTasks, newMasterPlan);

      setIsApproved(false);
      onClose();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-3xl w-full shadow-2xl border border-slate-200/80 overflow-hidden flex flex-col max-h-[92vh] animate-in zoom-in-95 duration-200">
        
        {/* Header Modal - Dark Slate/Navy Header */}
        <div className="p-5 sm:px-7 bg-[#1E293B] border-b border-slate-800 text-white flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="h-10 w-10 rounded-xl bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 flex items-center justify-center shadow-xs">
              <Sparkles className="w-5 h-5 text-indigo-300" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="font-bold text-white text-base tracking-tight">
                  Trợ lý Hoạch định Chiến lược
                </h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 uppercase tracking-wider">
                  Strategic Framework
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Lập kế hoạch chiến dịch tổng thể theo thời gian, thông điệp và KPI mục tiêu
              </p>
            </div>
          </div>

          <button 
            onClick={onClose}
            className="text-slate-400 hover:text-white p-2 rounded-xl hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Conversational Dialogue Body */}
        <div className="p-5 sm:p-7 space-y-6 text-xs overflow-y-auto flex-1 bg-[#F9FAFB]">
          
          {/* KHỐI 1: LỜI CHÀO & CHỌN SẢN PHẨM */}
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-600 to-purple-600 text-white flex items-center justify-center shrink-0 shadow-sm mt-0.5">
              <Bot className="w-4 h-4" />
            </div>
            <div className="space-y-3 flex-1">
              <div className="p-4 bg-white rounded-2xl rounded-tl-sm text-slate-800 leading-relaxed shadow-xs border border-slate-200/80">
                <p className="text-xs sm:text-sm font-medium">
                  Chào bạn! Tôi là <strong className="text-indigo-600 font-bold">Trợ lý Hoạch định Chiến lược (Growth Assistant)</strong>. Bạn muốn khởi động chiến dịch cho sản phẩm nào trong tháng này?
                </p>
              </div>

              {/* Chips chọn nhanh sản phẩm (Mặc định: Vibe Host) */}
              <div className="flex flex-wrap gap-2 pt-0.5">
                {products.map(p => {
                  const isSelected = selectedProduct?.id === p.id;
                  return (
                    <button
                      key={p.id}
                      onClick={() => handleSelectProduct(p)}
                      className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all border cursor-pointer ${
                        isSelected
                          ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm font-bold scale-102'
                          : 'bg-white text-slate-700 border-slate-200/90 hover:border-indigo-300 hover:bg-indigo-50/50 shadow-2xs'
                      }`}
                    >
                      {p.name}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* KHỐI 2: KHUNG KẾ HOẠCH CHIẾN DỊCH (CAMPAIGN FRAMEWORK MINI-FORM TƯƠNG TÁC) */}
          {selectedProduct && (
            <div className="flex items-start space-x-3 animate-in fade-in duration-300">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-600 to-purple-600 text-white flex items-center justify-center shrink-0 shadow-sm mt-0.5">
                <Bot className="w-4 h-4" />
              </div>
              
              <div className="space-y-4 flex-1">
                {/* Lời dẫn giải của Gemini */}
                <div className="p-4 bg-white rounded-2xl rounded-tl-sm text-slate-800 leading-relaxed shadow-xs border border-slate-200/80 space-y-1">
                  <p className="text-xs sm:text-sm">
                    Tuyệt vời! Tôi đã xây dựng sẵn <strong>Khung Kế Hoạch Chiến Dịch (Campaign Framework)</strong> cho sản phẩm <strong className="text-indigo-600 font-bold">{selectedProduct.name}</strong>.
                  </p>
                  <p className="text-[11px] text-slate-500">
                    Bạn có thể tương tác và chỉnh sửa trực tiếp các thông số Timeline, Key Message và Target KPI ngay bên dưới:
                  </p>
                </div>

                {/* MINI-FORM TƯƠNG TÁC TRỰC TIẾP TRONG BONG BÓNG CHAT */}
                <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/90 shadow-sm space-y-4">
                  
                  {/* KHU VỰC 1: THỜI GIAN (TIMELINE) & DATE-PICKER */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-bold text-slate-800 flex items-center space-x-1.5 uppercase tracking-wider">
                        <Calendar className="w-3.5 h-3.5 text-indigo-600" />
                        <span>Khu vực 1: Thời Gian Triển Khai (Timeline)</span>
                      </label>
                      <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-150 shadow-2xs">
                        ⏱️ {formatDateDisplay(startDate)} — {formatDateDisplay(endDate)} ({totalDays} ngày)
                      </span>
                    </div>

                    {/* Khung chọn ngày tích hợp lịch */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-slate-50/80 p-3 rounded-xl border border-slate-200/70">
                      <div>
                        <span className="text-[10px] text-slate-500 font-medium block mb-1">Từ ngày (Bắt đầu):</span>
                        <div className="relative flex items-center bg-white rounded-lg border border-slate-200 focus-within:border-indigo-500 shadow-2xs px-2.5 py-1.5">
                          <Calendar className="w-3.5 h-3.5 text-indigo-500 mr-2 shrink-0" />
                          <input
                            type="date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            className="w-full text-xs bg-transparent focus:outline-none font-semibold text-slate-800"
                          />
                        </div>
                      </div>

                      <div>
                        <span className="text-[10px] text-slate-500 font-medium block mb-1">Đến ngày (Kết thúc):</span>
                        <div className="relative flex items-center bg-white rounded-lg border border-slate-200 focus-within:border-indigo-500 shadow-2xs px-2.5 py-1.5">
                          <Calendar className="w-3.5 h-3.5 text-purple-500 mr-2 shrink-0" />
                          <input
                            type="date"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                            className="w-full text-xs bg-transparent focus:outline-none font-semibold text-slate-800"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* KHU VỰC 2: KEY MESSAGE (THÔNG ĐIỆP CHÍNH) */}
                  <div className="space-y-1.5 pt-1">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-bold text-slate-800 flex items-center space-x-1.5 uppercase tracking-wider">
                        <MessageSquare className="w-3.5 h-3.5 text-indigo-600" />
                        <span>Khu vực 2: Key Message (Thông Điệp Chính)</span>
                      </label>
                      <span className="text-[10px] text-slate-400 font-normal">
                        Click để chỉnh sửa theo ý muốn
                      </span>
                    </div>

                    <div className="relative">
                      <textarea
                        rows={2}
                        value={keyMessage}
                        onChange={(e) => setKeyMessage(e.target.value)}
                        placeholder="Nhập thông điệp chính của chiến dịch..."
                        className="w-full p-3 text-xs sm:text-sm bg-slate-50/80 rounded-xl border border-slate-200 focus:bg-white focus:border-indigo-500 focus:outline-none font-medium text-slate-900 leading-relaxed resize-none transition-all shadow-2xs"
                      />
                      <div className="flex items-center justify-between text-[10px] text-slate-400 px-1 mt-0.5">
                        <span className="italic">💡 Gợi ý theo Pain Point của khách hàng • Người dùng chủ động gõ lại</span>
                        <span>{keyMessage.length} ký tự</span>
                      </div>
                    </div>
                  </div>

                  {/* KHU VỰC 3: KPI MỤC TIÊU */}
                  <div className="space-y-2 pt-1">
                    <label className="text-xs font-bold text-slate-800 flex items-center space-x-1.5 uppercase tracking-wider">
                      <Target className="w-3.5 h-3.5 text-indigo-600" />
                      <span>Khu vực 3: KPI Mục Tiêu Chiến Dịch</span>
                    </label>

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-50/80 p-3.5 rounded-xl border border-slate-200/70">
                      <div className="flex items-center space-x-2.5">
                        <span className="text-xs font-bold text-slate-600">Nhập Target:</span>
                        <div className="flex items-center space-x-1.5 bg-white px-3 py-1.5 rounded-lg border border-slate-300 focus-within:border-indigo-600 shadow-2xs">
                          <input
                            type="number"
                            min="1"
                            max="5000"
                            value={targetKpi}
                            onChange={(e) => setTargetKpi(Math.max(1, parseInt(e.target.value) || 0))}
                            className="w-16 text-base font-black text-indigo-700 focus:outline-none text-center"
                          />
                          <span className="text-xs font-bold text-slate-800">SQLs</span>
                        </div>
                      </div>

                      <p className="text-[11px] text-slate-500 leading-snug">
                        Hệ thống sẽ tự động tính toán phân bổ số lượng Lead/SQL cho từng nhánh chiến dịch bên dưới.
                      </p>
                    </div>
                  </div>

                  {/* KHU VỰC 4: OUTPUT CHIẾN DỊCH (ĐỀ XUẤT TRIỂN KHAI 2 CAMPAIGNS) */}
                  <div className="space-y-2.5 pt-2 border-t border-slate-100">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-800 flex items-center space-x-1.5 uppercase tracking-wider">
                        <Layers className="w-3.5 h-3.5 text-indigo-600" />
                        <span>Khu vực 4: Output Chiến Dịch</span>
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-indigo-50 text-indigo-700 border border-indigo-200 shadow-2xs">
                        Đề xuất triển khai: 2 Campaigns
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {/* Camp 1 (Teasing/Phủ) */}
                      <div className="p-3.5 bg-gradient-to-br from-indigo-50/70 to-purple-50/40 rounded-xl border border-indigo-150 space-y-2 shadow-2xs">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white text-indigo-700 border border-indigo-100 uppercase tracking-wide">
                            Camp 1 (Teasing/Phủ)
                          </span>
                          <span className="text-xs font-black text-indigo-900 bg-indigo-100/90 px-2 py-0.5 rounded-md">
                            60% • {camp1Kpi} SQLs
                          </span>
                        </div>
                        <div>
                          <h4 className="text-xs font-bold text-slate-900 line-clamp-1">
                            "{camp1Title}"
                          </h4>
                          <p className="text-[11px] text-slate-600 leading-relaxed mt-1">
                            Phủ nhận thức tệp khách hàng tiềm năng mới, truyền thông điểm mạnh công nghệ NVMe và Uptime 99.99%.
                          </p>
                        </div>
                      </div>

                      {/* Camp 2 (Retargeting/Chốt deal) */}
                      <div className="p-3.5 bg-gradient-to-br from-purple-50/70 to-blue-50/40 rounded-xl border border-purple-150 space-y-2 shadow-2xs">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white text-purple-700 border border-purple-100 uppercase tracking-wide">
                            Camp 2 (Retargeting/Chốt deal)
                          </span>
                          <span className="text-xs font-black text-purple-900 bg-purple-100/90 px-2 py-0.5 rounded-md">
                            40% • {camp2Kpi} SQLs
                          </span>
                        </div>
                        <div>
                          <h4 className="text-xs font-bold text-slate-900 line-clamp-1">
                            "{camp2Title}"
                          </h4>
                          <p className="text-[11px] text-slate-600 leading-relaxed mt-1">
                            Bám đuổi tệp ghé thăm web chưa điền form, thôi thúc ký hợp đồng trong tháng với ưu đãi tặng tháng.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* KHU VỰC 5: PHÂN BỔ NHÂN SỰ & LUỒNG PHÊ DUYỆT (MULTI-USER WORKSPACE ASSIGNMENT) */}
                  <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-2xs space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-800 flex items-center space-x-1.5 uppercase tracking-wider">
                        <Users className="w-3.5 h-3.5 text-indigo-600" />
                        <span>Khu vực 5: Phân Bổ Nhân Sự & Luồng Phê Duyệt</span>
                      </span>
                      <span className="text-[10px] font-semibold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full border border-indigo-150">
                        Multi-user Flow
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      {/* Trường 1: Người lập kế hoạch (Owner) */}
                      <div>
                        <UserSelector
                          label="Người lập kế hoạch (Owner):"
                          user={selectedOwner}
                          teamMembers={teamMembers}
                          onSelect={(member) => setSelectedOwner(member)}
                          variant="card"
                        />
                      </div>

                      {/* Trường 2: Người phê duyệt (Approver) */}
                      <div>
                        <UserSelector
                          label="Người phê duyệt (Approver) *"
                          user={selectedApprover}
                          teamMembers={teamMembers}
                          filterType="approvers"
                          onSelect={(member) => setSelectedApprover(member)}
                          variant="card"
                        />
                      </div>
                    </div>

                    <p className="text-[11px] text-slate-500 leading-relaxed italic">
                      * Sau khi chốt kế hoạch, hệ thống sẽ tự động gửi chiến dịch lên cho <strong className="text-indigo-700 font-bold">{selectedApprover?.name || 'Sếp'}</strong> ({selectedApprover?.role || 'Ban Giám Đốc'}). Các task con sẽ tạm khóa cho đến khi được duyệt.
                    </p>
                  </div>

                  {/* KHỐI 3: NÚT CTA CHỐT KẾ HOẠCH & SINH TASK THỰC THI */}
                  <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
                    <div className="text-[11px] text-slate-500">
                      Bấm xác nhận để chuyển từ <strong className="text-slate-800">Planning</strong> sang <strong className="text-indigo-600 font-bold">Assigning</strong> cho team.
                    </div>

                    <div className="flex items-center space-x-2.5 self-end sm:self-auto shrink-0">
                      <button
                        type="button"
                        onClick={onClose}
                        className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200 transition-colors cursor-pointer"
                      >
                        Hủy
                      </button>

                      <button
                        type="button"
                        onClick={handleApprove}
                        disabled={isApproved}
                        className="inline-flex items-center px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 shadow-md shadow-indigo-200 transition-all hover:scale-102 active:scale-98 cursor-pointer disabled:opacity-50"
                        title="Chốt kế hoạch chiến lược và tự động sinh 2 task thực thi cho Content & Design"
                      >
                        <Sparkles className="w-3.5 h-3.5 mr-1.5 text-indigo-200" />
                        <span>{isApproved ? 'Đang sinh task...' : 'Chốt Kế Hoạch & Sinh Task Thực Thi'}</span>
                      </button>
                    </div>
                  </div>

                </div>

              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
