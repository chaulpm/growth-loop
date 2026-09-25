import { 
  Sparkles, 
  Activity,
  BarChart3,
  LogOut
} from 'lucide-react';
import UserSelector from './common/UserSelector';
import { CURRENT_USER, INITIAL_TEAM_MEMBERS } from '../data/mockData';

export default function Navigation({ 
  activeTab, 
  setActiveTab, 
  selectedMonth, 
  setSelectedMonth, 
  onOpenNewProductModal,
  onOpenGuidedPlanning,
  onOpenWeeklyReport,
  isGeminiPanelOpen,
  onToggleGeminiPanel,
  currentUser = CURRENT_USER,
  teamMembers = INITIAL_TEAM_MEMBERS,
  onSwitchUser,
  onLogout,
  criticalAlertsCount = 3,
  pendingReviewCount = 2
}) {
  const tabs = [
    { 
      id: 'control-center', 
      label: 'Control Center', 
      badge: criticalAlertsCount, 
      badgeColor: 'bg-rose-50 text-rose-700 border-rose-100' 
    },
    { 
      id: 'product-master', 
      label: 'Product Master' 
    },
    { 
      id: 'task-workflow', 
      label: 'Task & Workflow', 
      badge: pendingReviewCount, 
      badgeColor: 'bg-amber-50 text-amber-700 border-amber-100' 
    }
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#1E293B] border-b border-slate-800 shadow-md transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          
          {/* 1. CỤM LOGO (Dark Theme Header) */}
          <div className="flex items-center space-x-3">
            <div className="h-7 w-7 rounded-lg bg-indigo-500 flex items-center justify-center text-white shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-white" strokeWidth={2} />
            </div>
            <div className="flex items-center space-x-2">
              <span className="font-bold text-base tracking-tight text-white">
                Growth Loop
              </span>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                ✨ Data-Driven OS
              </span>
            </div>
          </div>

          {/* 2. CỤM ĐIỀU HƯỚNG CHÍNH (Dark Theme Tabs với gạch chân nổi bật) */}
          <nav className="flex items-center space-x-2 sm:space-x-6">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative px-2.5 py-4 text-xs sm:text-sm transition-colors flex items-center space-x-1.5 cursor-pointer ${
                    isActive
                      ? 'text-white font-bold'
                      : 'text-slate-300 hover:text-white font-medium'
                  }`}
                >
                  <span>{tab.label}</span>
                  {tab.badge > 0 && (
                    <span className={`px-2 py-0.2 rounded-full text-[10px] font-semibold border ${
                      tab.id === 'control-center' 
                        ? 'bg-rose-500/20 text-rose-300 border-rose-500/40' 
                        : 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                    }`}>
                      {tab.badge}
                    </span>
                  )}
                  {/* Underline indicator Tím/Xanh sáng sắc nét */}
                  {isActive && (
                    <span className="absolute bottom-0 left-1 right-1 h-0.5 bg-indigo-400 rounded-full animate-in fade-in duration-150 shadow-[0_0_8px_rgba(129,140,248,0.8)]" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* 3. CỤM CÔNG CỤ & HÀNH ĐỘNG (Dark Theme) */}
          <div className="flex items-center space-x-2.5">
            
            {/* Meta Ads API Live Status */}
            <div className="relative group">
              <button 
                type="button"
                className="relative p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-all cursor-pointer"
                title="Meta Ads API: Đang đồng bộ thời gian thực"
              >
                <Activity className="w-4 h-4" strokeWidth={1.75} />
                {/* Chấm xanh ngọc dịu mắt góc icon */}
                <span className="absolute top-1.5 right-1.5 flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400 ring-2 ring-slate-900" />
                </span>
              </button>
              
              {/* Tooltip khi hover */}
              <div className="absolute right-0 top-full mt-1.5 hidden group-hover:flex flex-col items-center z-50 pointer-events-none">
                <div className="bg-slate-950 text-slate-200 text-[10px] font-medium px-2.5 py-1 rounded-md shadow-md border border-slate-700 whitespace-nowrap">
                  Meta Ads API: Live Sync
                </div>
              </div>
            </div>

            {/* NÚT "📊 BÁO CÁO TUẦN" */}
            <button
              onClick={onOpenWeeklyReport}
              className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 shadow-md transition-all hover:scale-102 active:scale-98 cursor-pointer border border-indigo-500/50 shrink-0"
              title="Xem & Gửi Báo Cáo Tuần Cho Ban Giám Đốc"
            >
              <BarChart3 className="w-3.5 h-3.5 text-indigo-200" strokeWidth={2} />
              <span>Báo Cáo Tuần</span>
              <span className="px-1.5 py-0.2 rounded-full text-[9px] font-bold bg-white/20 text-white tracking-wider uppercase">
                Thứ 6
              </span>
            </button>

            {/* Current User Pill & Multi-user Switcher */}
            {currentUser && (
              <div className="pl-1.5 border-l border-slate-700/80 shrink-0 flex items-center space-x-1">
                <UserSelector
                  user={currentUser}
                  teamMembers={teamMembers}
                  onSelect={(member) => {
                    if (onSwitchUser) onSwitchUser(member);
                  }}
                  variant="nav"
                />

                {/* Nút Đăng xuất */}
                {onLogout && (
                  <button
                    type="button"
                    onClick={onLogout}
                    title="Đăng xuất khỏi hệ thống"
                    className="p-2 rounded-xl text-slate-400 hover:text-rose-400 hover:bg-slate-800 transition-all cursor-pointer flex items-center justify-center shrink-0"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                )}
              </div>
            )}

          </div>

        </div>
      </div>
    </header>
  );
}
