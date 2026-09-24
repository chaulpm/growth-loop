import React, { useState, useEffect } from 'react';
import { 
  X, 
  Sparkles, 
  CheckCircle2, 
  Calendar, 
  Target, 
  DollarSign, 
  Layers, 
  Lock, 
  Unlock, 
  ArrowRight, 
  AlertCircle, 
  UserCheck, 
  Send,
  MessageSquare,
  FileText
} from 'lucide-react';
import UserSelector from '../common/UserSelector';
import { INITIAL_TEAM_MEMBERS } from '../../data/mockData';

export default function MasterPlanApprovalSlideOver({
  isOpen,
  onClose,
  plan,
  tasks = [],
  teamMembers = INITIAL_TEAM_MEMBERS,
  onApprovePlan,
  onRejectPlan,
  onUpdatePlan,
  showToast
}) {
  const [revisionNote, setRevisionNote] = useState('');
  const [showRevisionInput, setShowRevisionInput] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  // Dynamic Creator & Reviewer State
  const [currentCreator, setCurrentCreator] = useState(plan?.creator || 'Lê Phạm Minh Châu');
  const [currentCreatorRole, setCurrentCreatorRole] = useState(plan?.creatorRole || 'Senior Growth Executive');
  const [currentReviewer, setCurrentReviewer] = useState(plan?.reviewer || plan?.approver || 'Lâm Quang Thịnh');
  const [currentReviewerRole, setCurrentReviewerRole] = useState(plan?.reviewerRole || plan?.approverRole || 'Acting Marketing Manager');

  useEffect(() => {
    if (plan) {
      setCurrentCreator(plan.creator || 'Lê Phạm Minh Châu');
      setCurrentCreatorRole(plan.creatorRole || 'Senior Growth Executive');
      setCurrentReviewer(plan.reviewer || plan.approver || 'Lâm Quang Thịnh');
      setCurrentReviewerRole(plan.reviewerRole || plan.approverRole || 'Acting Marketing Manager');
    }
  }, [plan]);

  if (!isOpen || !plan) return null;

  const isApproved = plan.status === 'approved';
  const dependentTasks = tasks.filter(t => t.masterPlanId === plan.id || plan.dependentTaskIds?.includes(t.id));

  const handleChangeCreator = (member) => {
    setCurrentCreator(member.name);
    setCurrentCreatorRole(member.role);
    if (onUpdatePlan) {
      onUpdatePlan({
        ...plan,
        creator: member.name,
        creatorRole: member.role
      });
    }
    if (showToast) {
      showToast(`Đã chuyển người lập kế hoạch thành: ${member.name}`);
    }
  };

  const handleChangeReviewer = (member) => {
    setCurrentReviewer(member.name);
    setCurrentReviewerRole(member.role);
    if (onUpdatePlan) {
      onUpdatePlan({
        ...plan,
        reviewer: member.name,
        reviewerRole: member.role,
        approver: member.name,
        approverRole: member.role
      });
    }
    if (showToast) {
      showToast(`Đã chuyển cấp phê duyệt cho: ${member.name} (${member.role})`);
    }
  };

  const handleApprove = () => {
    setIsProcessing(true);
    setTimeout(() => {
      onApprovePlan(plan.id, currentReviewer);
      setIsProcessing(false);
      onClose();
    }, 400);
  };

  const handleRequestRevision = () => {
    if (!revisionNote.trim()) {
      alert("Vui lòng nhập nội dung cần chỉnh sửa cho team!");
      return;
    }
    if (onRejectPlan) {
      onRejectPlan(plan.id, revisionNote);
    }
    if (showToast) {
      showToast(`📝 Đã gửi yêu cầu chỉnh sửa Master Plan tới ${currentCreator}!`);
    }
    setShowRevisionInput(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex justify-end">
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
      />

      {/* Slide-over Panel from right */}
      <div 
        className="relative w-full max-w-xl bg-white shadow-2xl z-50 flex flex-col h-full animate-in slide-in-from-right duration-300 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header - Dark Slate/Navy */}
        <div className="p-5 sm:px-6 bg-[#1E293B] border-b border-slate-800 text-white flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 flex items-center justify-center shadow-xs">
              <Sparkles className="w-5 h-5 text-indigo-300" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="font-bold text-white text-base tracking-tight">
                  Phê Duyệt Kế Hoạch Chiến Dịch
                </h3>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                  isApproved 
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' 
                    : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                }`}>
                  {isApproved ? 'Đã Phê Duyệt' : 'Chờ Sếp Duyệt'}
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Thẩm định chiến lược tổng thể và mở khóa tài nguyên thực thi
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

        {/* Scrollable Content Body */}
        <div className="p-5 sm:p-6 space-y-5 overflow-y-auto flex-1 bg-[#F9FAFB] text-slate-800 text-xs">
          
          {/* KHỐI 1: TIÊU ĐỀ MASTER PLAN & NGƯỜI LẬP/DUYỆT */}
          <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/90 shadow-sm space-y-3 border-l-4 border-l-indigo-600">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200 uppercase tracking-wide">
                🚀 Master Campaign Plan
              </span>
              <span className="text-[11px] text-slate-400 font-medium">
                Khởi tạo: {plan.createdAt || 'Hôm nay'}
              </span>
            </div>

            <h2 className="text-base sm:text-lg font-black text-slate-900 tracking-tight leading-snug">
              {plan.title}
            </h2>

            {/* Thông tin Người lập & Người duyệt (Interactive Dynamic UserSelector) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-slate-100 text-xs">
              <div>
                <UserSelector
                  label="Người lập (Owner):"
                  user={{ name: currentCreator, role: currentCreatorRole }}
                  teamMembers={teamMembers}
                  onSelect={handleChangeCreator}
                  variant="card"
                  disabled={isApproved}
                />
              </div>
              <div>
                <UserSelector
                  label="Người duyệt (Approver):"
                  user={{ name: currentReviewer, role: currentReviewerRole, isApprover: true }}
                  teamMembers={teamMembers}
                  onSelect={handleChangeReviewer}
                  filterType="approvers"
                  variant="card"
                  disabled={isApproved}
                />
              </div>
            </div>
          </div>

          {/* KHỐI 2: 3 CHỈ SỐ CỐT LÕI (KEY METRICS) */}
          <div className="grid grid-cols-3 gap-2.5 text-center">
            <div className="p-3 bg-white rounded-xl border border-slate-200/80 shadow-2xs space-y-1">
              <span className="text-[10px] text-slate-400 font-semibold uppercase flex items-center justify-center">
                <Calendar className="w-3 h-3 mr-1 text-indigo-500" /> Timeline
              </span>
              <div className="font-bold text-slate-900 text-xs sm:text-sm">
                {plan.timeline?.split('(')[0] || '01/10 - 31/10'}
              </div>
              <span className="text-[10px] text-indigo-600 font-medium bg-indigo-50 px-1.5 py-0.2 rounded-md">
                {plan.timelineDays || 31} ngày
              </span>
            </div>

            <div className="p-3 bg-white rounded-xl border border-slate-200/80 shadow-2xs space-y-1">
              <span className="text-[10px] text-slate-400 font-semibold uppercase flex items-center justify-center">
                <Target className="w-3 h-3 mr-1 text-emerald-500" /> Target KPI
              </span>
              <div className="font-black text-emerald-700 text-sm sm:text-base">
                {plan.targetKpi || '50 SQLs'}
              </div>
              <span className="text-[10px] text-emerald-600 font-medium bg-emerald-50 px-1.5 py-0.2 rounded-md">
                Chất lượng cao
              </span>
            </div>

            <div className="p-3 bg-white rounded-xl border border-slate-200/80 shadow-2xs space-y-1">
              <span className="text-[10px] text-slate-400 font-semibold uppercase flex items-center justify-center">
                <DollarSign className="w-3 h-3 mr-1 text-purple-500" /> Ngân Sách
              </span>
              <div className="font-black text-slate-900 text-sm sm:text-base">
                {plan.budget || '$1,200'}
              </div>
              <span className="text-[10px] text-purple-600 font-medium bg-purple-50 px-1.5 py-0.2 rounded-md">
                Meta + Google
              </span>
            </div>
          </div>

          {/* KHỐI 3: KEY MESSAGE (THÔNG ĐIỆP CHÍNH) */}
          <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-sm space-y-1.5">
            <div className="flex items-center space-x-1.5 text-xs font-bold text-slate-800 uppercase tracking-wider">
              <MessageSquare className="w-3.5 h-3.5 text-indigo-600" />
              <span>Key Message (Thông Điệp Chiến Lược)</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 font-medium text-xs sm:text-sm leading-relaxed italic">
              "{plan.keyMessage || 'Tăng tốc Website NVMe - Chống nghẽn cổ chai mùa cao điểm'}"
            </div>
            <p className="text-[11px] text-slate-500 pt-0.5 leading-relaxed">
              Thông điệp giải quyết trực diện rủi ro sập web, nghẽn đơn hàng của các doanh nghiệp và e-commerce trong mùa cao điểm quý 4.
            </p>
          </div>

          {/* KHỐI 4: CẤU TRÚC 2 SUB-CAMPAIGNS */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-800 flex items-center space-x-1.5 uppercase tracking-wider">
                <Layers className="w-3.5 h-3.5 text-indigo-600" />
                <span>Cấu Trúc 2 Nhánh Chiến Dịch Con</span>
              </span>
              <span className="text-[11px] font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full border border-indigo-150">
                Tỷ trọng 60% / 40%
              </span>
            </div>

            <div className="space-y-2.5">
              {/* Camp 1 */}
              <div className="p-3.5 rounded-xl bg-gradient-to-br from-indigo-50/70 to-purple-50/40 border border-indigo-150 space-y-1.5 shadow-2xs">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white text-indigo-700 border border-indigo-100 uppercase tracking-wide">
                    Camp 1 (Teasing/Phủ)
                  </span>
                  <span className="text-xs font-black text-indigo-900 bg-indigo-100/90 px-2 py-0.5 rounded-md">
                    60% KPI • 30 SQLs • $720
                  </span>
                </div>
                <h4 className="text-xs font-bold text-slate-900">
                  "{plan.subCampaigns?.[0]?.title || 'Giới thiệu hạ tầng NVMe'}"
                </h4>
                <p className="text-[11px] text-slate-600 leading-relaxed">
                  {plan.subCampaigns?.[0]?.description || 'Phủ nhận thức tệp khách hàng tiềm năng mới, truyền thông điểm mạnh công nghệ NVMe và Uptime 99.99%.'}
                </p>
              </div>

              {/* Camp 2 */}
              <div className="p-3.5 rounded-xl bg-gradient-to-br from-purple-50/70 to-blue-50/40 border border-purple-150 space-y-1.5 shadow-2xs">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white text-purple-700 border border-purple-100 uppercase tracking-wide">
                    Camp 2 (Retargeting/Chốt deal)
                  </span>
                  <span className="text-xs font-black text-purple-900 bg-purple-100/90 px-2 py-0.5 rounded-md">
                    40% KPI • 20 SQLs • $480
                  </span>
                </div>
                <h4 className="text-xs font-bold text-slate-900">
                  "{plan.subCampaigns?.[1]?.title || 'Promo tặng thêm tháng sử dụng'}"
                </h4>
                <p className="text-[11px] text-slate-600 leading-relaxed">
                  {plan.subCampaigns?.[1]?.description || 'Bám đuổi tệp ghé thăm web chưa điền form, thôi thúc ký hợp đồng trong tháng với ưu đãi tặng tháng.'}
                </p>
              </div>
            </div>
          </div>

          {/* KHỐI 5: DANH SÁCH TASK CON PHỤ THUỘC (DEPENDENCY LOCK STATUS) */}
          <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-800 flex items-center space-x-1.5 uppercase tracking-wider">
                {isApproved ? (
                  <Unlock className="w-3.5 h-3.5 text-emerald-600" />
                ) : (
                  <Lock className="w-3.5 h-3.5 text-amber-600" />
                )}
                <span>Danh Sách Task Con Phụ Thuộc ({dependentTasks.length})</span>
              </span>

              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                isApproved 
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-200' 
                  : 'bg-amber-50 text-amber-700 border-amber-200 animate-pulse'
              }`}>
                {isApproved ? 'Đã mở khóa chạy' : 'Đang khóa chờ duyệt'}
              </span>
            </div>

            <p className="text-[11px] text-slate-500 leading-relaxed">
              {isApproved 
                ? 'Kế hoạch đã được phê duyệt. Team Content và Design đang triển khai thực tế.'
                : `Để đảm bảo tính nhất quán chiến lược, team sẽ chưa bắt đầu cho đến khi ${currentReviewer} phê duyệt Master Plan này.`
              }
            </p>

            <div className="space-y-2">
              {dependentTasks.map(task => (
                <div 
                  key={task.id}
                  className={`p-3 rounded-xl border flex items-center justify-between gap-2 transition-all ${
                    isApproved 
                      ? 'bg-slate-50/80 border-slate-200' 
                      : 'bg-amber-50/30 border-amber-200/80'
                  }`}
                >
                  <div className="space-y-0.5 min-w-0">
                    <div className="flex items-center space-x-2">
                      <span className="font-semibold text-slate-900 truncate">{task.title}</span>
                      <span className="text-[10px] font-medium bg-white px-2 py-0.2 rounded-full border border-slate-200 shrink-0">
                        {task.team}
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-500">
                      Phụ trách: <strong className="text-slate-700 font-semibold">{task.assignee}</strong> ({task.assigneeRole}) • Hạn: {task.deadline}
                    </div>
                  </div>

                  <div className="shrink-0">
                    {isApproved ? (
                      <span className="inline-flex items-center text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                        <CheckCircle2 className="w-3 h-3 mr-1 text-emerald-600" />
                        Đã mở khóa
                      </span>
                    ) : (
                      <span className="inline-flex items-center text-[10px] font-bold text-amber-800 bg-amber-100/80 px-2 py-0.5 rounded-md border border-amber-200">
                        <Lock className="w-3 h-3 mr-1 text-amber-700" />
                        Đang khóa
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Ô nhập yêu cầu sửa (nếu bấm nút Yêu cầu sửa) */}
          {showRevisionInput && (
            <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200 space-y-2.5 animate-in fade-in duration-200">
              <label className="text-xs font-bold text-amber-900 flex items-center">
                <AlertCircle className="w-3.5 h-3.5 mr-1 text-amber-600" />
                Ghi chú yêu cầu chỉnh sửa cho {plan.creator}:
              </label>
              <textarea
                rows={3}
                value={revisionNote}
                onChange={(e) => setRevisionNote(e.target.value)}
                placeholder="Ví dụ: Cần tăng tỷ trọng Camp Retargeting lên 50%, bổ sung thêm kịch bản ưu đãi cho khách hàng chuyển từ hosting cũ..."
                className="w-full p-2.5 text-xs bg-white rounded-xl border border-amber-300 focus:outline-none focus:border-amber-500 text-slate-900 leading-relaxed font-medium"
              />
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowRevisionInput(false)}
                  className="px-3 py-1.5 rounded-lg text-xs text-slate-600 hover:bg-slate-100 font-medium"
                >
                  Hủy
                </button>
                <button
                  type="button"
                  onClick={handleRequestRevision}
                  className="px-4 py-1.5 rounded-lg text-xs font-bold text-white bg-amber-600 hover:bg-amber-700 transition-colors shadow-xs flex items-center space-x-1"
                >
                  <Send className="w-3 h-3 mr-1" />
                  <span>Gửi Phản Hồi</span>
                </button>
              </div>
            </div>
          )}

        </div>

        {/* Footer Actions (Sếp phê duyệt 1-click) */}
        <div className="p-4 sm:px-6 bg-white border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-lg">
          <div className="text-[11px] text-slate-500">
            Người phê duyệt: <strong className="text-slate-800 font-bold">{currentReviewer} ({currentReviewerRole})</strong>
          </div>

          <div className="flex items-center space-x-2.5 self-end sm:self-auto shrink-0">
            {!isApproved && (
              <button
                type="button"
                onClick={() => setShowRevisionInput(!showRevisionInput)}
                className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-700 hover:text-slate-900 bg-white hover:bg-slate-50 border border-slate-300 transition-all cursor-pointer"
              >
                Yêu cầu sửa
              </button>
            )}

            {!isApproved ? (
              <button
                type="button"
                onClick={handleApprove}
                disabled={isProcessing}
                className="inline-flex items-center px-6 py-2.5 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 shadow-md shadow-indigo-200 transition-all hover:scale-102 active:scale-98 cursor-pointer disabled:opacity-50"
              >
                <Unlock className="w-3.5 h-3.5 mr-1.5" />
                <span>{isProcessing ? 'Đang mở khóa...' : 'Duyệt Kế Hoạch & Mở Khóa Task'}</span>
              </button>
            ) : (
              <button
                type="button"
                disabled
                className="inline-flex items-center px-5 py-2.5 rounded-xl text-xs font-bold text-emerald-800 bg-emerald-100 border border-emerald-300 shadow-2xs cursor-default"
              >
                <CheckCircle2 className="w-3.5 h-3.5 mr-1.5 text-emerald-600" />
                <span>Kế Hoạch Đã Được Duyệt</span>
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
