import React, { useState } from 'react';
import { 
  X, 
  Sparkles, 
  UserPlus, 
  Users, 
  Clock, 
  Bell, 
  Check, 
  Trash2, 
  Edit3, 
  Send, 
  MessageSquare, 
  Mail, 
  AtSign, 
  ShieldAlert, 
  HeartHandshake, 
  Briefcase, 
  AlertOctagon,
  CheckCircle2,
  ExternalLink
} from 'lucide-react';

function TeamsLogo({ className = "w-3.5 h-3.5" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.42 7.78a2.12 2.12 0 1 0-2.34-3.52 2.12 2.12 0 0 0 2.34 3.52zM22.5 10.5h-3.62c-.76 0-1.38.62-1.38 1.38v3.62c0 .48.39.88.88.88s.87-.4.87-.88v-2.75h3.25v4.5c0 .41.34.75.75.75s.75-.34.75-.75v-6c0-.41-.34-.75-.75-.75h-.75zM13.5 5.25a3 3 0 1 0-3-3 3 3 0 0 0 3 3zm2.25 4.5h-4.5c-1.24 0-2.25 1.01-2.25 2.25v7.5c0 .83.67 1.5 1.5 1.5h6c.83 0 1.5-.67 1.5-1.5V12c0-1.24-1.01-2.25-2.25-2.25zM6.5 7.5a1.75 1.75 0 1 0-1.75-1.75A1.75 1.75 0 0 0 6.5 7.5zm.75 3.25H3.75A1.75 1.75 0 0 0 2 12.5v4.75c0 .41.34.75.75.75s.75-.34.75-.75V13.5h3.75v3.75c0 .41.34.75.75.75s.75-.34.75-.75v-5a1.75 1.75 0 0 0-1.5-1.5z"/>
    </svg>
  );
}

const ROLE_OPTIONS = ['Content', 'Design', 'Video', 'Web Dev', 'Growth'];
const PLATFORM_OPTIONS = [
  { 
    id: 'Gửi Direct Message qua Teams', 
    label: 'Gửi Direct Message qua Teams', 
    icon: MessageSquare, 
    placeholder: 'Email MS 365 (vd: user@company.com)' 
  },
  { 
    id: 'Mention (@) vào Channel của Team', 
    label: 'Mention (@) vào Channel của Team', 
    icon: AtSign, 
    placeholder: 'Tên Channel Teams (vd: #growth-campaigns)' 
  },
];

export default function TeamManagementModal({
  isOpen,
  onClose,
  teamMembers = [],
  onUpdateTeamMembers,
  showToast
}) {
  // State Khối 1: Form Thêm Nhân Sự Mới
  const [newName, setNewName] = useState('');
  const [newRole, setNewRole] = useState('Content');
  const [newPlatform, setNewPlatform] = useState('Gửi Direct Message qua Teams');
  const [newContact, setNewContact] = useState('');

  // State Khối 2: Cài Đặt AI Follow-up
  const [isAutoReminderOn, setIsAutoReminderOn] = useState(true);
  const [beforeHours1, setBeforeHours1] = useState(24);
  const [beforeHours2, setBeforeHours2] = useState(2);
  const [selectedTone, setSelectedTone] = useState('gentle'); // 'gentle' | 'professional' | 'urgent'

  // State Khối 3: Danh sách nhân sự tạm thời trong modal
  const [roster, setRoster] = useState(teamMembers);

  // Đồng bộ khi teamMembers thay đổi từ prop
  React.useEffect(() => {
    setRoster(teamMembers);
  }, [teamMembers]);

  if (!isOpen) return null;

  // Lấy avatar viết tắt (2 ký tự)
  const getInitials = (name) => {
    if (!name) return 'TM';
    const parts = name.trim().split(' ');
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  // Lấy màu avatar theo role
  const getRoleBadgeStyle = (role) => {
    switch (role) {
      case 'Content':
        return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'Design':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'Video':
        return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'Web Dev':
        return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      case 'Growth':
        return 'bg-indigo-100 text-indigo-700 border-indigo-200';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  const getAvatarBg = (role) => {
    switch (role) {
      case 'Content': return 'bg-purple-600';
      case 'Design': return 'bg-blue-600';
      case 'Video': return 'bg-amber-600';
      case 'Web Dev': return 'bg-emerald-600';
      case 'Growth': return 'bg-indigo-600';
      default: return 'bg-slate-700';
    }
  };

  // Preview câu văn mẫu theo tone
  const getGeminiPreviewText = () => {
    switch (selectedTone) {
      case 'gentle':
        return "Chào Hoàng Minh Khôi, campaign Mắt Bão sắp đến hạn rồi, bạn ráng chốt hoàn thiện ad copy trước 5h chiều nay nhé! Có khó khăn gì cứ nhắn team hỗ trợ nha ❤️";
      case 'professional':
        return "Thông báo tiến độ: Task Banner Carousel thuộc chiến dịch Mắt Bão sẽ đến hạn trong 2 giờ tới. Đề nghị upload asset hoàn thiện lên hệ thống trước 17:00.";
      case 'urgent':
        return "🚨 CẢNH BÁO DEADLINE: Task Banner Carousel đang trễ hạn kiểm duyệt 2 giờ. Chiến dịch có nguy cơ bị hoãn on-air. Vui lòng upload asset và kiểm tra ngay!";
      default:
        return "";
    }
  };

  // Handler: Thêm nhân sự mới vào danh sách
  const handleAddMember = (e) => {
    e.preventDefault();
    if (!newName.trim()) {
      alert('Vui lòng nhập tên hoặc bí danh của nhân sự');
      return;
    }

    const newMember = {
      id: 'mem-' + Date.now(),
      name: newName.trim(),
      role: newRole,
      platform: newPlatform,
      contact: newContact.trim() || 'Chưa cập nhật',
      autoReminder: true
    };

    const updated = [newMember, ...roster];
    setRoster(updated);
    setNewName('');
    setNewContact('');

    if (showToast) {
      showToast(`Đã thêm thành viên "${newMember.name}" vào danh sách!`);
    }
  };

  // Handler: Xóa nhân sự
  const handleDeleteMember = (id, name) => {
    const updated = roster.filter(m => m.id !== id);
    setRoster(updated);
    if (showToast) {
      showToast(`Đã xóa "${name}" khỏi danh sách team.`);
    }
  };

  // Handler: Toggle Auto-Reminder cho 1 nhân sự
  const handleToggleMemberReminder = (id) => {
    const updated = roster.map(m => {
      if (m.id === id) {
        return { ...m, autoReminder: !m.autoReminder };
      }
      return m;
    });
    setRoster(updated);
  };

  // Handler: Lưu cấu hình toàn bộ modal
  const handleSaveAll = () => {
    onUpdateTeamMembers(roster);
    if (showToast) {
      showToast(`✨ Đã lưu thành công cấu hình Team & Tự động nhắc việc!`);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
      />

      {/* Modal Container (~750px - 800px) */}
      <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-slate-200/80 overflow-hidden flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-200">
        
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/80">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-2xl bg-indigo-100 text-indigo-700 shadow-2xs">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="font-bold text-slate-900 text-base">
                  Quản lý Team & Tự động nhắc việc
                </h3>
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-50 text-indigo-700 border border-indigo-200">
                  <Sparkles className="w-3 h-3 mr-1 text-indigo-600" />
                  Tự Động Follow-up
                </span>
              </div>
              <p className="text-xs text-slate-500">
                Tùy biến nhân sự phụ trách và thiết lập phong cách tự động nhắc hạn deadline
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-200/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body (Cuộn mượt) */}
        <div className="p-6 space-y-6 overflow-y-auto flex-1">

          {/* KHỐI 1: THÊM NHÂN SỰ MỚI (ADD NEW MEMBER) - VIỀN NÉT ĐỨT INLINE */}
          <div className="border-2 border-dashed border-indigo-200/90 bg-indigo-50/20 rounded-3xl p-4 space-y-3.5">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-950 flex items-center">
                <UserPlus className="w-4 h-4 mr-1.5 text-indigo-600" />
                Thêm Nhân Sự Mới (Add Member)
              </h4>
              <span className="text-[11px] text-slate-400">
                Nhập tên linh hoạt (VD: Hoàng Minh Khôi, Nguyễn Ngọc Khánh...)
              </span>
            </div>

            <form onSubmit={handleAddMember} className="space-y-3">
              {/* Hàng 1: Tên nhân sự & Kênh nhận thông báo (Dàn hàng ngang inline) */}
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-2.5">
                
                {/* Tên nhân sự (6 cols) */}
                <div className="sm:col-span-5">
                  <input
                    type="text"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    placeholder="Tên nhân sự (VD: Hoàng Minh Khôi, Võ Thị Thu Hiền...)"
                    className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-slate-800 placeholder-slate-400 bg-white"
                  />
                </div>

                {/* Dropdown Kênh thông báo (3 cols) */}
                <div className="sm:col-span-3">
                  <select
                    value={newPlatform}
                    onChange={(e) => setNewPlatform(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-slate-800 bg-white font-medium"
                  >
                    {PLATFORM_OPTIONS.map(p => (
                      <option key={p.id} value={p.id}>{p.label}</option>
                    ))}
                  </select>
                </div>

                {/* ID / Email (4 cols) */}
                <div className="sm:col-span-4">
                  <input
                    type="text"
                    value={newContact}
                    onChange={(e) => setNewContact(e.target.value)}
                    placeholder={PLATFORM_OPTIONS.find(p => p.id === newPlatform)?.placeholder || 'ID liên hệ'}
                    className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-slate-800 placeholder-slate-400 bg-white"
                  />
                </div>

              </div>

              {/* Hàng 2: Chọn Vai trò (Role chips) và Nút "+ Thêm Nhân Sự" */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
                <div className="flex items-center space-x-1.5 flex-wrap gap-y-1">
                  <span className="text-[11px] font-bold text-slate-500 mr-1">Vai trò:</span>
                  {ROLE_OPTIONS.map(role => (
                    <button
                      type="button"
                      key={role}
                      onClick={() => setNewRole(role)}
                      className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                        newRole === role
                          ? 'bg-indigo-600 text-white shadow-2xs'
                          : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      {role}
                    </button>
                  ))}
                </div>

                <button
                  type="submit"
                  className="inline-flex items-center justify-center px-4 py-1.5 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-full transition-all shadow-2xs shrink-0"
                >
                  <UserPlus className="w-3.5 h-3.5 mr-1.5" />
                  <span>+ Thêm Nhân Sự</span>
                </button>
              </div>

            </form>
          </div>

          {/* KHỐI 2: CÀI ĐẶT TỰ ĐỘNG GIỤC DEADLINE (AUTOMATED FOLLOW-UP) - PASTEL ACCENT */}
          <div className="bg-gradient-to-br from-purple-50/70 via-indigo-50/70 to-blue-50/70 border border-indigo-200/70 rounded-3xl p-5 space-y-4 shadow-2xs">
            
            {/* Header Khối 2 kèm Toggle Switch đổi màu */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2.5">
                <div className="p-2 rounded-xl bg-indigo-600 text-white shadow-xs">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-indigo-950">
                    Cài đặt Tự Động Giục Deadline (Automated Follow-up)
                  </h4>
                  <p className="text-[11px] text-indigo-700">
                    Hệ thống tự động soạn văn phong phù hợp và gửi nhắc nhở qua kênh làm việc
                  </p>
                </div>
              </div>

              {/* Toggle Switch */}
              <button
                type="button"
                onClick={() => setIsAutoReminderOn(!isAutoReminderOn)}
                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                  isAutoReminderOn ? 'bg-indigo-600' : 'bg-slate-300'
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out ${
                    isAutoReminderOn ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            {isAutoReminderOn && (
              <div className="space-y-3.5 pt-1 animate-in fade-in duration-200">
                
                {/* Mốc thời gian ping */}
                <div className="flex items-center space-x-2 text-xs text-slate-700 bg-white/80 p-3 rounded-2xl border border-indigo-100/80 flex-wrap gap-y-2">
                  <Clock className="w-4 h-4 text-indigo-600 shrink-0" />
                  <span>Tự động ping nhắc nhở trước</span>
                  <input
                    type="number"
                    value={beforeHours1}
                    onChange={(e) => setBeforeHours1(Number(e.target.value))}
                    className="w-12 text-center py-0.5 text-xs font-bold border border-slate-200 rounded-lg bg-white"
                  />
                  <span>giờ và trước</span>
                  <input
                    type="number"
                    value={beforeHours2}
                    onChange={(e) => setBeforeHours2(Number(e.target.value))}
                    className="w-10 text-center py-0.5 text-xs font-bold border border-slate-200 rounded-lg bg-white"
                  />
                  <span>giờ khi đến hạn.</span>
                </div>

                {/* Văn phong nhắc việc Tone of Voice */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-indigo-950 uppercase tracking-wider flex items-center">
                      <Sparkles className="w-3.5 h-3.5 mr-1 text-indigo-600" />
                      Văn Phong Nhắc Việc Tự Động (Tone of Voice):
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {/* Tone 1: Nhẹ nhàng, cổ vũ */}
                    <button
                      type="button"
                      onClick={() => setSelectedTone('gentle')}
                      className={`p-2.5 rounded-2xl text-left border transition-all flex items-center space-x-2 ${
                        selectedTone === 'gentle'
                          ? 'bg-white border-indigo-500 shadow-2xs ring-1 ring-indigo-500'
                          : 'bg-white/60 border-slate-200/80 hover:bg-white'
                      }`}
                    >
                      <span className="text-base">🌸</span>
                      <div>
                        <span className="block text-xs font-bold text-slate-900">Nhẹ nhàng, cổ vũ</span>
                        <span className="block text-[10px] text-slate-500">Động viên, thân thiện</span>
                      </div>
                    </button>

                    {/* Tone 2: Chuyên nghiệp, ngắn gọn */}
                    <button
                      type="button"
                      onClick={() => setSelectedTone('professional')}
                      className={`p-2.5 rounded-2xl text-left border transition-all flex items-center space-x-2 ${
                        selectedTone === 'professional'
                          ? 'bg-white border-indigo-500 shadow-2xs ring-1 ring-indigo-500'
                          : 'bg-white/60 border-slate-200/80 hover:bg-white'
                      }`}
                    >
                      <span className="text-base">💼</span>
                      <div>
                        <span className="block text-xs font-bold text-slate-900">Chuyên nghiệp</span>
                        <span className="block text-[10px] text-slate-500">Ngắn gọn, chuẩn chỉ</span>
                      </div>
                    </button>

                    {/* Tone 3: Báo động đỏ (Khẩn cấp) */}
                    <button
                      type="button"
                      onClick={() => setSelectedTone('urgent')}
                      className={`p-2.5 rounded-2xl text-left border transition-all flex items-center space-x-2 ${
                        selectedTone === 'urgent'
                          ? 'bg-white border-rose-500 shadow-2xs ring-1 ring-rose-500'
                          : 'bg-white/60 border-slate-200/80 hover:bg-white'
                      }`}
                    >
                      <span className="text-base">🚨</span>
                      <div>
                        <span className="block text-xs font-bold text-rose-700">Báo động đỏ</span>
                        <span className="block text-[10px] text-slate-500">Khẩn cấp, dứt khoát</span>
                      </div>
                    </button>
                  </div>

                  {/* ✨ Khung Preview Tin Nhắn Nhắc Việc - Mô Phỏng MS Teams Adaptive Card */}
                  <div className="space-y-1.5 animate-in fade-in duration-200">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider flex items-center">
                        <TeamsLogo className="w-3.5 h-3.5 mr-1 text-[#6264A7]" />
                        Mô phỏng MS Teams Adaptive Card:
                      </span>
                      <span className="text-[10px] font-semibold text-[#6264A7] bg-[#6264A7]/10 px-2 py-0.5 rounded-md">
                        Teams Graph API v1.4
                      </span>
                    </div>

                    {/* Outer Teams Message Container */}
                    <div className="bg-[#F5F5F7] p-3 rounded-2xl border border-slate-200/70">
                      
                      {/* Bot Header Line */}
                      <div className="flex items-center space-x-2 mb-2 pb-2 border-b border-slate-200/60">
                        <div className="w-6 h-6 rounded-lg bg-[#6264A7] text-white flex items-center justify-center text-[10px] font-black shadow-2xs">
                          GL
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-1.5">
                            <span className="text-xs font-bold text-slate-900">Growth Loop Bot</span>
                            <span className="text-[9px] font-semibold bg-slate-200 text-slate-600 px-1.5 py-0.2 rounded">BOT</span>
                          </div>
                          <span className="text-[10px] text-slate-400">Hôm nay lúc 16:30</span>
                        </div>
                      </div>

                      {/* Adaptive Card Component */}
                      <div className="bg-white rounded-xl border border-slate-200 shadow-2xs overflow-hidden border-l-4 border-l-[#6264A7]">
                        <div className="p-3.5 space-y-3">
                          
                          {/* Card Title & Badge */}
                          <div className="flex items-start justify-between gap-2">
                            <div className="space-y-0.5">
                              <h5 className="text-xs font-bold text-slate-900 flex items-center">
                                <span>🔔 NHẮC HẠN TASK CHIẾN DỊCH</span>
                              </h5>
                              <p className="text-[11px] text-slate-500 font-medium">
                                Task: <strong className="text-slate-800">Banner Carousel & Headline Test</strong>
                              </p>
                            </div>
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0 ${
                              selectedTone === 'urgent' 
                                ? 'bg-rose-50 text-rose-700 border border-rose-200' 
                                : selectedTone === 'professional'
                                ? 'bg-amber-50 text-amber-700 border border-amber-200'
                                : 'bg-indigo-50 text-indigo-700 border border-indigo-200'
                            }`}>
                              {selectedTone === 'urgent' ? '🚨 Trễ hạn' : '⏳ Sắp đến hạn'}
                            </span>
                          </div>

                          {/* FactSet Table */}
                          <div className="bg-slate-50/80 rounded-lg p-2.5 grid grid-cols-2 gap-2 text-[11px] border border-slate-100">
                            <div>
                              <span className="text-slate-400 block text-[10px] font-medium uppercase">Sản phẩm / Brand</span>
                              <span className="font-semibold text-slate-800">Mắt Bão (Cloud Hosting)</span>
                            </div>
                            <div>
                              <span className="text-slate-400 block text-[10px] font-medium uppercase">Người phụ trách</span>
                              <span className="font-semibold text-indigo-700">@Hoàng Minh Khôi</span>
                            </div>
                            <div>
                              <span className="text-slate-400 block text-[10px] font-medium uppercase">Hạn chót (Deadline)</span>
                              <span className="font-semibold text-rose-600">Hôm nay, 17:00</span>
                            </div>
                            <div>
                              <span className="text-slate-400 block text-[10px] font-medium uppercase">Kênh thông báo</span>
                              <span className="font-semibold text-slate-700">Teams Direct Message</span>
                            </div>
                          </div>

                          {/* Message Content (Tone of voice) */}
                          <div className="text-xs text-slate-700 bg-slate-50 p-2.5 rounded-lg border-l-2 border-indigo-400 leading-relaxed italic">
                            "{getGeminiPreviewText()}"
                          </div>

                          {/* Actions / CTA Buttons */}
                          <div className="pt-1 flex items-center space-x-2">
                            <button
                              type="button"
                              onClick={() => {
                                if (showToast) showToast("🔗 Đã mở chi tiết Task trên Growth Loop!");
                              }}
                              className="flex-1 py-1.5 px-3 bg-[#6264A7] hover:bg-[#525494] text-white rounded-lg text-xs font-bold transition-colors flex items-center justify-center space-x-1.5 cursor-pointer shadow-2xs"
                            >
                              <ExternalLink className="w-3 h-3" />
                              <span>Mở Task</span>
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                if (showToast) showToast("⚡ Đã ghi nhận báo cáo tiến độ task!");
                              }}
                              className="px-3 py-1.5 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 rounded-lg text-xs font-semibold transition-colors cursor-pointer"
                            >
                              Báo Tiến Độ
                            </button>
                          </div>

                        </div>
                      </div>

                    </div>
                  </div>

                </div>

              </div>
            )}

          </div>

          {/* KHỐI 3: DANH SÁCH TEAM HIỆN TẠI (TEAM ROSTER) */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Danh Sách Team Hiện Tại ({roster.length} Thành viên)
              </h4>
              <span className="text-[11px] text-slate-400">
                Có thể bật/tắt nhắc việc cho từng người
              </span>
            </div>

            <div className="rounded-2xl border border-slate-200/80 overflow-hidden divide-y divide-slate-100 max-h-[220px] overflow-y-auto">
              {roster.map(member => (
                <div
                  key={member.id}
                  className="p-3 bg-white hover:bg-slate-50/70 transition-colors flex items-center justify-between gap-3 text-xs"
                >
                  {/* Trái: Avatar + Tên + Role */}
                  <div className="flex items-center space-x-3 min-w-0">
                    <div className={`w-8 h-8 rounded-full ${getAvatarBg(member.role)} text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-2xs`}>
                      {getInitials(member.name)}
                    </div>

                    <div className="min-w-0">
                      <div className="flex items-center space-x-2">
                        <span className="font-bold text-slate-900 truncate">
                          {member.name}
                        </span>
                        <span className={`px-2 py-0.2 rounded-full text-[10px] font-bold border ${getRoleBadgeStyle(member.role)}`}>
                          {member.role}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400 truncate">
                        Kênh: <strong className="text-slate-600">{member.platform}</strong> ({member.contact})
                      </p>
                    </div>
                  </div>

                  {/* Phải: Trạng thái Auto-Reminder & Nút Xóa */}
                  <div className="flex items-center space-x-2.5 shrink-0">
                    <button
                      type="button"
                      onClick={() => handleToggleMemberReminder(member.id)}
                      className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-semibold transition-all ${
                        member.autoReminder
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : 'bg-slate-100 text-slate-400'
                      }`}
                      title="Bật/Tắt gửi thông báo nhắc việc cho nhân sự này"
                    >
                      <Bell className={`w-3 h-3 mr-1 ${member.autoReminder ? 'text-emerald-600' : 'text-slate-400'}`} />
                      <span>{member.autoReminder ? 'Nhắc việc: Bật' : 'Tắt'}</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleDeleteMember(member.id, member.name)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                      title="Xóa nhân sự này"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                </div>
              ))}

              {roster.length === 0 && (
                <div className="p-6 text-center text-xs text-slate-400 italic">
                  Chưa có thành viên nào. Hãy thêm nhân sự ở khối trên.
                </div>
              )}
            </div>

          </div>

        </div>

        {/* KHỐI 4: MODAL FOOTER */}
        <div className="px-6 py-4 border-t border-slate-100 bg-slate-50/80 flex items-center justify-end space-x-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors"
          >
            Hủy bỏ
          </button>

          <button
            type="button"
            onClick={handleSaveAll}
            className="inline-flex items-center px-5 py-2 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-full shadow-sm transition-all"
          >
            <Check className="w-3.5 h-3.5 mr-1.5 text-emerald-400" />
            <span>Lưu Cấu Hình</span>
          </button>
        </div>

      </div>
    </div>
  );
}
