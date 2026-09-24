import React, { useState } from 'react';
import { 
  CheckSquare, 
  Sparkles, 
  Users, 
  ArrowRight, 
  Lock, 
  Unlock, 
  Calendar, 
  Target, 
  DollarSign, 
  CheckCircle2, 
  Layers, 
  Clock,
  Eye
} from 'lucide-react';
import MasterPlanApprovalSlideOver from '../workflow/MasterPlanApprovalSlideOver';
import UserSelector from '../common/UserSelector';
import { INITIAL_TEAM_MEMBERS } from '../../data/mockData';

export default function TaskQualityControlWidget({ 
  tasks = [], 
  masterPlans = [],
  teamMembers = INITIAL_TEAM_MEMBERS,
  onApproveMasterPlan,
  onRejectMasterPlan,
  onUpdatePlan,
  onUpdateTask,
  showToast,
  onOpenBrief, 
  onNavigateToWorkflow, 
  onOpenTeamModal 
}) {
  const [selectedTeam, setSelectedTeam] = useState('all'); // 'all' | 'plan' | 'Content' | 'Design' | 'Video'
  const [selectedPlanForApproval, setSelectedPlanForApproval] = useState(null);

  const pendingPlansCount = (masterPlans || []).filter(p => p.status === 'pending_approval').length;
  const overdueCount = (tasks || []).filter(t => !t.isLocked && t.status === 'overdue').length;
  const pendingQaCount = (tasks || []).filter(t => !t.isLocked && (t.status === 'pending_qa' || t.stage === 'in_review')).length;

  // Filter tasks based on selected tab
  const filteredTasks = (tasks || []).filter(t => {
    if (selectedTeam === 'all') return true;
    if (selectedTeam === 'plan') {
      // Khi chọn tab Plan, hiển thị các task liên đới phụ thuộc vào Master Plan
      return Boolean(t.masterPlanId);
    }
    return t.team === selectedTeam || t.type === selectedTeam;
  });

  const showMasterPlans = selectedTeam === 'all' || selectedTeam === 'plan';

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md border border-slate-200/80 transition-all flex flex-col justify-between space-y-4">
      <div>
        {/* Header */}
        <div className="flex items-center justify-between pb-3.5 border-b border-slate-100 flex-wrap gap-2">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shadow-2xs">
              <CheckSquare className="w-4 h-4" strokeWidth={1.75} />
            </div>
            <div>
              <h3 className="font-bold text-sm text-slate-900 tracking-tight flex items-center">
                Task & Quality Control
                <span className="ml-2 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                  Manager Approval Flow
                </span>
              </h3>
              <p className="text-xs text-slate-400 font-normal">
                Kiểm soát chất lượng, phê duyệt Master Plan & điều phối task chiến dịch
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            {pendingPlansCount > 0 && (
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-indigo-50 text-indigo-700 border border-indigo-200 shadow-2xs flex items-center">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 animate-pulse mr-1" />
                {pendingPlansCount} plan chờ Sếp
              </span>
            )}
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-rose-50 text-rose-700 border border-rose-200 shadow-2xs">
              {overdueCount} trễ
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-800 border border-amber-200 shadow-2xs">
              {pendingQaCount} chờ duyệt
            </span>
          </div>
        </div>

        {/* Filter chips & Nút "+ Quản lý Team" */}
        <div className="flex items-center justify-between my-3.5 gap-2 flex-wrap">
          <div className="flex items-center space-x-1.5 overflow-x-auto">
            {/* Chip: Tất cả */}
            <button
              onClick={() => setSelectedTeam('all')}
              className={`px-3 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                selectedTeam === 'all'
                  ? 'bg-indigo-600 text-white shadow-2xs'
                  : 'bg-slate-100 text-slate-600 hover:text-slate-900 hover:bg-slate-200'
              }`}
            >
              Tất cả
            </button>

            {/* Chip: 🚀 Plan (Chờ duyệt) với Chấm đỏ thông báo */}
            <button
              onClick={() => setSelectedTeam('plan')}
              className={`relative inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                selectedTeam === 'plan'
                  ? 'bg-indigo-600 text-white shadow-2xs'
                  : 'bg-slate-100 text-slate-600 hover:text-slate-900 hover:bg-slate-200'
              }`}
            >
              {pendingPlansCount > 0 && (
                <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping mr-1.5 ring-2 ring-white" />
              )}
              <span>🚀 Plan (Chờ duyệt)</span>
              {pendingPlansCount > 0 && (
                <span className={`ml-1.5 px-1.5 py-0.2 rounded-full text-[9px] font-black ${
                  selectedTeam === 'plan' ? 'bg-white/20 text-white' : 'bg-rose-100 text-rose-700'
                }`}>
                  {pendingPlansCount}
                </span>
              )}
            </button>

            {/* Các chip chức năng: Content | Design | Video */}
            {['Content', 'Design', 'Video'].map((team) => (
              <button
                key={team}
                onClick={() => setSelectedTeam(team)}
                className={`px-3 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                  selectedTeam === team
                    ? 'bg-indigo-600 text-white shadow-2xs'
                    : 'bg-slate-100 text-slate-600 hover:text-slate-900 hover:bg-slate-200'
                }`}
              >
                {team}
              </button>
            ))}
          </div>

          {/* Nút "+ Quản lý Team" */}
          <button
            onClick={onOpenTeamModal}
            className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold text-indigo-700 bg-indigo-50/70 hover:bg-indigo-100 border border-dashed border-indigo-300 transition-all shrink-0 cursor-pointer shadow-2xs"
            title="Mở Modal Quản lý Team & Cài đặt Tự động nhắc việc"
          >
            <Users className="w-3.5 h-3.5 mr-1.5 text-indigo-600" strokeWidth={1.75} />
            <span>+ Quản lý Team</span>
          </button>
        </div>

        {/* Danh sách Master Plans & Tasks */}
        <div className="space-y-3 max-h-[460px] overflow-y-auto pr-1">
          
          {/* 🌟 1. THẺ "MASTER PLAN" (EPIC CARD DESIGN) - GHIM Ở ĐẦU DANH SÁCH */}
          {showMasterPlans && masterPlans.map((plan) => {
            const isPlanApproved = plan.status === 'approved';

            return (
              <div
                key={plan.id}
                className={`rounded-2xl p-4 sm:p-5 transition-all border shadow-sm hover:shadow-md ${
                  isPlanApproved
                    ? 'bg-gradient-to-r from-emerald-50/70 via-white to-white border-l-4 border-l-emerald-500 border-slate-200/80'
                    : 'bg-gradient-to-r from-indigo-50/80 via-purple-50/30 to-white border-l-4 border-l-indigo-600 border-indigo-200/90'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  
                  {/* Nội dung chính của Thẻ Master Plan */}
                  <div className="space-y-2 flex-1 min-w-0">
                    {/* Badge Row */}
                    <div className="flex items-center space-x-2 flex-wrap gap-y-1">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wide bg-indigo-600 text-white shadow-2xs">
                        Master Plan Chiến Dịch
                      </span>
                      <span className="text-[10px] font-semibold text-indigo-800 bg-indigo-100/80 px-2.5 py-0.5 rounded-full border border-indigo-200">
                        {plan.brand || 'MBC'} • {plan.productName || 'Vibe Host'}
                      </span>
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        isPlanApproved
                          ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                          : 'bg-amber-100 text-amber-900 border border-amber-300 animate-pulse'
                      }`}>
                        {isPlanApproved ? '✓ Sếp Đã Phê Duyệt' : `⏳ Chờ ${plan.reviewer || plan.approver || 'Sếp'} Phê Duyệt`}
                      </span>
                    </div>

                    {/* Tiêu đề to rõ */}
                    <h4 className="text-sm sm:text-base font-bold text-slate-900 leading-snug">
                      {plan.title}
                    </h4>

                    {/* Thông tin Người lập & Người duyệt (UserSelector Interactive Chips) */}
                    <div className="flex items-center space-x-3 text-[11px] text-slate-600 flex-wrap gap-y-2 pt-0.5">
                      <div className="flex items-center space-x-1.5">
                        <span className="font-semibold text-slate-500">Người lập:</span>
                        <UserSelector
                          user={{ name: plan.creator || 'Lê Phạm Minh Châu', role: plan.creatorRole || 'Growth Marketing Lead' }}
                          teamMembers={teamMembers}
                          onSelect={(member) => {
                            if (onUpdatePlan) {
                              onUpdatePlan({ ...plan, creator: member.name, creatorRole: member.role });
                            }
                          }}
                          variant="chip"
                          disabled={isPlanApproved}
                        />
                      </div>

                      <span className="text-slate-300">•</span>

                      <div className="flex items-center space-x-1.5">
                        <span className="font-semibold text-slate-500">Người duyệt:</span>
                        <UserSelector
                          user={{ name: plan.reviewer || plan.approver || 'Lâm Quang Thịnh', role: plan.reviewerRole || plan.approverRole || 'Acting Marketing Manager', isApprover: true }}
                          teamMembers={teamMembers}
                          filterType="approvers"
                          onSelect={(member) => {
                            if (onUpdatePlan) {
                              onUpdatePlan({ ...plan, reviewer: member.name, reviewerRole: member.role, approver: member.name, approverRole: member.role });
                            }
                          }}
                          variant="chip"
                          disabled={isPlanApproved}
                        />
                      </div>
                    </div>

                    {/* Các chỉ số KPI chính */}
                    <div className="flex items-center space-x-3 text-[11px] text-slate-600 pt-1 flex-wrap gap-y-1">
                      <span className="inline-flex items-center font-medium text-slate-700 bg-white/80 px-2.5 py-1 rounded-lg border border-slate-200/60 shadow-2xs">
                        <Calendar className="w-3 h-3 mr-1 text-slate-400" />
                        Timeline: {plan.timeline || '01/10 - 31/10'}
                      </span>
                      <span className="inline-flex items-center font-bold text-indigo-700 bg-indigo-50/80 px-2.5 py-1 rounded-lg border border-indigo-100 shadow-2xs">
                        <Target className="w-3 h-3 mr-1 text-indigo-500" />
                        Target: {plan.targetKpi || '50 SQLs'}
                      </span>
                      <span className="inline-flex items-center font-bold text-emerald-700 bg-emerald-50/80 px-2.5 py-1 rounded-lg border border-emerald-100 shadow-2xs">
                        <DollarSign className="w-3 h-3 mr-1 text-emerald-500" />
                        Ngân sách: {plan.budget || '$1,200'}
                      </span>
                    </div>

                    {/* Mô tả phụ: Sub-campaigns */}
                    {plan.subCampaigns && plan.subCampaigns.length > 0 && (
                      <div className="pt-1 text-[11px] text-slate-500 flex items-center space-x-2">
                        <Layers className="w-3 h-3 text-slate-400 shrink-0" />
                        <span className="truncate">
                          Gồm <strong>{plan.subCampaigns.length} Sub-campaigns</strong>: {plan.subCampaigns.map(s => `${s.name || s.role} (${s.share || s.kpiWeight || ''})`).join(' • ')}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Nút hành động */}
                  <div className="flex items-center space-x-2 shrink-0 self-start sm:self-center">
                    {!isPlanApproved ? (
                      <>
                        <button
                          type="button"
                          onClick={() => setSelectedPlanForApproval(plan)}
                          className="inline-flex items-center px-4 py-2 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 shadow-sm shadow-indigo-200 transition-all hover:scale-102 active:scale-98 cursor-pointer"
                          title="Mở bảng chi tiết thẩm định và phê duyệt chiến dịch"
                        >
                          <Eye className="w-3.5 h-3.5 mr-1.5 text-indigo-200" />
                          <span>🔎 Xem & Phê Duyệt</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => setSelectedPlanForApproval(plan)}
                          className="px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-700 bg-white hover:bg-slate-100 border border-slate-300 transition-colors cursor-pointer"
                          title="Xem chi tiết và yêu cầu sửa đổi"
                        >
                          Yêu cầu sửa
                        </button>
                      </>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setSelectedPlanForApproval(plan)}
                        className="inline-flex items-center px-3.5 py-2 rounded-xl text-xs font-bold text-emerald-800 bg-emerald-100 hover:bg-emerald-200 border border-emerald-300 transition-all cursor-pointer"
                        title="Kế hoạch đã được phê duyệt, bấm để xem lại chi tiết"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 mr-1 text-emerald-600" />
                        <span>Đã Phê Duyệt (Xem lại)</span>
                      </button>
                    )}
                  </div>

                </div>
              </div>
            );
          })}

          {/* 🌟 2. DANH SÁCH TASK CON (CÓ KHÓA DEPENDENCY NẾU MASTER PLAN CHƯA DUYỆT) */}
          {filteredTasks.length === 0 && (!showMasterPlans || masterPlans.length === 0) ? (
            <div className="p-8 text-center bg-slate-50 rounded-xl border border-slate-200/60 text-slate-400 text-xs">
              Không có task nào trong bộ lọc này.
            </div>
          ) : (
            filteredTasks.map((task) => {
              const isOverdue = !task.isLocked && task.status === 'overdue';
              const isPendingQa = !task.isLocked && (task.status === 'pending_qa' || task.stage === 'in_review');
              const isLocked = Boolean(task.isLocked);

              return (
                <div
                  key={task.id}
                  className={`p-3.5 rounded-xl flex items-center justify-between gap-3 text-xs transition-all ${
                    isLocked
                      ? 'bg-slate-50/90 border border-slate-200 opacity-65 cursor-not-allowed select-none'
                      : 'bg-slate-50/70 border border-slate-200/50 hover:border-slate-300'
                  }`}
                  title={isLocked ? (task.lockMessage || 'Chờ Lâm Quang Thịnh duyệt Master Plan để mở khóa') : undefined}
                >
                  <div className="space-y-1 min-w-0 flex-1">
                    <div className="flex items-center space-x-2 flex-wrap gap-y-1">
                      {isLocked ? (
                        <span className="font-semibold text-slate-600 truncate flex items-center">
                          <Lock className="w-3.5 h-3.5 mr-1 text-amber-600 shrink-0" />
                          {task.title}
                        </span>
                      ) : (
                        <span className="font-semibold text-slate-900 truncate">{task.title}</span>
                      )}

                      <span className="text-[10px] font-medium text-slate-500 bg-white px-2 py-0.2 rounded-full border border-slate-200/60">
                        {task.team}
                      </span>

                      {/* Tooltip / Badge Khóa Phụ Thuộc */}
                      {isLocked && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-semibold bg-amber-50 text-amber-800 border border-amber-200">
                          <Lock className="w-2.5 h-2.5 mr-1 text-amber-600" />
                          {task.lockMessage || 'Chờ Lâm Quang Thịnh duyệt Master Plan để mở khóa'}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center space-x-2 text-[11px] text-slate-500">
                      <UserSelector
                        user={task.assignee}
                        teamMembers={teamMembers}
                        onSelect={(member) => {
                          if (onUpdateTask) {
                            onUpdateTask({
                              ...task,
                              assignee: member.name,
                              assigneeRole: member.role,
                              team: member.role.includes('Design') ? 'Design' :
                                    member.role.includes('Content') || member.role.includes('Copywriter') ? 'Content' :
                                    member.role.includes('Video') ? 'Video' : task.team
                            });
                          }
                        }}
                        variant="inline"
                        disabled={isLocked}
                      />
                      <span>•</span>
                      <span className="text-slate-400 truncate">{task.campaign}</span>
                      {task.deadline && (
                        <>
                          <span>•</span>
                          <span className="text-slate-400">Hạn: {task.deadline}</span>
                        </>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 shrink-0">
                    {/* ✨ Nút mở Gemini Creative Brief */}
                    <button
                      onClick={() => onOpenBrief(task)}
                      className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border transition-all cursor-pointer shadow-2xs ${
                        isLocked
                          ? 'bg-slate-100 text-slate-500 border-slate-200 hover:bg-slate-200'
                          : 'text-indigo-700 bg-white hover:bg-indigo-50 border-indigo-150'
                      }`}
                      title="Xem Creative Brief của task"
                    >
                      <Sparkles className={`w-3 h-3 mr-1 ${isLocked ? 'text-slate-400' : 'text-indigo-600'}`} strokeWidth={1.75} />
                      <span>Brief</span>
                    </button>

                    {/* Nhãn trạng thái */}
                    {isLocked ? (
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-200 text-slate-600 border border-slate-300 shadow-2xs flex items-center">
                        <Lock className="w-2.5 h-2.5 mr-1" />
                        Chờ mở khóa
                      </span>
                    ) : (
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold shadow-2xs ${
                        isOverdue
                          ? 'bg-rose-50 text-rose-700 border border-rose-200'
                          : isPendingQa
                          ? 'bg-amber-50 text-amber-800 border border-amber-200'
                          : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      }`}>
                        {task.statusLabel}
                      </span>
                    )}

                    {/* Nút Duyệt QA nhanh cho Task (chỉ hiện khi không bị khóa) */}
                    {isPendingQa && !isLocked && (
                      <button
                        onClick={() => {
                          if (showToast) {
                            showToast(`Đã duyệt sản phẩm bàn giao của ${task.assignee}!`);
                          } else {
                            alert(`Đã duyệt sản phẩm bàn giao của ${task.assignee}!`);
                          }
                        }}
                        className="px-3 py-1 rounded-full text-xs font-bold bg-amber-500 hover:bg-amber-600 text-white cursor-pointer transition-all shadow-xs hover:scale-102 active:scale-98"
                        title="Duyệt bài nộp (Hành động cần chú ý)"
                      >
                        Duyệt
                      </button>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Footer link to Workflow Board */}
      <button
        onClick={onNavigateToWorkflow}
        className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-indigo-600 hover:text-indigo-700 transition-colors w-full text-left group cursor-pointer"
      >
        <span>Mở toàn màn hình Task & Workflow Board</span>
        <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" strokeWidth={1.75} />
      </button>

      {/* Slide-over Panel for Detailed Plan Approval */}
      <MasterPlanApprovalSlideOver
        isOpen={Boolean(selectedPlanForApproval)}
        onClose={() => setSelectedPlanForApproval(null)}
        plan={selectedPlanForApproval}
        tasks={tasks}
        teamMembers={teamMembers}
        onUpdatePlan={onUpdatePlan}
        onApprovePlan={(planId) => {
          if (onApproveMasterPlan) {
            onApproveMasterPlan(planId);
          }
          setSelectedPlanForApproval(null);
        }}
        onRejectPlan={(planId, note) => {
          if (onRejectMasterPlan) {
            onRejectMasterPlan(planId, note);
          }
          setSelectedPlanForApproval(null);
        }}
        showToast={showToast}
      />
    </div>
  );
}

