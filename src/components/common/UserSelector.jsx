import React, { useState, useRef, useEffect } from 'react';
import { 
  ChevronDown, 
  Search, 
  Check, 
  UserCheck, 
  ShieldCheck, 
  Sparkles,
  Users
} from 'lucide-react';
import { INITIAL_TEAM_MEMBERS } from '../../data/mockData';

// Helper: Lấy 2 chữ cái đầu làm Avatar viết tắt
export const getUserInitials = (name) => {
  if (!name) return 'U';
  const parts = name.trim().split(' ');
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
};

// Helper: Lấy màu avatar mặc định
export const getUserAvatarBg = (user) => {
  if (user?.avatarColor) return user.avatarColor;
  if (!user) return 'bg-slate-700';
  const role = user.role || user;
  if (/manager|giám đốc|sếp/i.test(role)) return 'bg-indigo-700';
  if (/growth/i.test(role)) return 'bg-emerald-600';
  if (/social|copy|content/i.test(role)) return 'bg-purple-600';
  if (/marketing executive|media|ads/i.test(role)) return 'bg-blue-600';
  if (/seo|search/i.test(role)) return 'bg-teal-600';
  if (/intern/i.test(role)) return 'bg-amber-600';
  return 'bg-slate-700';
};

export default function UserSelector({
  user,
  teamMembers = INITIAL_TEAM_MEMBERS,
  onSelect,
  label = null,
  variant = 'card', // 'card' | 'chip' | 'inline' | 'compact'
  filterType = 'all', // 'all' | 'approvers' | 'staff'
  disabled = false,
  className = ''
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const containerRef = useRef(null);
  const searchInputRef = useRef(null);

  // Chuẩn hóa user hiện tại (hỗ trợ cả object lẫn string name)
  const resolvedUser = React.useMemo(() => {
    if (!user) {
      return teamMembers[0] || { name: 'Chưa gán', role: 'Thành viên' };
    }
    if (typeof user === 'string') {
      const match = teamMembers.find(m => m.name.toLowerCase() === user.toLowerCase());
      if (match) return match;
      return { 
        name: user, 
        role: /thịnh|manager|giám đốc/i.test(user) ? 'Acting Marketing Manager' : 'Marketing' 
      };
    }
    return user;
  }, [user, teamMembers]);

  // Click outside listener để đóng dropdown
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      // Focus vào ô search khi mở
      setTimeout(() => searchInputRef.current?.focus(), 50);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Lọc danh sách nhân sự theo search query và filterType
  const filteredMembers = React.useMemo(() => {
    let list = teamMembers;
    if (filterType === 'approvers') {
      list = teamMembers.filter(m => m.isApprover);
    } else if (filterType === 'staff') {
      list = teamMembers.filter(m => !m.isApprover);
    }

    if (!searchQuery.trim()) return list;

    const q = searchQuery.toLowerCase();
    return list.filter(m => 
      m.name.toLowerCase().includes(q) || 
      (m.role && m.role.toLowerCase().includes(q)) ||
      (m.department && m.department.toLowerCase().includes(q))
    );
  }, [teamMembers, filterType, searchQuery]);

  // Nhóm danh sách theo Ban Giám Đốc vs Team Triển Khai
  const approversList = filteredMembers.filter(m => m.isApprover);
  const staffList = filteredMembers.filter(m => !m.isApprover);

  const handleSelectMember = (member) => {
    if (onSelect) {
      onSelect(member);
    }
    setIsOpen(false);
    setSearchQuery('');
  };

  const initials = resolvedUser.avatar || getUserInitials(resolvedUser.name);
  const avatarBg = getUserAvatarBg(resolvedUser);

  // 1. RENDER VARIANT: CARD (Khối đầy đủ cho Modal & Slide-over)
  if (variant === 'card') {
    return (
      <div className={`relative ${className}`} ref={containerRef}>
        {label && (
          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block mb-1">
            {label}
          </span>
        )}
        <button
          type="button"
          disabled={disabled}
          onClick={() => !disabled && setIsOpen(!isOpen)}
          className={`w-full p-2.5 sm:p-3 rounded-xl border transition-all text-left flex items-center justify-between gap-2.5 group ${
            disabled
              ? 'bg-slate-50 border-slate-200 cursor-not-allowed opacity-75'
              : isOpen
              ? 'bg-indigo-50/60 border-indigo-300 ring-2 ring-indigo-200/50'
              : 'bg-white hover:bg-slate-50 border-slate-200/90 hover:border-slate-300 shadow-2xs cursor-pointer'
          }`}
        >
          <div className="flex items-center space-x-2.5 min-w-0">
            <div className={`w-8 h-8 rounded-full ${avatarBg} text-white font-bold text-xs flex items-center justify-center shrink-0 shadow-2xs`}>
              {initials}
            </div>
            <div className="min-w-0">
              <div className="font-bold text-xs sm:text-sm text-slate-900 truncate group-hover:text-indigo-950 flex items-center">
                <span>{resolvedUser.name}</span>
                {resolvedUser.isApprover && (
                  <ShieldCheck className="w-3 h-3 ml-1 text-indigo-600 shrink-0" />
                )}
              </div>
              <div className="text-[11px] text-slate-500 truncate font-normal">
                {resolvedUser.role || resolvedUser.department || 'Thành viên'}
              </div>
            </div>
          </div>

          {!disabled && (
            <div className="p-1 rounded-lg text-slate-400 group-hover:text-indigo-600 group-hover:bg-slate-100 transition-colors shrink-0">
              <ChevronDown className={`w-3.5 h-3.5 transform transition-transform ${isOpen ? 'rotate-180 text-indigo-600' : ''}`} />
            </div>
          )}
        </button>

        {isOpen && renderDropdownPopover()}
      </div>
    );
  }

  // 2. RENDER VARIANT: NAV (Dành riêng cho thanh Header thanh lịch tối màu)
  if (variant === 'nav') {
    return (
      <div className={`relative inline-block ${className}`} ref={containerRef}>
        <button
          type="button"
          disabled={disabled}
          onClick={() => !disabled && setIsOpen(!isOpen)}
          className={`inline-flex items-center space-x-2 px-2.5 sm:px-3 py-1.5 rounded-full border transition-all text-left cursor-pointer group ${
            isOpen 
              ? 'bg-slate-800 border-indigo-400 text-white ring-1 ring-indigo-400' 
              : 'bg-slate-800/80 hover:bg-slate-750 border-slate-700 text-slate-200 hover:text-white shadow-xs'
          }`}
          title={`Đang đăng nhập: ${resolvedUser.name} (${resolvedUser.role}). Bấm để đổi tài khoản.`}
        >
          <div className={`w-5 h-5 rounded-full ${avatarBg} text-white font-bold text-[9px] flex items-center justify-center shrink-0 shadow-2xs`}>
            {initials}
          </div>
          <div className="min-w-0 text-left hidden sm:block">
            <span className="font-bold text-xs text-white block truncate leading-tight group-hover:text-indigo-200">
              {resolvedUser.name}
            </span>
            <span className="text-[9px] text-slate-400 block truncate leading-tight">
              {resolvedUser.role || 'Member'}
            </span>
          </div>
          <ChevronDown className={`w-3 h-3 text-slate-400 group-hover:text-indigo-300 transition-transform shrink-0 ${isOpen ? 'rotate-180 text-indigo-400' : ''}`} />
        </button>

        {isOpen && renderDropdownPopover()}
      </div>
    );
  }

  // 3. RENDER VARIANT: CHIP (Thẻ vừa cho Epic Card & Headers)
  if (variant === 'chip') {
    return (
      <div className={`relative inline-block ${className}`} ref={containerRef}>
        <button
          type="button"
          disabled={disabled}
          onClick={() => !disabled && setIsOpen(!isOpen)}
          className={`inline-flex items-center space-x-2 px-2.5 py-1.5 rounded-xl border transition-all text-left group ${
            disabled
              ? 'bg-slate-50 border-slate-200 cursor-not-allowed'
              : isOpen
              ? 'bg-indigo-50 border-indigo-300'
              : 'bg-white hover:bg-slate-100/80 border-slate-200/80 hover:border-slate-300 shadow-2xs cursor-pointer'
          }`}
          title={label ? `${label}: ${resolvedUser.name}` : resolvedUser.name}
        >
          <div className={`w-6 h-6 rounded-full ${avatarBg} text-white font-bold text-[10px] flex items-center justify-center shrink-0`}>
            {initials}
          </div>
          <div className="min-w-0 text-left">
            <span className="font-bold text-xs text-slate-900 block truncate leading-tight group-hover:text-indigo-950">
              {resolvedUser.name}
            </span>
            <span className="text-[10px] text-slate-400 block truncate leading-tight">
              {resolvedUser.role || 'Member'}
            </span>
          </div>
          {!disabled && (
            <ChevronDown className={`w-3 h-3 text-slate-400 group-hover:text-indigo-600 transition-transform shrink-0 ${isOpen ? 'rotate-180' : ''}`} />
          )}
        </button>

        {isOpen && renderDropdownPopover()}
      </div>
    );
  }

  // 3. RENDER VARIANT: INLINE / COMPACT (Gọn gàng cho Kanban Card & Tables)
  return (
    <div className={`relative inline-block ${className}`} ref={containerRef}>
      <button
        type="button"
        disabled={disabled}
        onClick={(e) => {
          e.stopPropagation();
          if (!disabled) setIsOpen(!isOpen);
        }}
        className={`inline-flex items-center space-x-2 px-2.5 py-1.5 rounded-xl transition-all group text-left ${
          disabled
            ? 'opacity-75 cursor-not-allowed'
            : isOpen
            ? 'bg-indigo-50 ring-1 ring-indigo-300'
            : 'hover:bg-slate-100 cursor-pointer'
        }`}
        title={`Phụ trách: ${resolvedUser.name} (${resolvedUser.role || 'Member'}). Bấm để chuyển giao.`}
      >
        <div className={`w-7 h-7 rounded-full ${avatarBg} text-white font-bold text-[10px] flex items-center justify-center shrink-0 shadow-2xs`}>
          {initials}
        </div>
        <div className="min-w-0 text-left">
          <span className="font-bold text-slate-800 text-xs truncate block group-hover:text-indigo-950 leading-tight">
            {resolvedUser.name}
          </span>
          <span className="text-[10px] text-slate-400 truncate block leading-tight mt-0.5">
            {resolvedUser.role || 'Marketing'}
          </span>
        </div>
        {!disabled && (
          <ChevronDown className={`w-3 h-3 text-slate-400 group-hover:text-indigo-600 shrink-0 ml-0.5 ${isOpen ? 'rotate-180' : ''}`} />
        )}
      </button>

      {isOpen && renderDropdownPopover()}
    </div>
  );

  // Helper render dropdown popover
  function renderDropdownPopover() {
    return (
      <div 
        className="absolute left-0 top-full mt-1.5 z-50 w-72 sm:w-80 bg-white rounded-2xl shadow-2xl border border-slate-200/90 overflow-hidden animate-in fade-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Thanh tìm kiếm nhanh nhân sự */}
        <div className="p-2.5 border-b border-slate-100 bg-slate-50/70">
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              ref={searchInputRef}
              type="text"
              placeholder="Tìm theo tên, chức vụ, bộ phận..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 text-xs bg-white rounded-xl border border-slate-200 focus:outline-none focus:border-indigo-500 text-slate-800 placeholder-slate-400 shadow-2xs"
            />
          </div>
        </div>

        {/* Danh sách phân nhóm nhân sự */}
        <div className="max-h-64 overflow-y-auto p-1.5 space-y-2 text-xs">
          
          {/* Nhóm 1: Quản Lý Phê Duyệt (Approver) */}
          {approversList.length > 0 && (
            <div>
              <div className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-indigo-700 flex items-center space-x-1">
                <ShieldCheck className="w-3 h-3 text-indigo-600" />
                <span>Quản Lý Phê Duyệt (Approver)</span>
              </div>
              <div className="space-y-0.5">
                {approversList.map(member => renderMemberItem(member))}
              </div>
            </div>
          )}

          {/* Nhóm 2: Đội Ngũ Thực Thi (Marketing Staff / Owners) */}
          {staffList.length > 0 && (
            <div>
              <div className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center space-x-1">
                <Users className="w-3 h-3 text-slate-400" />
                <span>Đội Ngũ Thực Thi (Marketing Team)</span>
              </div>
              <div className="space-y-0.5">
                {staffList.map(member => renderMemberItem(member))}
              </div>
            </div>
          )}

          {filteredMembers.length === 0 && (
            <div className="p-4 text-center text-xs text-slate-400">
              Không tìm thấy nhân sự phù hợp
            </div>
          )}
        </div>

        {/* Footer ghi chú nhỏ */}
        <div className="px-3 py-2 bg-slate-50 border-t border-slate-100 text-[10px] text-slate-400 flex items-center justify-between">
          <span>Multi-user Workspace</span>
          <span className="text-indigo-600 font-semibold">{filteredMembers.length} nhân sự</span>
        </div>
      </div>
    );
  }

  function renderMemberItem(member) {
    const isSelected = resolvedUser.id === member.id || resolvedUser.name === member.name;
    const itemInitials = member.avatar || getUserInitials(member.name);
    const itemBg = getUserAvatarBg(member);

    return (
      <button
        key={member.id || member.name}
        type="button"
        onClick={() => handleSelectMember(member)}
        className={`w-full p-2 rounded-xl flex items-center justify-between text-left transition-all cursor-pointer ${
          isSelected 
            ? 'bg-indigo-50/80 text-indigo-950 font-semibold' 
            : 'hover:bg-slate-100 text-slate-800'
        }`}
      >
        <div className="flex items-center space-x-2.5 min-w-0">
          <div className={`w-7 h-7 rounded-full ${itemBg} text-white font-bold text-[10px] flex items-center justify-center shrink-0 shadow-2xs`}>
            {itemInitials}
          </div>
          <div className="min-w-0">
            <div className="text-xs font-bold truncate flex items-center">
              <span>{member.name}</span>
              {member.isApprover && (
                <span className="ml-1 px-1.5 py-0.2 rounded text-[9px] bg-indigo-100 text-indigo-700 font-extrabold">
                  Approver
                </span>
              )}
            </div>
            <div className="text-[10px] text-slate-400 truncate">
              {member.role} • {member.department || 'Marketing'}
            </div>
          </div>
        </div>

        {isSelected && (
          <Check className="w-4 h-4 text-indigo-600 shrink-0 ml-2" />
        )}
      </button>
    );
  }
}
