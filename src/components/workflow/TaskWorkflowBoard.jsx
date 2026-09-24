import React, { useState } from 'react';
import { 
  Sparkles, 
  Search, 
  Plus, 
  Filter, 
  Clock, 
  AlertCircle, 
  CheckCircle2, 
  User, 
  Calendar, 
  Layers, 
  RotateCcw, 
  Check, 
  ArrowRight, 
  Tag, 
  Eye, 
  SlidersHorizontal,
  ChevronRight,
  ExternalLink,
  MessageSquare,
  UserPlus,
  Hourglass,
  Kanban,
  Lock
} from 'lucide-react';
import UserSelector from '../common/UserSelector';
import SlideOverFeedbackPanel from './SlideOverFeedbackPanel';
import CreateTaskModal from './CreateTaskModal';
import LearningCaptureModal from './LearningCaptureModal';
import { updateTaskStage, createTasksBatch } from '../../services/taskService';
import { isSupabaseConfigured } from '../../lib/supabaseClient';

// Cấu hình 5 cột trạng thái Kanban theo luồng PRD
const KANBAN_COLUMNS = [
  { id: 'not_started', label: 'Not Started', viLabel: 'Chưa bắt đầu', dotColor: 'bg-slate-400' },
  { id: 'in_progress', label: 'In Progress', viLabel: 'Đang thực hiện', dotColor: 'bg-indigo-500' },
  { id: 'in_review', label: 'In Review', viLabel: 'Chờ duyệt', dotColor: 'bg-amber-500' },
  { id: 'revision', label: 'Revision', viLabel: 'Yêu cầu sửa', dotColor: 'bg-rose-500' },
  { id: 'done', label: 'Done', viLabel: 'Hoàn thành', dotColor: 'bg-emerald-500', autoArchiveDays: 7 },
];

const TASK_TYPES_LIST = ['Tất cả', 'Content', 'Design', 'Video'];
const BRANDS_LIST = [
  { id: 'all', label: 'Tất cả' },
  { id: 'MBC', label: '🏢 MBC (Matbao-corp)' },
  { id: 'MBI', label: '🧾 MBI (Matbao-invoice)' }
];

export default function TaskWorkflowBoard({ 
  tasks = [], 
  onUpdateTasks,
  showToast,
  teamMembers = [],
  onOpenTeamModal,
  products,
  onSaveLearning
}) {
  // Filters State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAssignee, setSelectedAssignee] = useState('Tất cả');
  const [selectedType, setSelectedType] = useState('Tất cả');
  const [selectedBrand, setSelectedBrand] = useState('all');

  // Swimlanes toggle state (Feature 1: ☷ View by Campaign)
  const [isSwimlaneView, setIsSwimlaneView] = useState(false);

  // Slide-over & Create Modal state
  const [selectedTaskForPanel, setSelectedTaskForPanel] = useState(null);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  // Smart Learning Capture Modal state (Feature 3: Đóng vòng lặp Task & Learning)
  const [learningTask, setLearningTask] = useState(null);
  const [isLearningModalOpen, setIsLearningModalOpen] = useState(false);

  // Drag and drop state
  const [draggedTaskId, setDraggedTaskId] = useState(null);

  // AI Insights Banner action
  const [isBannerDismissed, setIsBannerDismissed] = useState(false);

  // Danh sách nhân sự động từ teamMembers và tasks
  const dynamicAssignees = Array.from(new Set([
    ...teamMembers.map(m => m.name),
    ...tasks.map(t => t.assignee).filter(Boolean)
  ]));

  // Avatar viết tắt 2 ký tự
  const getInitials = (name) => {
    if (!name) return 'TM';
    const parts = name.trim().split(' ');
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  const getAvatarColor = (name) => {
    if (!name) return 'bg-slate-700';
    if (name.includes('Content')) return 'bg-purple-600';
    if (name.includes('Design')) return 'bg-blue-600';
    if (name.includes('Video')) return 'bg-amber-600';
    if (name.includes('Growth')) return 'bg-indigo-600';
    return 'bg-slate-700';
  };

  // Tính số lượng task trễ hạn duyệt ở cột In Review
  const overdueInReviewTasks = tasks.filter(
    t => t.stage === 'in_review' && t.isOverdue
  );
  const overdueAssignee = overdueInReviewTasks[0]?.assignee || 'Nguyễn Duy Quý';

  // Filter tasks
  const filteredTasks = tasks.filter(task => {
    // Brand filter
    if (selectedBrand !== 'all' && task.brand !== selectedBrand) return false;

    // Assignee filter
    if (selectedAssignee !== 'Tất cả' && task.assignee !== selectedAssignee) return false;

    // Type filter
    if (selectedType !== 'Tất cả' && task.type !== selectedType) return false;

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = task.title.toLowerCase().includes(q);
      const matchCamp = task.campaign?.toLowerCase().includes(q);
      const matchAssignee = task.assignee?.toLowerCase().includes(q);
      return matchTitle || matchCamp || matchAssignee;
    }

    return true;
  });

  // Handler: Click task card to open slide-over
  const handleCardClick = (task) => {
    setSelectedTaskForPanel(task);
    setIsPanelOpen(true);
  };

  // Handler: Click "Xem & Duyệt Ngay" trên AI Banner
  const handleQuickReviewOverdueTasks = () => {
    setSelectedAssignee(overdueAssignee);
    if (overdueInReviewTasks.length > 0) {
      setSelectedTaskForPanel(overdueInReviewTasks[0]);
      setIsPanelOpen(true);
    }
  };

  // Drag & Drop handlers
  const handleDragStart = (e, taskId) => {
    setDraggedTaskId(taskId);
    e.dataTransfer.setData('text/plain', taskId);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDropOnColumn = (targetStage) => {
    if (!draggedTaskId) return;

    const movedTask = tasks.find(t => t.id === draggedTaskId);

    const updated = tasks.map(t => {
      if (t.id === draggedTaskId) {
        return {
          ...t,
          stage: targetStage,
          status: targetStage === 'done' ? 'ready' : (targetStage === 'revision' ? 'overdue' : t.status),
          statusLabel: targetStage === 'done' ? 'Hoàn thành' : (targetStage === 'revision' ? 'Yêu cầu sửa' : t.statusLabel)
        };
      }
      return t;
    });

    onUpdateTasks(updated);

    // Đồng bộ cập nhật cột stage trực tiếp lên Supabase Database
    updateTaskStage(draggedTaskId, targetStage).catch(err => {
      console.warn('Lỗi đồng bộ stage lên Supabase:', err);
    });

    setDraggedTaskId(null);

    if (movedTask && showToast) {
      showToast(`Đã chuyển "${movedTask.title}" sang cột ${KANBAN_COLUMNS.find(c => c.id === targetStage)?.label} (Đồng bộ DB ⚡)`);
    }

    // Feature 3: Smart Trigger khi kéo thả task A/B test vào cột Done
    if (targetStage === 'done' && movedTask) {
      const isAb = movedTask.isAbTest || /test|a\/b/i.test(movedTask.title);
      if (isAb) {
        setLearningTask(movedTask);
        setIsLearningModalOpen(true);
      }
    }
  };

  // Handler: Move to Revision từ Slide-over Panel
  const handleMoveToRevision = (taskId, comment) => {
    const updated = tasks.map(t => {
      if (t.id === taskId) {
        const newChat = [
          ...(t.feedbackChat || []),
          {
            id: 'c_' + Date.now(),
            sender: 'Marketer',
            name: 'Growth Lead',
            time: 'Vừa xong',
            text: comment
          }
        ];
        return {
          ...t,
          stage: 'revision',
          status: 'overdue',
          statusLabel: 'Yêu cầu sửa',
          urgency: 'danger',
          feedbackChat: newChat
        };
      }
      return t;
    });

    onUpdateTasks(updated);
    updateTaskStage(taskId, 'revision').catch(err => console.warn('Lỗi đồng bộ revision lên Supabase:', err));
    setIsPanelOpen(false);
    if (showToast) {
      showToast(`⚠️ Đã chuyển task sang cột Revision và gửi yêu cầu chỉnh sửa cho nhân sự.`);
    }
  };

  // Handler: Move to Done từ Slide-over Panel
  const handleMoveToDone = (taskId, comment) => {
    const completedTask = tasks.find(t => t.id === taskId);
    const updated = tasks.map(t => {
      if (t.id === taskId) {
        const newChat = [
          ...(t.feedbackChat || []),
          {
            id: 'c_' + Date.now(),
            sender: 'Marketer',
            name: 'Growth Lead',
            time: 'Vừa xong',
            text: comment
          }
        ];
        return {
          ...t,
          stage: 'done',
          status: 'ready',
          statusLabel: 'Hoàn thành',
          urgency: 'success',
          isOverdue: false,
          feedbackChat: newChat
        };
      }
      return t;
    });

    onUpdateTasks(updated);
    updateTaskStage(taskId, 'done').catch(err => console.warn('Lỗi đồng bộ done lên Supabase:', err));
    setIsPanelOpen(false);
    if (showToast) {
      showToast(`✨ Đã duyệt thành công! Tài nguyên sẵn sàng gắn vào chiến dịch.`);
    }

    // Feature 3: Smart Trigger khi duyệt hoàn thành task A/B test
    if (completedTask && (completedTask.isAbTest || /test|a\/b/i.test(completedTask.title))) {
      setLearningTask(completedTask);
      setIsLearningModalOpen(true);
    }
  };

  // Handler: Thêm bình luận vào task
  const handleAddComment = (taskId, comment) => {
    const updated = tasks.map(t => {
      if (t.id === taskId) {
        const newChat = [
          ...(t.feedbackChat || []),
          {
            id: 'c_' + Date.now(),
            sender: 'Marketer',
            name: 'Growth Lead',
            time: 'Vừa xong',
            text: comment
          }
        ];
        const updatedTask = { ...t, feedbackChat: newChat };
        setSelectedTaskForPanel(updatedTask);
        return updatedTask;
      }
      return t;
    });

    onUpdateTasks(updated);
  };

  // Handler: Lưu task mới từ CreateTaskModal
  const handleCreateTask = (newTask) => {
    onUpdateTasks([newTask, ...tasks]);
    createTasksBatch([newTask]).catch(err => console.warn('Lỗi lưu task mới vào Supabase:', err));
    if (showToast) {
      showToast(`Đã tạo và gửi duyệt bài: "${newTask.title}" vào cột ${newTask.statusLabel || newTask.stage}! (Đã lưu DB ⚡)`);
    }
  };

  // Handler: Lưu Learning từ LearningCaptureModal
  const handleSaveLearning = (data) => {
    if (onSaveLearning) {
      onSaveLearning(data);
    } else if (showToast) {
      showToast(`✨ Đã lưu bài học A/B test "${data.winnerLabel}" vào Thư viện Growth!`);
    }
  };

  // Danh sách các campaign độc nhất cho chế độ Swimlanes
  const uniqueCampaigns = Array.from(new Set(filteredTasks.map(t => t.campaign || 'Chiến dịch chung')));

  // Render một Task Card theo chuẩn Soft & Elegant SaaS Minimalism
  const renderTaskCard = (task) => {
    const borderLeftColor = 
      task.isOverdue ? 'border-l-rose-500' :
      task.stage === 'in_review' ? 'border-l-amber-500' :
      task.stage === 'revision' ? 'border-l-orange-500' :
      task.stage === 'done' ? 'border-l-emerald-500' :
      task.stage === 'in_progress' ? 'border-l-indigo-500' :
      'border-l-slate-300';

    const isAbTest = task.isAbTest || /test|a\/b/i.test(task.title);

    const isLocked = Boolean(task.isLocked);

    return (
      <div
        key={task.id}
        draggable={!isLocked}
        onDragStart={(e) => !isLocked && handleDragStart(e, task.id)}
        onClick={() => handleCardClick(task)}
        className={`group bg-white rounded-2xl p-4 shadow-[0_2px_12px_rgba(0,0,0,0.02)] border border-slate-200/70 border-l-4 ${borderLeftColor} hover:border-indigo-200 hover:shadow-md transition-all cursor-pointer space-y-3 ${
          isLocked ? 'opacity-65 bg-slate-50/90' : ''
        }`}
        title={isLocked ? (task.lockMessage || 'Chờ Lâm Quang Thịnh duyệt Master Plan để mở khóa') : undefined}
      >
        {/* Top Badges: Brand & Task Type & A/B Tag */}
        <div className="flex items-center justify-between text-[10px]">
          <div className="flex items-center space-x-1.5 flex-wrap gap-y-1">
            <span className={`px-2 py-0.5 rounded-full font-semibold uppercase ${
              task.brand === 'MBC' ? 'bg-blue-50 text-blue-700' : 'bg-emerald-50 text-emerald-700'
            }`}>
              {task.brand}
            </span>
            <span className="px-2 py-0.5 rounded-full font-medium bg-slate-100 text-slate-600">
              {task.type}
            </span>
            {isAbTest && (
              <span className="px-2 py-0.5 rounded-full font-semibold text-[9px] bg-purple-50 text-purple-700 border border-purple-100 flex items-center">
                ⚡ A/B Test
              </span>
            )}
            {isLocked && (
              <span className="px-2 py-0.5 rounded-full font-semibold text-[9px] bg-amber-50 text-amber-800 border border-amber-200 flex items-center">
                <Lock className="w-2.5 h-2.5 mr-1 text-amber-600" /> Khóa
              </span>
            )}
          </div>

          {/* Icon mở slide-over */}
          <span className="text-slate-300 group-hover:text-indigo-600 transition-colors shrink-0 ml-1">
            <ChevronRight className="w-3.5 h-3.5" strokeWidth={1.75} />
          </span>
        </div>

        {/* Tiêu đề Task & Tên Campaign */}
        <div className="space-y-1">
          <h4 className="text-xs font-bold text-slate-900 leading-snug line-clamp-2 group-hover:text-indigo-950 flex items-center">
            {isLocked && <Lock className="w-3 h-3 mr-1 text-amber-600 shrink-0 inline" />}
            {task.title}
          </h4>
          <p className="text-[11px] text-slate-400 truncate font-normal">
            {task.campaign}
          </p>
        </div>

        {/* Phụ trách & Deadline */}
        <div className="pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px]">
          
          {/* Assignee Avatar + Tên (Interactive UserSelector) */}
          <div className="flex items-center space-x-1.5" onClick={(e) => e.stopPropagation()}>
            <UserSelector
              user={task.assignee}
              teamMembers={teamMembers}
              onSelect={(member) => {
                const updated = tasks.map(t => t.id === task.id ? { 
                  ...t, 
                  assignee: member.name, 
                  assigneeRole: member.role,
                  team: member.role.includes('Design') ? 'Design' :
                        member.role.includes('Content') || member.role.includes('Copywriter') ? 'Content' :
                        member.role.includes('Video') ? 'Video' : t.team
                } : t);
                onUpdateTasks(updated);
                if (showToast) {
                  showToast(`Đã chuyển giao "${task.title.slice(0, 25)}..." cho ${member.name}!`);
                }
              }}
              variant="inline"
              disabled={isLocked}
            />
          </div>

          {/* Deadline Indicator */}
          <div className="flex items-center space-x-1">
            {task.isOverdue ? (
              <span className="flex items-center text-[10px] font-semibold text-rose-700 bg-rose-50 px-2 py-0.5 rounded-full border border-rose-100">
                <Clock className="w-3 h-3 mr-1 text-rose-500" strokeWidth={1.75} />
                Trễ {task.overdueDays}d
              </span>
            ) : (
              <span className="text-[11px] text-slate-400 font-normal">
                {task.deadline || 'Hôm nay'}
              </span>
            )}
          </div>

        </div>

      </div>
    );
  };

  return (
    <div className="space-y-6">
      
      {/* 1. AI INSIGHTS BANNER - Gradient Tím/Xanh pastel cực nhạt êm dịu */}
      {!isBannerDismissed && (
        <div className="bg-gradient-to-r from-purple-50/70 via-indigo-50/60 to-blue-50/50 text-slate-800 rounded-2xl p-4 sm:px-5 sm:py-3.5 border border-indigo-100/80 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 animate-in fade-in duration-300">
          <div className="flex items-center space-x-3 min-w-0">
            <div className="p-1.5 rounded-xl bg-indigo-600 text-white shrink-0 shadow-2xs">
              <Sparkles className="w-4 h-4" strokeWidth={1.75} />
            </div>
            <p className="text-xs sm:text-sm font-normal text-slate-800 leading-snug">
              <span className="font-bold text-indigo-950">✨ Gợi ý Tối ưu: </span>
              Hiện có <strong className="text-amber-700 font-bold">{overdueInReviewTasks.length || 2} banner của {overdueAssignee}</strong> đang trễ hạn duyệt ở cột <span className="underline decoration-amber-400 font-medium">In Review</span>. Bạn có muốn xem và duyệt ngay không?
            </p>
          </div>

          <div className="flex items-center space-x-2 shrink-0 self-end sm:self-auto">
            <button
              onClick={handleQuickReviewOverdueTasks}
              className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-semibold bg-indigo-600 hover:bg-indigo-700 text-white shadow-xs transition-all cursor-pointer"
            >
              <span>Xem & Duyệt Ngay</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1" strokeWidth={2} />
            </button>

            <button
              onClick={() => setIsBannerDismissed(true)}
              className="text-xs text-slate-400 hover:text-slate-700 px-2 py-1 rounded-lg transition-colors cursor-pointer font-medium"
            >
              Bỏ qua
            </button>
          </div>
        </div>
      )}

      {/* 2. THANH CÔNG CỤ TOP BAR (Soft UI Toolbar) */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-[0_4px_25px_rgba(0,0,0,0.03)] border border-slate-200/60 space-y-3.5">
        
        {/* Hàng 1: Search bar, Brand segmented control và nút tạo task */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3.5">
          
          {/* Search Input */}
          <div className="relative flex-1 min-w-[240px]">
            <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" strokeWidth={1.75} />
            <input
              type="text"
              placeholder="Tìm kiếm task, tên campaign, nhân sự..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-xs bg-slate-50 rounded-full focus:outline-none focus:bg-white text-slate-800 placeholder-slate-400 border border-slate-200/80 focus:border-indigo-400 transition-all"
            />
          </div>

          {/* Brand Filter */}
          <div className="flex items-center space-x-1 bg-slate-100/80 p-1 rounded-full border border-slate-200/50 shrink-0">
            {BRANDS_LIST.map(b => (
              <button
                key={b.id}
                onClick={() => setSelectedBrand(b.id)}
                className={`px-3.5 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                  selectedBrand === b.id
                    ? 'bg-white text-slate-900 shadow-2xs font-bold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {b.label}
              </button>
            ))}
          </div>

          {/* Status Badge Supabase Live DB */}
          {isSupabaseConfigured && (
            <div className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200/80 shadow-2xs shrink-0" title="Đã kết nối trực tiếp Supabase Database (PostgreSQL)">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse mr-2" />
              <span className="font-semibold">⚡ Supabase Live</span>
            </div>
          )}

          {/* Nút Tạo Task Mới - Deep Indigo CTA */}
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="inline-flex items-center px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 active:scale-95 rounded-full transition-all shadow-xs shrink-0 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5 mr-1.5" strokeWidth={2} />
            <span>+ Tạo Task Mới</span>
          </button>
        </div>

        {/* Hàng 2: Bộ lọc Nhân sự, Loại Task & Toggle Swimlanes */}
        <div className="pt-3 border-t border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-3.5 text-xs">
          
          {/* Lọc theo Nhân sự */}
          <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 md:pb-0">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mr-1 shrink-0 flex items-center">
              <User className="w-3 h-3 mr-1 text-slate-500" strokeWidth={1.75} /> Nhân sự:
            </span>

            {/* Chip "Tất cả" */}
            <button
              onClick={() => setSelectedAssignee('Tất cả')}
              className={`px-3 py-1 rounded-full text-[11px] font-semibold transition-all shrink-0 cursor-pointer ${
                selectedAssignee === 'Tất cả'
                  ? 'bg-indigo-600 text-white shadow-2xs font-bold'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Tất cả
            </button>

            {/* Chip "+ Thêm nhân sự" */}
            <button
              onClick={onOpenTeamModal}
              className="inline-flex items-center px-3 py-1 rounded-full text-[11px] font-semibold text-indigo-700 bg-indigo-50/70 hover:bg-indigo-100 border border-dashed border-indigo-300 transition-all shrink-0 cursor-pointer shadow-2xs"
              title="Mở Modal Quản lý Team & Thêm nhân sự mới"
            >
              <UserPlus className="w-3 h-3 mr-1.5 text-indigo-600" strokeWidth={1.75} />
              <span>+ Thêm nhân sự</span>
            </button>

            {/* Danh sách nhân sự động */}
            {dynamicAssignees.map(name => (
              <button
                key={name}
                onClick={() => setSelectedAssignee(name)}
                className={`px-3 py-1 rounded-full text-[11px] font-semibold transition-all shrink-0 cursor-pointer ${
                  selectedAssignee === name
                    ? 'bg-indigo-600 text-white shadow-2xs font-bold'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {name}
              </button>
            ))}
          </div>

          {/* Lọc theo Loại Task & Toggle Swimlanes */}
          <div className="flex items-center space-x-3 shrink-0 flex-wrap gap-y-2">
            
            {/* Loại Task */}
            <div className="flex items-center space-x-1.5">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mr-1">
                Loại:
              </span>
              {TASK_TYPES_LIST.map(t => (
                <button
                  key={t}
                  onClick={() => setSelectedType(t)}
                  className={`px-2.5 py-1 rounded-full text-[11px] font-semibold transition-all cursor-pointer ${
                    selectedType === t
                      ? 'bg-slate-900 text-white font-bold'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>

            {/* Toggle "☷ View by Campaign" */}
            <div className="pl-3 border-l border-slate-200/80 flex items-center">
              <button
                type="button"
                onClick={() => setIsSwimlaneView(!isSwimlaneView)}
                className={`inline-flex items-center px-3.5 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer border ${
                  isSwimlaneView
                    ? 'bg-indigo-600 text-white border-indigo-600 shadow-2xs font-bold'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                }`}
                title="Bật/tắt chế độ chia làn ngang theo chiến dịch (Swimlanes)"
              >
                <span className="mr-1.5 text-xs font-mono">☷</span>
                <span>View by Campaign</span>
              </button>
            </div>

          </div>

        </div>

      </div>

      {/* 3. BẢNG KANBAN BOARD */}
      {isSwimlaneView ? (
        /* CHẾ ĐỘ SWIMLANES (CHIA LÀN NGANG THEO CHIẾN DỊCH) */
        <div className="space-y-6">
          
          {/* Header 5 Cột cố định ở trên cùng */}
          <div className="hidden lg:grid grid-cols-5 gap-4 px-5 py-3 bg-white/90 rounded-2xl border border-slate-200/60 shadow-2xs">
            {KANBAN_COLUMNS.map(column => (
              <div key={column.id} className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className={`w-2.5 h-2.5 rounded-full ${column.dotColor}`} />
                  <span className="text-xs font-bold text-slate-900">
                    {column.label}
                  </span>
                  {column.id === 'done' && (
                    <span 
                      className="inline-flex items-center text-slate-400 hover:text-slate-600 ml-1 cursor-help"
                      title="Tự động lưu trữ sau 7 ngày"
                    >
                      <Hourglass className="w-3.5 h-3.5" strokeWidth={1.5} />
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Các Làn Ngang (Swimlanes) theo từng Chiến dịch */}
          {uniqueCampaigns.map(campName => {
            const campTasks = filteredTasks.filter(t => (t.campaign || 'Chiến dịch chung') === campName);
            const campBrand = campTasks[0]?.brand || 'MBC';

            return (
              <div 
                key={campName}
                className="bg-white rounded-2xl p-5 border border-slate-200/60 shadow-[0_2px_15px_rgba(0,0,0,0.02)] space-y-3.5 transition-all hover:border-slate-300"
              >
                {/* Swimlane Header */}
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div className="flex items-center space-x-2.5">
                    <span className="text-sm font-bold text-slate-900 tracking-tight">
                      {campName}
                    </span>
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-semibold uppercase ${
                      campBrand === 'MBI' ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' : 'bg-blue-50 text-blue-700 border border-blue-100'
                    }`}>
                      {campBrand}
                    </span>
                  </div>
                  <span className="text-xs text-slate-400 font-medium">
                    {campTasks.length} task{campTasks.length > 1 ? 's' : ''}
                  </span>
                </div>

                {/* 5 Cột Kanban trong Làn ngang này */}
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-3.5 items-start">
                  {KANBAN_COLUMNS.map(column => {
                    const colTasks = campTasks.filter(t => t.stage === column.id);

                    return (
                      <div
                        key={column.id}
                        onDragOver={handleDragOver}
                        onDrop={() => handleDropOnColumn(column.id)}
                        className="bg-slate-50/70 rounded-xl p-2.5 min-h-[110px] border border-slate-100 flex flex-col space-y-2.5 transition-colors hover:bg-slate-100/60"
                      >
                        {/* Mobile column header label */}
                        <div className="flex lg:hidden items-center justify-between text-[11px] font-bold text-slate-500 px-1">
                          <span>{column.label}</span>
                          <span>({colTasks.length})</span>
                        </div>

                        {colTasks.map(task => renderTaskCard(task))}

                        {colTasks.length === 0 && (
                          <div className="h-full min-h-[80px] rounded-lg border border-dashed border-slate-200/70 flex items-center justify-center text-[10px] text-slate-300 font-medium select-none">
                            Kéo task vào đây
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}

          {uniqueCampaigns.length === 0 && (
            <div className="p-12 text-center bg-white rounded-2xl border border-slate-200/60 text-slate-400 text-xs">
              Không tìm thấy task nào phù hợp với bộ lọc hiện tại.
            </div>
          )}

        </div>
      ) : (
        /* CHẾ ĐỘ KANBAN TRUYỀN THỐNG 5 CỘT (STANDARD KANBAN VIEW) */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 items-start">
          {KANBAN_COLUMNS.map(column => {
            const colTasks = filteredTasks.filter(t => t.stage === column.id);

            return (
              <div
                key={column.id}
                onDragOver={handleDragOver}
                onDrop={() => handleDropOnColumn(column.id)}
                className="bg-slate-100/60 rounded-3xl p-3.5 border border-slate-200/60 flex flex-col min-h-[480px] space-y-3.5 transition-colors"
              >
                {/* Header Cột */}
                <div className="flex items-center justify-between px-2 pt-1">
                  <div className="flex items-center space-x-2">
                    <span className={`w-2.5 h-2.5 rounded-full ${column.dotColor}`} />
                    <span className="text-xs font-bold text-slate-900">
                      {column.label}
                    </span>

                    {/* Feature 1: Auto-Archive icon on Done column */}
                    {column.id === 'done' && (
                      <div 
                        className="group/archive relative flex items-center cursor-help ml-0.5"
                        title="Tự động lưu trữ sau 7 ngày"
                      >
                        <Hourglass className="w-3.5 h-3.5 text-slate-400 hover:text-slate-600 transition-colors" strokeWidth={1.5} />
                        <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 hidden group-hover/archive:flex items-center px-2 py-0.5 rounded-md bg-slate-800 text-[10px] text-white whitespace-nowrap shadow-sm z-20 pointer-events-none">
                          Tự động lưu trữ sau 7 ngày
                        </span>
                      </div>
                    )}
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-white text-slate-700 shadow-2xs border border-slate-200/60">
                    {colTasks.length}
                  </span>
                </div>

                {/* Danh sách thẻ Task trong cột */}
                <div className="space-y-3 flex-1">
                  {colTasks.map(task => renderTaskCard(task))}

                  {colTasks.length === 0 && (
                    <div className="h-32 rounded-2xl border border-dashed border-slate-300 flex items-center justify-center text-slate-400 text-xs italic">
                      Kéo thả task vào đây
                    </div>
                  )}
                </div>

              </div>
            );
          })}
        </div>
      )}

      {/* 4. SLIDE-OVER FEEDBACK PANEL */}
      <SlideOverFeedbackPanel
        isOpen={isPanelOpen}
        onClose={() => setIsPanelOpen(false)}
        task={selectedTaskForPanel}
        teamMembers={teamMembers}
        onUpdateTask={(updatedTask) => {
          setSelectedTaskForPanel(updatedTask);
          const updated = tasks.map(t => t.id === updatedTask.id ? updatedTask : t);
          onUpdateTasks(updated);
        }}
        showToast={showToast}
        onMoveToRevision={handleMoveToRevision}
        onMoveToDone={handleMoveToDone}
        onAddComment={handleAddComment}
      />

      {/* 5. MODAL TẠO TASK / GỬI DUYỆT NỘI DUNG */}
      <CreateTaskModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onCreateTask={handleCreateTask}
        teamMembers={teamMembers}
        products={products}
      />

      {/* 6. MODAL ĐÚC KẾT BÀI HỌC A/B TEST */}
      <LearningCaptureModal
        isOpen={isLearningModalOpen}
        onClose={() => setIsLearningModalOpen(false)}
        task={learningTask}
        onSaveLearning={handleSaveLearning}
      />

    </div>
  );
}
