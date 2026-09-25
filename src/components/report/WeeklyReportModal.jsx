import React, { useState, useRef, useEffect } from 'react';
import { 
  X, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  ShieldAlert, 
  TrendingUp, 
  TrendingDown, 
  Calendar, 
  Share2, 
  Printer, 
  Mail, 
  Copy, 
  Edit3, 
  Save, 
  CheckSquare, 
  Square, 
  FileText, 
  Building2, 
  DollarSign, 
  Users, 
  ArrowUpRight,
  Send,
  MessageSquare,
  Target,
  ChevronDown,
  ChevronUp,
  Check,
  Loader2
} from 'lucide-react';
import UserSelector from '../common/UserSelector';
import { INITIAL_TEAM_MEMBERS } from '../../data/mockData';

function TeamsLogo({ className = "w-3.5 h-3.5" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.42 7.78a2.12 2.12 0 1 0-2.34-3.52 2.12 2.12 0 0 0 2.34 3.52zM22.5 10.5h-3.62c-.76 0-1.38.62-1.38 1.38v3.62c0 .48.39.88.88.88s.87-.4.87-.88v-2.75h3.25v4.5c0 .41.34.75.75.75s.75-.34.75-.75v-6c0-.41-.34-.75-.75-.75h-.75zM13.5 5.25a3 3 0 1 0-3-3 3 3 0 0 0 3 3zm2.25 4.5h-4.5c-1.24 0-2.25 1.01-2.25 2.25v7.5c0 .83.67 1.5 1.5 1.5h6c.83 0 1.5-.67 1.5-1.5V12c0-1.24-1.01-2.25-2.25-2.25zM6.5 7.5a1.75 1.75 0 1 0-1.75-1.75A1.75 1.75 0 0 0 6.5 7.5zm.75 3.25H3.75A1.75 1.75 0 0 0 2 12.5v4.75c0 .41.34.75.75.75s.75-.34.75-.75V13.5h3.75v3.75c0 .41.34.75.75.75s.75-.34.75-.75v-5a1.75 1.75 0 0 0-1.5-1.5z"/>
    </svg>
  );
}

export default function WeeklyReportModal({
  isOpen,
  onClose,
  reportData,
  showToast
}) {
  const [data, setData] = useState(reportData);
  const [isEditing, setIsEditing] = useState(false);
  const [recipients, setRecipients] = useState(reportData?.defaultRecipients || "Alex");
  const [executiveSummary, setExecutiveSummary] = useState(reportData?.executiveSummary || "");
  const [conversionItems, setConversionItems] = useState(reportData?.conversionTracking?.items || []);
  const [showHistory, setShowHistory] = useState(false);
  const [actionPlan, setActionPlan] = useState(reportData?.actionPlan || []);

  // 1. Interactive Week Picker State
  const availableWeeks = data?.availableWeeks || reportData?.availableWeeks || [
    {
      id: "w-37",
      weekNumber: 37,
      title: "Báo Cáo Growth Marketing - Tuần 37",
      period: "08/09/2026 - 14/09/2026",
      generatedTime: "Thứ Sáu 14/09, 17:00",
      status: "closed",
      statusLabel: "Đã chốt",
      isCurrent: false
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
      isCurrent: false
    },
    {
      id: "w-40",
      weekNumber: 40,
      title: "Báo Cáo Growth Marketing - Tuần 40",
      period: "29/09/2026 - 05/10/2026",
      generatedTime: "Dự thảo tuần tới",
      status: "upcoming",
      statusLabel: "Sắp tới",
      isCurrent: false
    }
  ];

  const [selectedWeekId, setSelectedWeekId] = useState(data?.currentWeekId || "w-38");
  const [isWeekPickerOpen, setIsWeekPickerOpen] = useState(false);
  const weekPickerRef = useRef(null);

  // 2. Inline Editing State for KPIs
  const [editingField, setEditingField] = useState(null); // { itemId, field: 'actual' | 'target' }
  const [editTempText, setEditTempText] = useState('');

  // 3. Manual AI Trigger & Analysis State
  const [isAiAnalyzed, setIsAiAnalyzed] = useState(true); // Default true for mock week 38, false when picking new/empty week
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // Sync khi prop thay đổi
  useEffect(() => {
    if (reportData) {
      setData(reportData);
      setRecipients(reportData.defaultRecipients || "Alex");
      setExecutiveSummary(reportData.executiveSummary || "");
      setConversionItems(reportData.conversionTracking?.items || []);
      setActionPlan(reportData.actionPlan || []);
      if (reportData.currentWeekId) {
        setSelectedWeekId(reportData.currentWeekId);
      }
    }
  }, [reportData]);

  // Click outside listener for Week Picker Popover
  useEffect(() => {
    function handleClickOutside(event) {
      if (weekPickerRef.current && !weekPickerRef.current.contains(event.target)) {
        setIsWeekPickerOpen(false);
      }
    }
    if (isWeekPickerOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isWeekPickerOpen]);

  // Week selection handler
  const handleSelectWeek = (w) => {
    setSelectedWeekId(w.id);
    setIsWeekPickerOpen(false);

    setData(prev => ({
      ...prev,
      weekTitle: w.title,
      period: w.period,
      generatedTime: w.generatedTime
    }));

    if (w.items && w.items.length > 0) {
      setConversionItems(w.items);
      const hasAi = w.items.some(i => i.aiReason && i.aiReason.trim().length > 0);
      setIsAiAnalyzed(hasAi);
    } else if (w.id === 'w-38') {
      setConversionItems(reportData?.conversionTracking?.items || []);
      setExecutiveSummary(reportData?.executiveSummary || "");
      setIsAiAnalyzed(true);
    } else {
      setIsAiAnalyzed(false);
      setExecutiveSummary("");
    }

    if (showToast) {
      showToast(`📅 Đã chuyển sang ${w.title} (${w.period})`);
    }
  };

  // Inline edit handlers for actual and target
  const handleStartEdit = (itemId, field, currentValue) => {
    setEditingField({ itemId, field });
    let rawVal = String(currentValue || '').replace(/[^\d.]/g, '');
    setEditTempText(rawVal);
  };

  const handleSaveEdit = (itemId, field) => {
    if (!editingField) return;
    const num = parseFloat(editTempText);
    
    setConversionItems(prev => prev.map(item => {
      if (item.id !== itemId) return item;

      let newActual = item.actual;
      let newActualDisplay = item.actualDisplay;
      let newTarget = item.target;
      let newTargetDisplay = item.targetDisplay;

      if (field === 'actual') {
        if (!isNaN(num)) {
          if (item.unit === 'VNĐ' || String(item.actualDisplay).includes('M')) {
            newActualDisplay = `${num}M`;
            newActual = num * 1000000;
          } else {
            newActual = num;
            newActualDisplay = `${num}`;
          }
        }
      } else if (field === 'target') {
        if (!isNaN(num) && num > 0) {
          if (item.unit === 'VNĐ' || String(item.targetDisplay).includes('M')) {
            newTargetDisplay = `${num}M VNĐ`;
            newTarget = num * 1000000;
          } else {
            newTarget = num;
            newTargetDisplay = `${num} ${item.unit}`;
          }
        }
      }

      // Compute rate
      const actualForCalc = (item.unit === 'VNĐ' || String(item.actualDisplay).includes('M')) ? (newActual / 1000000) : newActual;
      const targetForCalc = (item.unit === 'VNĐ' || String(item.targetDisplay).includes('M')) ? (newTarget / 1000000) : newTarget;
      
      const newRate = targetForCalc > 0 ? Math.round((actualForCalc / targetForCalc) * 1000) / 10 : 0;
      const isSafe = newRate >= 80;

      return {
        ...item,
        actual: newActual,
        actualDisplay: newActualDisplay,
        target: newTarget,
        targetDisplay: newTargetDisplay,
        rate: newRate,
        status: isSafe ? 'Safe' : 'Red-flag',
        statusLabel: isSafe ? 'An Toàn' : 'Cảnh Báo'
      };
    }));

    setEditingField(null);
    if (showToast) {
      showToast("📊 Đã cập nhật số liệu KPI! Bấm '✨ Chạy Phân Tích' để tổng hợp lại insights.");
    }
  };

  // Manual Trigger Handler
  const handleRunAiAnalysis = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      const betaItem = conversionItems.find(i => i.id === 'conv-beta' || i.id === 'conv-mbi') || conversionItems[0];
      const alphaItem = conversionItems.find(i => i.id === 'conv-alpha' || i.id === 'conv-mbn') || conversionItems[1];

      let betaReason = "";
      let betaSuggestion = "";
      if (betaItem) {
        if (betaItem.rate < 80) {
          betaReason = `Tỷ lệ đơn hàng đạt ${betaItem.rate}% (dưới mức an toàn 80%). Tần suất hiển thị quảng cáo (Frequency) chạm ngưỡng bão hòa (2.95), đối tượng mục tiêu bắt đầu có hiện tượng giảm tương tác với creative cũ.`;
          betaSuggestion = `Tung ngay bản cut Video Review 15s mới, kết nối thông báo tự động qua MS Teams Webhook và mở rộng thêm tệp Lookalike 2% để hạ CPL.`;
        } else {
          betaReason = `Đơn hàng đạt ${betaItem.actualDisplay} (${betaItem.rate}%), giữ nhịp tăng trưởng ổn định. Chiến dịch Lead Ads ưu đãi Smart AP Automation phản hồi tích cực từ nhóm Kế toán SMBs.`;
          betaSuggestion = `Tăng 20% ngân sách cho 2 ad set dẫn đầu, duy trì chạy song song phễu remarketing dùng thử.`;
        }
      }

      let alphaReason = "";
      let alphaSuggestion = "";
      if (alphaItem) {
        if (alphaItem.rate >= 100) {
          alphaReason = `Doanh thu đạt ${alphaItem.actualDisplay} (${alphaItem.rate}%), vượt chỉ tiêu tuần. Nhờ sức hút lớn từ chiến dịch Combo Domain Registry .VN tặng kèm Business Email Pro và tỷ lệ tái tục hosting ổn định.`;
          alphaSuggestion = `Tiếp tục mở rộng tệp Lookalike 1% nhóm doanh nghiệp mới thành lập và chuẩn bị chương trình flash sale cuối tháng.`;
        } else {
          alphaReason = `Doanh số đạt ${alphaItem.actualDisplay} (${alphaItem.rate}%), chưa đạt kỳ vọng do mảng Managed Cloud Hosting chững lại giữa tháng.`;
          alphaSuggestion = `Kích hoạt chương trình tặng thêm tháng sử dụng cho Cloud Server Pro và gửi Email Drip kích thích gia hạn tên miền.`;
        }
      }

      setConversionItems(prev => prev.map(item => {
        if (item.id === 'conv-beta' || item.id === 'conv-mbi') {
          return { ...item, aiReason: betaReason, aiSuggestion: betaSuggestion };
        }
        if (item.id === 'conv-alpha' || item.id === 'conv-mbn') {
          return { ...item, aiReason: alphaReason, aiSuggestion: alphaSuggestion };
        }
        return item;
      }));

      const currentW = availableWeeks.find(w => w.id === selectedWeekId);
      const weekLabel = currentW?.title || data.weekTitle;
      const periodLabel = currentW?.period || data.period;
      const summaryText = `Báo cáo ${weekLabel} (${periodLabel}): Khối Beta ghi nhận ${betaItem?.actualDisplay || 0} đơn hàng (đạt ${betaItem?.rate || 0}%), Khối Alpha đạt ${alphaItem?.actualDisplay || 0} doanh thu (${alphaItem?.rate || 0}%). Đội ngũ Growth Marketing cần tiếp tục tập trung tối ưu hóa chi phí chuyển đổi CPL và đẩy nhanh tiến độ phê duyệt các asset đang tồn đọng.`;
      setExecutiveSummary(summaryText);

      setIsAiAnalyzed(true);
      setIsAnalyzing(false);
      if (showToast) {
        showToast("✨ Hệ thống đã hoàn tất phân tích và tổng hợp insights báo cáo!");
      }
    }, 1100);
  };

  // Save Draft Handler
  const handleSaveDraft = () => {
    setIsEditing(false);
    if (showToast) {
      showToast("💾 Đã lưu bản nháp báo cáo tuần thành công!");
    }
  };

  if (!isOpen || !data) return null;

  // Cập nhật trường trong conversionItems khi Inline Edit
  const handleUpdateConversionItem = (id, field, value) => {
    setConversionItems(prev => prev.map(item => {
      if (item.id === id) {
        return { ...item, [field]: value };
      }
      return item;
    }));
  };

  // Toggle checklist item
  const handleToggleAction = (id) => {
    setActionPlan(prev => prev.map(item => {
      if (item.id === id) return { ...item, checked: !item.checked };
      return item;
    }));
  };

  // Bắn báo cáo vào MS Teams & copy định dạng Teams Markdown chuẩn
  const handleSendToTeams = () => {
    const conversionText = conversionItems && conversionItems.length > 0 ? `
🎯 **THEO DÕI TỐI ƯU CHUYỂN ĐỔI (KHỐI ALPHA & KHỐI BETA):**
${conversionItems.map(item => `* **${item.brandName}**: ${item.actualDisplay} / ${item.targetDisplay} (Đạt ${item.rate}% - ${item.rate >= 80 ? '🟢 An Toàn' : '🔴 Cần Chú Ý'})\n  ↳ *Đánh giá Hệ thống:* ${item.aiReason}\n  ↳ *Đề xuất:* ${item.aiSuggestion}`).join('\n')}
` : '';

    const teamsText = `📢 **${(data.weekTitle || 'BÁO CÁO GROWTH MARKETING').toUpperCase()}** (${data.period})
**Kính gửi:** ${recipients}
**Người lập:** Growth Lead | **Hệ thống:** Growth-loop Enterprise OS

✨ **ĐÁNH GIÁ & ĐỀ XUẤT HÀNH ĐỘNG:**
${executiveSummary}
${conversionText}
🟢 **THE GOOD (CHIẾN DỊCH VƯỢT KPI):**
${data.theGood?.map(g => `* **${g.productName}**: ${g.sqls} SQLs (${g.leads} Leads) - Chi phí: ${g.spend} - ROAS ${g.roas}\n  ↳ ${g.aiExplanation}`).join('\n') || 'Chưa có dữ liệu'}

🔴 **THE BAD & RISKS (ĐIỂM NGHẼN & RỦI RO):**
${data.theBadAndRisks?.map(b => `* [${b.type}] **${b.productName}**: ${b.metric}\n  ↳ ${b.detail}`).join('\n') || 'Không có rủi ro lớn'}

📋 **ACTION PLAN TUẦN TỚI:**
${actionPlan?.map((a, idx) => `${idx + 1}. ${a.text} ${a.checked ? '✅' : '⏳'}`).join('\n') || 'Đang cập nhật'}

---
🔗 *Báo cáo đồng bộ trực tiếp từ Growth-loop OS qua MS Teams Graph API.*`;

    if (navigator.clipboard) {
      navigator.clipboard.writeText(teamsText);
    }
    if (showToast) {
      showToast("🚀 Đã bắn bản tóm tắt báo cáo vào kênh MS Teams thành công!");
    }
  };

  // Giả lập gửi Email tự động
  const handleSendEmail = () => {
    if (showToast) {
      showToast(`✉️ Đã gửi báo cáo tuần 38 tới ${recipients}!`);
    }
  };

  // Xuất PDF / In
  const handlePrintPdf = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-3 sm:p-6 print:p-0">
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-200 print:hidden"
      />

      {/* Report Document Wrapper (Single Column Mobile-friendly) */}
      <div className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl border border-neutral-200 overflow-hidden flex flex-col max-h-[92vh] print:max-h-none print:shadow-none print:border-none animate-in zoom-in-95 duration-200">
        
        {/* Document Header (Printable Header) */}
        <div className="p-5 sm:px-8 border-b border-slate-200/80 bg-white flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="space-y-1.5">
            <div className="flex items-center space-x-2 flex-wrap gap-y-1">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-indigo-50 text-indigo-700 border border-indigo-150 uppercase tracking-wide flex items-center">
                <Sparkles className="w-3 h-3 mr-1 text-indigo-600" strokeWidth={2} />
                Báo Cáo Tự Động
              </span>
              <span className="text-xs text-slate-500 font-medium">
                Hệ thống tự động tổng hợp dữ liệu lúc {data.generatedTime} • {data.period}
              </span>
            </div>

            {/* 1. Interactive Week Picker: Dropdown Selector with Chevron */}
            <div className="relative inline-block" ref={weekPickerRef}>
              <button
                type="button"
                onClick={() => setIsWeekPickerOpen(!isWeekPickerOpen)}
                className="flex items-center space-x-2 text-xl sm:text-2xl font-bold text-slate-900 hover:text-indigo-600 transition-colors group cursor-pointer text-left"
                title="Bấm để chọn tuần báo cáo khác"
              >
                <span>{data.weekTitle}</span>
                <span className="p-1 rounded-lg text-slate-400 group-hover:text-indigo-600 group-hover:bg-indigo-50 transition-all">
                  <ChevronDown className={`w-5 h-5 transition-transform ${isWeekPickerOpen ? 'rotate-180 text-indigo-600' : ''}`} />
                </span>
              </button>

              {/* Week Picker Popover & Mini-Calendar */}
              {isWeekPickerOpen && (
                <div className="absolute top-full left-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-xl border border-slate-200 p-3.5 z-50 animate-in fade-in zoom-in-95 duration-150">
                  <div className="flex items-center justify-between px-2 pb-2.5 border-b border-slate-100 mb-2.5">
                    <div className="flex items-center space-x-1.5 text-xs font-bold text-slate-800 uppercase tracking-wider">
                      <Calendar className="w-3.5 h-3.5 text-indigo-600" />
                      <span>Chọn Tuần Báo Cáo</span>
                    </div>
                    <span className="text-[10px] text-slate-400 font-medium">4 tuần gần nhất</span>
                  </div>

                  <div className="space-y-1.5 max-h-72 overflow-y-auto">
                    {availableWeeks.map(w => {
                      const isSelected = w.id === selectedWeekId;
                      return (
                        <button
                          key={w.id}
                          type="button"
                          onClick={() => handleSelectWeek(w)}
                          className={`w-full p-2.5 rounded-xl border text-left flex items-center justify-between transition-all cursor-pointer group ${
                            isSelected
                              ? 'bg-indigo-50/90 border-indigo-300 ring-1 ring-indigo-200 shadow-2xs'
                              : 'bg-white hover:bg-slate-50 border-slate-200/80 hover:border-slate-300'
                          }`}
                        >
                          <div className="flex items-center space-x-2.5 min-w-0">
                            <span className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 transition-colors ${
                              isSelected
                                ? 'bg-indigo-600 text-white'
                                : 'bg-slate-100 text-slate-600 group-hover:bg-slate-200'
                            }`}>
                              W{w.weekNumber}
                            </span>
                            <div className="min-w-0">
                              <div className="font-bold text-xs text-slate-800 truncate flex items-center space-x-1.5">
                                <span className="group-hover:text-indigo-950">{w.title}</span>
                                {w.isCurrent && (
                                  <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-emerald-100 text-emerald-800 shrink-0">
                                    Hiện tại
                                  </span>
                                )}
                                {w.status === 'draft' && (
                                  <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-blue-100 text-blue-800 shrink-0">
                                    Mới
                                  </span>
                                )}
                                {w.status === 'closed' && (
                                  <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-slate-100 text-slate-600 shrink-0">
                                    Đã chốt
                                  </span>
                                )}
                              </div>
                              <div className="text-[11px] text-slate-400 font-normal truncate mt-0.5">
                                {w.period}
                              </div>
                            </div>
                          </div>

                          {isSelected && (
                            <Check className="w-4 h-4 text-indigo-600 shrink-0 ml-2" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Recipient Selector / Editor */}
            <div className="flex items-center space-x-2 text-xs text-slate-600 pt-0.5 flex-wrap gap-y-1">
              <span className="font-bold text-slate-800">Kính gửi (To):</span>
              <UserSelector
                user={recipients}
                teamMembers={INITIAL_TEAM_MEMBERS}
                filterType="approvers"
                onSelect={(member) => setRecipients(member.name)}
                variant="chip"
              />
              <span className="text-slate-400">• Người lập: <strong className="text-slate-700">Sarah</strong></span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors self-end sm:self-auto print:hidden cursor-pointer"
          >
            <X className="w-5 h-5" strokeWidth={2} />
          </button>
        </div>

        {/* Document Scrollable Body */}
        <div className="p-5 sm:p-8 space-y-6 overflow-y-auto flex-1 text-slate-800">

          {/* 1. KHỐI 1: TÓM TẮT TUẦN (MINIMALIST EXECUTIVE SUMMARY) */}
          <div className="p-5 rounded-2xl bg-slate-50/70 border border-slate-200/80 shadow-2xs space-y-2.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 rounded-lg bg-indigo-50 border border-indigo-100/80 flex items-center justify-center text-indigo-600">
                  <Sparkles className="w-3.5 h-3.5" strokeWidth={2} />
                </div>
                <h2 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                  ✨ Đánh giá & Đề xuất hành động
                </h2>
              </div>
              {!isAiAnalyzed && (
                <span className="text-[10px] font-semibold text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
                  Chờ phân tích
                </span>
              )}
            </div>

            {!isAiAnalyzed ? (
              <p className="text-xs sm:text-sm text-slate-400 italic leading-relaxed py-1">
                Sau khi chốt số liệu, hãy bấm nút <button type="button" onClick={handleRunAiAnalysis} className="text-indigo-600 not-italic font-semibold hover:underline cursor-pointer">"✨ Chạy Phân Tích"</button> ở bên dưới để hệ thống tổng hợp insights...
              </p>
            ) : isEditing ? (
              <textarea
                value={executiveSummary}
                onChange={(e) => setExecutiveSummary(e.target.value)}
                rows={3}
                className="w-full p-3 text-sm rounded-xl border border-slate-300 focus:outline-none focus:border-indigo-500 bg-white text-slate-900 leading-relaxed resize-none font-normal"
              />
            ) : (
              <p className="text-sm sm:text-base text-slate-700 font-medium leading-relaxed italic">
                "{executiveSummary}"
              </p>
            )}
          </div>

          {/* KHỐI MỚI: THEO DÕI TỐI ƯU CHUYỂN ĐỔI (KHỐI ALPHA & KHỐI BETA) */}
          <div className="space-y-3.5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-1 border-b border-indigo-100 gap-2">
              <div className="flex items-center space-x-2">
                <span className="p-1 rounded-lg bg-indigo-100 text-indigo-700">
                  <Target className="w-3.5 h-3.5" />
                </span>
                <h2 className="text-xs font-black uppercase tracking-wider text-slate-900 flex items-center">
                  🎯 THEO DÕI TỐI ƯU CHUYỂN ĐỔI (KHỐI ALPHA & KHỐI BETA)
                </h2>
              </div>
              
              <div className="flex items-center space-x-2 flex-wrap gap-y-1">
                {/* Secondary Button: ✨ Chạy Phân Tích */}
                <button
                  type="button"
                  onClick={handleRunAiAnalysis}
                  disabled={isAnalyzing}
                  className={`inline-flex items-center px-3 py-1.5 rounded-xl text-xs font-bold border transition-all cursor-pointer shadow-2xs ${
                    isAnalyzing
                      ? 'bg-indigo-50 border-indigo-300 text-indigo-700'
                      : 'bg-white hover:bg-indigo-50/60 text-slate-700 hover:text-indigo-700 border-slate-200/90 hover:border-indigo-300'
                  }`}
                  title="Kích hoạt phân tích số liệu vừa nhập"
                >
                  {isAnalyzing ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 mr-1.5 text-indigo-600 animate-spin" />
                      <span>Hệ Thống Đang Tổng Hợp...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-3.5 h-3.5 mr-1.5 text-indigo-600" />
                      <span>✨ Chạy Phân Tích</span>
                    </>
                  )}
                </button>

                <span className="text-[11px] text-slate-500 font-medium hidden sm:inline">
                  {data.weekTitle?.split('-')[1]?.trim() || 'Tuần 38'}
                </span>

                {conversionItems?.some(i => i.history) && (
                  <button
                    onClick={() => setShowHistory(!showHistory)}
                    className="inline-flex items-center text-[10px] font-bold text-indigo-600 hover:text-indigo-800 bg-indigo-50/80 hover:bg-indigo-100/80 px-2 py-0.5 rounded-full border border-indigo-200 transition-colors cursor-pointer"
                  >
                    {showHistory ? (
                      <>Thu gọn lịch sử <ChevronUp className="w-3 h-3 ml-0.5" /></>
                    ) : (
                      <>Đối chiếu Tháng 8 & 9 <ChevronDown className="w-3 h-3 ml-0.5" /></>
                    )}
                  </button>
                )}
              </div>
            </div>

            {/* 2 Hàng Thẻ Tiến Độ (Progress Cards) Tối Giản, Không Viền Màu Nặng */}
            <div className="space-y-3">
              {conversionItems?.map((item) => {
                const isSafe = item.rate >= 80;
                const progressPercent = Math.min(Math.max(item.rate, 0), 100);

                return (
                  <div 
                    key={item.id}
                    className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-2xs space-y-3 transition-all"
                  >
                    {/* Top Section: Brand Name, Huge Actual Number & Target vs Status Badge */}
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="flex items-center space-x-1.5 text-xs text-slate-500 font-medium mb-1.5">
                          <span>{item.icon}</span>
                          <span className="font-semibold text-slate-700">{item.brandName}</span>
                          <span className="text-slate-400">({item.metricLabel})</span>
                        </div>

                        {/* Typography: Số thực tế thật to, Mục tiêu nhỏ hơn đặt bên dưới (INLINE EDIT) */}
                        <div className="flex items-baseline space-x-1.5">
                          {editingField?.itemId === item.id && editingField?.field === 'actual' ? (
                            <div className="inline-flex items-center space-x-1">
                              <input
                                type="text"
                                autoFocus
                                value={editTempText}
                                onChange={(e) => setEditTempText(e.target.value)}
                                onBlur={() => handleSaveEdit(item.id, 'actual')}
                                onKeyDown={(e) => {
                                  if (e.key === 'Enter') handleSaveEdit(item.id, 'actual');
                                  if (e.key === 'Escape') setEditingField(null);
                                }}
                                className="w-24 sm:w-28 px-2 py-0.5 text-2xl sm:text-3xl font-black text-indigo-700 bg-indigo-50 border-2 border-indigo-500 rounded-xl outline-none shadow-xs font-mono"
                                placeholder="0"
                              />
                              <span className="text-[10px] text-indigo-500 font-medium">↵</span>
                            </div>
                          ) : (
                            <div 
                              onClick={() => handleStartEdit(item.id, 'actual', item.actualDisplay)}
                              className="group inline-flex items-baseline space-x-1 cursor-pointer border-b-2 border-dashed border-slate-300 hover:border-indigo-500 transition-all pb-0.5"
                              title="Nhấp để nhập số thực tế mới"
                            >
                              <span className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight leading-none group-hover:text-indigo-950">
                                {item.actualDisplay}
                              </span>
                              <Edit3 className="w-3.5 h-3.5 text-slate-400 group-hover:text-indigo-500 transition-colors shrink-0 ml-0.5" />
                            </div>
                          )}

                          <span className="text-sm font-semibold text-slate-500">
                            {item.unit}
                          </span>
                        </div>

                        <div className="text-xs text-slate-400 font-medium mt-1 flex items-center space-x-1">
                          <span>Mục tiêu:</span>
                          {editingField?.itemId === item.id && editingField?.field === 'target' ? (
                            <div className="inline-flex items-center space-x-1">
                              <input
                                type="text"
                                autoFocus
                                value={editTempText}
                                onChange={(e) => setEditTempText(e.target.value)}
                                onBlur={() => handleSaveEdit(item.id, 'target')}
                                onKeyDown={(e) => {
                                  if (e.key === 'Enter') handleSaveEdit(item.id, 'target');
                                  if (e.key === 'Escape') setEditingField(null);
                                }}
                                className="w-20 px-1.5 py-0.5 text-xs font-bold text-indigo-700 bg-indigo-50 border border-indigo-500 rounded-lg outline-none font-mono"
                                placeholder="0"
                              />
                              <span className="text-[10px] text-indigo-500 font-medium">↵</span>
                            </div>
                          ) : (
                            <span 
                              onClick={() => handleStartEdit(item.id, 'target', item.targetDisplay)}
                              className="group inline-flex items-center font-semibold text-slate-600 cursor-pointer border-b border-dashed border-slate-300 hover:border-indigo-500 transition-all"
                              title="Nhấp để sửa mục tiêu"
                            >
                              <span>{item.targetDisplay}</span>
                              <Edit3 className="w-2.5 h-2.5 ml-1 text-slate-400 group-hover:text-indigo-500 transition-colors shrink-0" />
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Trạng thái & Tỷ lệ % */}
                      <div className="flex flex-col items-end space-y-1">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold border shrink-0 ${
                          isSafe 
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200' 
                            : 'bg-rose-50 text-rose-700 border-rose-200 animate-pulse'
                        }`}>
                          {isSafe ? '🟢 An Toàn' : '🔴 Cảnh Báo (<80%)'}
                        </span>
                        <span className={`text-xs font-bold ${isSafe ? 'text-emerald-600' : 'text-rose-600'}`}>
                          Đạt {item.rate}%
                        </span>
                      </div>
                    </div>

                    {/* Progress Bar (Thanh tiến trình chạy ngang) */}
                    <div className="space-y-1 py-1">
                      <div className="relative w-full h-2.5 bg-slate-100 rounded-full overflow-hidden p-0.5">
                        <div 
                          className={`h-full rounded-full transition-all duration-500 ${
                            isSafe 
                              ? item.rate > 100 
                                ? 'bg-gradient-to-r from-emerald-500 to-teal-400' 
                                : 'bg-emerald-500'
                              : 'bg-rose-500'
                          }`}
                          style={{ width: `${progressPercent}%` }}
                        />
                      </div>
                      <div className="flex justify-between text-[10px] text-slate-400 font-medium px-0.5">
                        <span>0%</span>
                        <span className="font-medium text-slate-400">Mục tiêu 100%</span>
                        <span>{item.rate > 100 ? `${item.rate}% 🚀` : `${item.rate}%`}</span>
                      </div>
                    </div>

                    {/* 2 Dòng thông tin: Nguyên nhân & Hành động (Hỗ trợ Empty State & Edit) */}
                    {!isAiAnalyzed ? (
                      <div className="pt-2.5 border-t border-slate-100 py-1 text-xs text-slate-400 italic">
                        Chưa có phân tích. Sẽ tự động tổng hợp sau khi bấm <span className="text-indigo-600 not-italic font-semibold cursor-pointer hover:underline" onClick={handleRunAiAnalysis}>"✨ Chạy Phân Tích"</span>.
                      </div>
                    ) : isEditing ? (
                      <div className="pt-2.5 border-t border-slate-100 space-y-2">
                        <div>
                          <label className="text-[10px] font-bold text-slate-600 block mb-0.5">Nguyên nhân:</label>
                          <input
                            type="text"
                            value={item.aiReason || ''}
                            onChange={(e) => handleUpdateConversionItem(item.id, 'aiReason', e.target.value)}
                            className="w-full p-2 text-xs rounded-lg border border-slate-200 bg-slate-50 focus:bg-white text-slate-900 focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] font-bold text-slate-600 block mb-0.5">Hành động:</label>
                          <input
                            type="text"
                            value={item.aiSuggestion || ''}
                            onChange={(e) => handleUpdateConversionItem(item.id, 'aiSuggestion', e.target.value)}
                            className="w-full p-2 text-xs rounded-lg border border-slate-200 bg-slate-50 focus:bg-white text-slate-900 focus:outline-none"
                          />
                        </div>
                      </div>
                    ) : (
                      <div className="pt-2.5 border-t border-slate-100 space-y-1 text-xs leading-relaxed">
                        <p className="text-slate-600">
                          <strong className="text-slate-800 font-semibold">Nguyên nhân:</strong> {item.aiReason || 'Đang cập nhật'}
                        </p>
                        <p className="text-slate-600">
                          <strong className="text-slate-800 font-semibold">Hành động:</strong> {item.aiSuggestion || 'Đang cập nhật'}
                        </p>
                      </div>
                    )}

                  </div>
                );
              })}
            </div>

            {/* Bảng đối chiếu lịch sử mở rộng (Dữ liệu Excel Tháng 8 & 9) */}
            {showHistory && (
              <div className="mt-3 p-4 bg-slate-50/95 rounded-2xl border border-slate-200/90 shadow-2xs space-y-3 animate-in fade-in duration-200">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-slate-800 flex items-center">
                    <Calendar className="w-3.5 h-3.5 mr-1.5 text-slate-500" />
                    Bảng Đối Chiếu Lịch Sử Các Tuần (Dữ Liệu Excel Đã Số Hóa)
                  </h4>
                  <span className="text-[10px] text-slate-500">Dữ liệu thực tế đối chiếu mục tiêu</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                  {/* Khối Beta History */}
                  <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-2xs">
                    <div className="bg-slate-100/90 px-3 py-2 border-b border-slate-200 text-xs font-bold text-slate-800 flex justify-between items-center">
                      <span>⚡ Khối Beta (Mục tiêu: 22 Đơn/tuần)</span>
                      <span className="text-[10px] text-slate-500 font-normal">Tháng 8 - Tháng 9</span>
                    </div>
                    <div className="divide-y divide-slate-100 text-[11px]">
                      {conversionItems.find(i => i.id === 'conv-beta' || i.id === 'conv-mbi')?.history?.map((h, idx) => (
                        <div key={idx} className="px-3 py-1.5 flex items-center justify-between hover:bg-slate-50">
                          <span className="text-slate-600 font-medium">{h.period}</span>
                          <div className="flex items-center space-x-2">
                            <span className="font-semibold text-slate-800">{h.actual}</span>
                            <span className={`px-1.5 py-0.2 rounded text-[10px] font-bold ${
                              h.status === 'Safe' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-rose-50 text-rose-700 border border-rose-200'
                            }`}>
                              {h.rate} ({h.status === 'Safe' ? '🟢' : '🔴'})
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* MBN History */}
                  <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-2xs">
                    <div className="bg-slate-100/90 px-3 py-2 border-b border-slate-200 text-xs font-bold text-slate-800 flex justify-between items-center">
                      <span>🏢 MBN (Mục tiêu: ~421M VNĐ/tuần)</span>
                      <span className="text-[10px] text-slate-500 font-normal">Tháng 8 - Tháng 9</span>
                    </div>
                    <div className="divide-y divide-slate-100 text-[11px]">
                      {conversionItems.find(i => i.id === 'conv-mbn')?.history?.map((h, idx) => (
                        <div key={idx} className="px-3 py-1.5 flex items-center justify-between hover:bg-slate-50">
                          <span className="text-slate-600 font-medium">{h.period}</span>
                          <div className="flex items-center space-x-2">
                            <span className="font-semibold text-slate-800">{h.actual}</span>
                            <span className={`px-1.5 py-0.2 rounded text-[10px] font-bold ${
                              h.status === 'Safe' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-rose-50 text-rose-700 border border-rose-200'
                            }`}>
                              {h.rate} (🟢)
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* 2. KHỐI 2: THE GOOD (CHIẾN DỊCH & SẢN PHẨM CHẠY TỐT) */}
          <div className="space-y-3.5">
            <div className="flex items-center justify-between pb-1 border-b border-emerald-100">
              <div className="flex items-center space-x-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <h2 className="text-xs font-bold uppercase tracking-wider text-emerald-950 flex items-center">
                  🟢 The Good — Chiến Dịch Vượt KPI & Tăng Trưởng
                </h2>
              </div>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                {data.theGood?.length || 3} Chiến dịch dẫn đầu
              </span>
            </div>

            {/* Danh sách Information Cards (Không dùng bảng khô khan) */}
            <div className="space-y-3">
              {data.theGood?.map((item) => (
                <div 
                  key={item.id}
                  className="bg-white rounded-2xl p-4 border border-emerald-200/80 border-l-4 border-l-emerald-500 shadow-2xs space-y-3 hover:shadow-xs transition-shadow"
                >
                  {/* Top card: Title & Badge */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <div>
                      <div className="flex items-center space-x-2">
                        <h3 className="font-bold text-slate-900 text-sm">
                          {item.productName}
                        </h3>
                        <span className={`px-1.5 py-0.2 rounded-md text-[10px] font-bold uppercase ${
                          item.brand === 'Alpha' ? 'bg-blue-50 text-blue-700' : 'bg-emerald-50 text-emerald-700'
                        }`}>
                          {item.brand}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 truncate">
                        Chiến dịch: {item.campaignName}
                      </p>
                    </div>

                    <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-900 shrink-0 self-start sm:self-auto flex items-center">
                      <TrendingUp className="w-3.5 h-3.5 mr-1 text-emerald-600" />
                      {item.badge}
                    </span>
                  </div>

                  {/* Core Metrics Chips (Thay vì bảng data nhiều cột) */}
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-xs">
                    <div className="bg-slate-50 p-2 rounded-xl text-center">
                      <span className="text-[10px] text-slate-400 block font-medium">Chi phí</span>
                      <span className="font-bold text-slate-800">{item.spend}</span>
                    </div>
                    <div className="bg-slate-50 p-2 rounded-xl text-center">
                      <span className="text-[10px] text-slate-400 block font-medium">Leads</span>
                      <span className="font-bold text-slate-800">{item.leads}</span>
                    </div>
                    <div className="bg-emerald-50/60 p-2 rounded-xl text-center border border-emerald-100">
                      <span className="text-[10px] text-emerald-700 block font-bold">SQLs (Chất lượng)</span>
                      <span className="font-black text-emerald-800 text-sm">{item.sqls}</span>
                    </div>
                    <div className="bg-slate-50 p-2 rounded-xl text-center">
                      <span className="text-[10px] text-slate-400 block font-medium">CPL</span>
                      <span className="font-bold text-slate-800">{item.cpl}</span>
                    </div>
                    <div className="bg-slate-50 p-2 rounded-xl text-center col-span-2 sm:col-span-1">
                      <span className="text-[10px] text-slate-400 block font-medium">ROAS / CVR</span>
                      <span className="font-bold text-indigo-700">{item.roas || '8.5%'}</span>
                    </div>
                  </div>

                  {/* Dòng nhận định ngắn từ hệ thống */}
                  <div className="p-2.5 rounded-xl bg-emerald-50/40 text-emerald-950 text-xs flex items-start space-x-2">
                    <Sparkles className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <p className="leading-normal font-medium">
                      <strong>Nguyên nhân:</strong> {item.aiExplanation}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 3. KHỐI 3: THE BAD & RISKS (ĐIỂM NGHẼN & RỦI RO CẦN XỬ LÝ) */}
          <div className="space-y-3.5">
            <div className="flex items-center justify-between pb-1 border-b border-rose-100">
              <div className="flex items-center space-x-2">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-pulse" />
                <h2 className="text-xs font-bold uppercase tracking-wider text-rose-950 flex items-center">
                  🔴 The Bad & Risks — Điểm Nghẽn & Rủi Ro Tồn Đọng
                </h2>
              </div>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-rose-50 text-rose-800 border border-rose-200">
                {data.theBadAndRisks?.length || 3} Vấn đề cần can thiệp
              </span>
            </div>

            <div className="space-y-2.5">
              {data.theBadAndRisks?.map((risk) => (
                <div
                  key={risk.id}
                  className={`p-3.5 rounded-2xl border ${
                    risk.severity === 'danger'
                      ? 'border-rose-200 bg-rose-50/40 border-l-4 border-l-rose-500'
                      : 'border-amber-200 bg-amber-50/40 border-l-4 border-l-amber-500'
                  } space-y-1.5`}
                >
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        risk.severity === 'danger' ? 'bg-rose-100 text-rose-800' : 'bg-amber-100 text-amber-800'
                      }`}>
                        {risk.type}
                      </span>
                      <strong className="text-slate-900">{risk.productName}</strong>
                    </div>

                    <span className="font-mono font-bold text-xs text-rose-600 bg-white px-2 py-0.5 rounded-md border border-rose-100 shadow-2xs">
                      {risk.metric}
                    </span>
                  </div>

                  <p className="text-xs text-slate-700 leading-relaxed">
                    {risk.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* 4. KHỐI 4: ACTION PLAN (ĐỀ XUẤT HÀNH ĐỘNG TUẦN TỚI) */}
          <div className="p-5 rounded-3xl bg-slate-50 border border-slate-200/80 space-y-3.5 shadow-2xs">
            <div className="flex items-center justify-between pb-1 border-b border-slate-200">
              <div className="flex items-center space-x-2">
                <CheckSquare className="w-4 h-4 text-indigo-600" />
                <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                  📋 Action Plan — Đề Xuất Hành Động Cho Tuần Tới (Đề xuất tự động)
                </h2>
              </div>
              <span className="text-[11px] text-slate-400">
                Click để đánh dấu hoàn thành
              </span>
            </div>

            {/* Checklist tương tác */}
            <div className="space-y-2">
              {actionPlan.map((action, idx) => (
                <div
                  key={action.id}
                  onClick={() => handleToggleAction(action.id)}
                  className={`p-3 rounded-2xl flex items-start space-x-3 cursor-pointer transition-all border ${
                    action.checked 
                      ? 'bg-emerald-50/60 border-emerald-200 text-slate-400 line-through' 
                      : 'bg-white border-slate-200 text-slate-800 hover:border-indigo-300 shadow-2xs'
                  }`}
                >
                  <div className="mt-0.5 text-indigo-600 shrink-0">
                    {action.checked ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    ) : (
                      <Square className="w-4 h-4 text-slate-300" />
                    )}
                  </div>
                  <span className="text-xs sm:text-sm font-medium leading-relaxed">
                    {idx + 1}. {action.text}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* 5. STICKY EXPORT/SHARE TOOLBAR (SOFT MINIMALISM) */}
        <div className="p-4 sm:px-8 border-t border-slate-200/80 bg-white/95 backdrop-blur-md flex items-center justify-between gap-3 print:hidden shadow-[0_-4px_20px_rgba(0,0,0,0.03)]">
          
          <div className="flex items-center space-x-2.5 flex-wrap gap-y-1">
            {/* Nút 1: Lưu Bản Nháp (Save Draft - Thay thế nút Chỉnh Sửa cũ) */}
            <button
              type="button"
              onClick={handleSaveDraft}
              className="inline-flex items-center px-4 py-2 rounded-xl text-xs font-semibold bg-white text-slate-700 border border-slate-200/90 hover:bg-slate-50 hover:border-slate-300 transition-all cursor-pointer shadow-2xs"
              title="Lưu bản nháp số liệu báo cáo tuần"
            >
              <Save className="w-3.5 h-3.5 mr-1.5 text-indigo-600" strokeWidth={2} />
              <span>Lưu Bản Nháp</span>
            </button>

            {/* Nút Phụ: Sửa văn bản tóm tắt nếu cần */}
            <button
              type="button"
              onClick={() => setIsEditing(!isEditing)}
              className={`inline-flex items-center px-3 py-2 rounded-xl text-xs font-medium transition-all cursor-pointer border ${
                isEditing 
                  ? 'bg-indigo-50 text-indigo-700 border-indigo-300' 
                  : 'bg-white text-slate-500 border-slate-200 hover:bg-slate-50'
              }`}
              title="Chỉnh sửa văn bản tóm tắt hoặc hành động"
            >
              <Edit3 className="w-3.5 h-3.5 mr-1" strokeWidth={1.75} />
              <span>{isEditing ? 'Đóng Ô Sửa' : 'Sửa Chữ'}</span>
            </button>

            {/* Nút 2: Xuất PDF */}
            <button
              type="button"
              onClick={handlePrintPdf}
              className="inline-flex items-center px-4 py-2 rounded-xl text-xs font-semibold bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 hover:border-slate-300 transition-all cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5 mr-1.5 text-slate-500" strokeWidth={2} />
              <span>Xuất PDF</span>
            </button>
          </div>

          <div className="flex items-center space-x-2.5">
            {/* Nút MS Teams: Bắn báo cáo vào Teams (#6264A7) */}
            <button
              type="button"
              onClick={handleSendToTeams}
              className="inline-flex items-center px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-[#6264A7] hover:bg-[#525494] shadow-xs transition-all hover:scale-102 active:scale-98 cursor-pointer"
              title="Bắn báo cáo tuần trực tiếp vào Microsoft Teams"
            >
              <TeamsLogo className="w-3.5 h-3.5 mr-1.5 text-white shrink-0" />
              <span>Bắn báo cáo vào Teams</span>
            </button>

            {/* Nút 3: Gửi Báo Cáo - Soft UI Primary CTA: Deep Indigo */}
            <button
              type="button"
              onClick={handleSendEmail}
              className="inline-flex items-center px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 shadow-sm transition-all hover:scale-102 active:scale-98 cursor-pointer"
            >
              <Send className="w-3.5 h-3.5 mr-1.5 text-indigo-200" strokeWidth={2.5} />
              <span>Gửi Báo Cáo</span>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
