import React, { useState, useEffect } from 'react';
import { 
  X, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle, 
  Clock, 
  Send, 
  ChevronDown, 
  ChevronUp, 
  Download, 
  Eye, 
  FileText, 
  Image as ImageIcon, 
  Film, 
  Layers, 
  RotateCcw, 
  Check, 
  Building2, 
  User, 
  ShieldCheck, 
  AlertTriangle,
  Lock
} from 'lucide-react';
import UserSelector from '../common/UserSelector';
import { INITIAL_TEAM_MEMBERS } from '../../data/mockData';

export default function SlideOverFeedbackPanel({
  isOpen,
  onClose,
  task,
  teamMembers = INITIAL_TEAM_MEMBERS,
  onUpdateTask,
  showToast,
  onMoveToRevision,
  onMoveToDone,
  onAddComment
}) {
  const [isBriefExpanded, setIsBriefExpanded] = useState(true);
  const [feedbackText, setFeedbackText] = useState('');
  const [isAiChecking, setIsAiChecking] = useState(false);
  const [qaResult, setQaResult] = useState(null);

  // Sync / Reset khi chọn task mới
  useEffect(() => {
    if (task) {
      setIsBriefExpanded(true);
      setFeedbackText('');
      if (task.qaReport?.tested) {
        setQaResult(task.qaReport);
      } else {
        setQaResult(null);
      }
    }
  }, [task]);

  if (!isOpen || !task) return null;

  // Xử lý chạy AI Auto-QA
  const handleRunAiQa = () => {
    setIsAiChecking(true);
    setTimeout(() => {
      setIsAiChecking(false);
      const generatedQa = task.qaReport?.analysisText ? task.qaReport : {
        tested: true,
        textDensityScore: task.type === 'Design' ? 24 : 100,
        brandScore: 98,
        ctaScore: 95,
        analysisText: task.type === 'Design' 
          ? "Text trên banner hơi nhiều so với Brief (24% diện tích). Khuyến nghị giảm bớt câu phụ để tối ưu phân phối Meta Ads. Màu sắc #2563EB và nút CTA đúng chuẩn."
          : "Nội dung bám sát thông điệp cốt lõi và chân dung khách hàng trong Brief. CTA mạnh mẽ, mạch lạc."
      };
      setQaResult(generatedQa);
    }, 700);
  };

  // Gửi feedback và chuyển sang Revision
  const handleRequestRevision = () => {
    const comment = feedbackText.trim() || 'Cần chỉnh sửa theo lưu ý của Growth Marketer & Hệ thống QA.';
    onMoveToRevision(task.id, comment);
    setFeedbackText('');
  };

  // Duyệt và chuyển sang Done
  const handleApproveDone = () => {
    const comment = feedbackText.trim() || 'Đã kiểm tra và duyệt đạt chuẩn. Sẵn sàng lên chiến dịch!';
    onMoveToDone(task.id, comment);
    setFeedbackText('');
  };

  // Chỉ gửi comment trao đổi
  const handleSendOnlyComment = (e) => {
    e.preventDefault();
    if (!feedbackText.trim()) return;
    onAddComment(task.id, feedbackText.trim());
    setFeedbackText('');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop mờ nền */}
      <div 
        onClick={onClose}
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
      />

      {/* Slide-over Drawer (Chiếm ~40% chiều rộng màn hình máy tính) */}
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen sm:w-[540px] lg:w-[42vw] max-w-2xl bg-white shadow-2xl flex flex-col transform transition-all ease-in-out duration-300 animate-in slide-in-from-right">
          
          {/* 1. Header Slide-over */}
          <div className="p-4 sm:px-6 border-b border-slate-200/80 bg-slate-50/90 flex items-start justify-between gap-3">
            <div className="space-y-1 min-w-0">
              <div className="flex items-center space-x-2 flex-wrap gap-y-1">
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                  task.brand === 'Alpha' ? 'bg-blue-100 text-blue-800' : 'bg-emerald-100 text-emerald-800'
                }`}>
                  {task.brand === 'Alpha' ? '🚀 Khối Alpha' : '⚡ Khối Beta'}
                </span>

                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-200/80 text-slate-700">
                  {task.type}
                </span>

                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold flex items-center ${
                  task.stage === 'in_review' ? 'bg-amber-100 text-amber-900' :
                  task.stage === 'revision' ? 'bg-rose-100 text-rose-900' :
                  task.stage === 'done' ? 'bg-emerald-100 text-emerald-900' :
                  task.stage === 'in_progress' ? 'bg-indigo-100 text-indigo-900' :
                  'bg-slate-100 text-slate-700'
                }`}>
                  {task.stage === 'in_review' ? '🟡 Chờ Duyệt (In Review)' :
                   task.stage === 'revision' ? '🔴 Yêu Cầu Sửa (Revision)' :
                   task.stage === 'done' ? '🟢 Hoàn Thành (Done)' :
                   task.stage === 'in_progress' ? '🔵 Đang Làm (In Progress)' :
                   '⚪ Chưa Bắt Đầu (Not Started)'}
                </span>

                {task.isOverdue && (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-50 text-rose-700 border border-rose-200 flex items-center">
                    <Clock className="w-3 h-3 mr-1 text-rose-500" />
                    Trễ {task.overdueDays} ngày
                  </span>
                )}
              </div>

              <h2 className="text-base font-bold text-slate-900 leading-snug">
                {task.title}
              </h2>

              <div className="flex items-center space-x-2 text-xs text-slate-500 pt-1 flex-wrap gap-y-1">
                <span>Chiến dịch: <strong className="text-slate-700">{task.campaign}</strong></span>
                <span>•</span>
                <span className="flex items-center space-x-1.5">
                  <span className="text-slate-400">Phụ trách:</span>
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
                      if (showToast) {
                        showToast(`Đã chuyển giao task cho ${member.name}!`);
                      }
                    }}
                    variant="inline"
                    disabled={task.isLocked}
                  />
                </span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-200/60 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Banner Cảnh Báo Nếu Task Đang Bị Khóa Bởi Master Plan */}
          {task.isLocked && (
            <div className="p-3.5 bg-amber-50 border-b border-amber-200 text-amber-900 text-xs flex items-center space-x-2.5">
              <div className="w-6 h-6 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
                <Lock className="w-3.5 h-3.5" />
              </div>
              <div className="flex-1">
                <p className="font-bold text-amber-950">Task đang bị khóa!</p>
                <p className="text-[11px] text-amber-800">
                  {task.lockMessage || 'Chờ Ban Giám Đốc duyệt Master Plan để mở khóa triển khai.'}
                </p>
              </div>
            </div>
          )}

          {/* 2. Nội dung cuộn chính */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
            
            {/* PHẦN 1: PREVIEW TÀI NGUYÊN (Banner hình ảnh / Ad Copy / Video) */}
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center">
                  <Eye className="w-3.5 h-3.5 mr-1.5 text-indigo-600" />
                  Bản Thảo Đang Chờ Duyệt (Asset Preview)
                </h3>
                {task.assetPreview?.version && (
                  <span className="text-[11px] font-semibold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">
                    {task.assetPreview.version}
                  </span>
                )}
              </div>

              {/* Preview cho loại DESIGN / BANNER */}
              {task.type === 'Design' && (
                <div className="rounded-2xl border border-slate-200 overflow-hidden bg-slate-950 shadow-sm">
                  {/* Thanh thông tin kỹ thuật */}
                  <div className="bg-slate-900 px-3.5 py-2 text-[11px] text-slate-300 flex items-center justify-between border-b border-slate-800">
                    <span className="font-mono text-slate-400 truncate">{task.assetPreview?.assetName || 'banner_export.png'}</span>
                    <span className="font-semibold text-indigo-400">{task.assetPreview?.dimensions || '1080x1080'}</span>
                  </div>

                  {/* Banner Mockup Canvas hoặc Ảnh upload thực tế */}
                  {task.assetPreview?.imageUrl ? (
                    <div className="bg-slate-900 flex items-center justify-center p-4 max-h-96 overflow-hidden">
                      <img 
                        src={task.assetPreview.imageUrl} 
                        alt={task.title}
                        className="max-h-80 w-auto object-contain rounded-xl shadow-lg border border-slate-800"
                      />
                    </div>
                  ) : (
                    <div className={`p-6 bg-gradient-to-br ${task.assetPreview?.previewBg || 'from-blue-600 to-indigo-800'} text-white aspect-square sm:aspect-[4/3] flex flex-col justify-between relative`}>
                      
                      {/* Top Tag & Logo */}
                      <div className="flex items-center justify-between">
                        <span className="px-2.5 py-1 rounded-md text-[11px] font-extrabold bg-white/20 backdrop-blur-md uppercase tracking-wider">
                          {task.assetPreview?.mockupOffer || 'Ưu Đãi Đặc Biệt'}
                        </span>
                        <span className="text-xs font-bold tracking-tight opacity-90">
                          {task.brand === 'Alpha' ? 'TECHCORP • ALPHA' : 'TECHCORP • BETA'}
                        </span>
                      </div>

                      {/* Middle Headline */}
                      <div className="my-auto space-y-2">
                        <h4 className="text-lg sm:text-xl font-black leading-tight tracking-tight uppercase drop-shadow-sm">
                          {task.assetPreview?.mockupTitle || task.title}
                        </h4>
                        <p className="text-xs text-white/80 line-clamp-2 max-w-md font-medium">
                          {task.assetPreview?.mockupSubtitle || task.creativeBrief?.keyMessage}
                        </p>
                      </div>

                      {/* Bottom CTA & Trust Elements */}
                      <div className="flex items-center justify-between pt-2 border-t border-white/20">
                        <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-white text-slate-900 font-bold text-xs shadow-md">
                          <span>{task.assetPreview?.mockupCta || 'Đăng Ký Ngay'}</span>
                          <span className="ml-1 font-black">→</span>
                        </div>
                        <span className="text-[10px] text-white/70 font-mono">
                          {task.brand === 'Alpha' ? 'techcorp.cloud' : 'techcorp.solutions'}
                        </span>
                      </div>

                    </div>
                  )}

                  {/* Thanh chân preview */}
                  <div className="bg-slate-900 px-3.5 py-2 text-[11px] text-slate-400 flex items-center justify-between">
                    <span>Định dạng: {task.assetPreview?.format || 'PNG Hi-Res'}</span>
                    <button className="text-indigo-400 hover:text-indigo-300 font-semibold flex items-center">
                      <Download className="w-3 h-3 mr-1" /> Tải file gốc
                    </button>
                  </div>
                </div>
              )}

              {/* Preview cho loại CONTENT / COPY */}
              {task.type === 'Content' && (
                <div className="rounded-2xl border border-slate-200 bg-slate-50/50 p-4 space-y-3">
                  <div className="flex items-center justify-between text-[11px] text-slate-400 pb-2 border-b border-slate-200">
                    <span className="flex items-center font-semibold text-slate-600">
                      <FileText className="w-3.5 h-3.5 mr-1 text-indigo-600" />
                      Bản thảo nội dung quảng cáo
                    </span>
                    <span>{task.assetPreview?.wordCount || 80} từ</span>
                  </div>

                  <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-2xs space-y-2.5">
                    <h4 className="font-bold text-slate-900 text-sm">
                      {task.assetPreview?.headline || task.title}
                    </h4>
                    <p className="text-xs text-slate-700 leading-relaxed whitespace-pre-line font-mono bg-slate-50 p-3 rounded-lg border border-slate-100">
                      {task.assetPreview?.primaryText || task.creativeBrief?.keyMessage}
                    </p>
                    {task.assetPreview?.ctaButton && (
                      <div className="pt-1">
                        <span className="inline-block px-3 py-1 bg-indigo-50 text-indigo-700 border border-indigo-200 rounded-lg text-xs font-bold">
                          🔘 Nút CTA: {task.assetPreview.ctaButton}
                        </span>
                      </div>
                    )}

                    {/* Hiển thị Hình ảnh/Reference đính kèm nếu có */}
                    {task.assetPreview?.imageUrl && (
                      <div className="pt-3 border-t border-slate-100 space-y-1.5">
                        <span className="text-[11px] font-bold text-slate-600 flex items-center">
                          <ImageIcon className="w-3.5 h-3.5 mr-1 text-indigo-600" />
                          Hình ảnh tham khảo / Bản phác thảo đính kèm:
                        </span>
                        <div className="rounded-xl overflow-hidden border border-slate-200 bg-slate-900 p-2 max-h-64 flex items-center justify-center">
                          <img 
                            src={task.assetPreview.imageUrl} 
                            alt="Reference Asset" 
                            className="max-h-60 w-auto object-contain rounded-lg"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Preview cho loại VIDEO */}
              {task.type === 'Video' && (
                <div className="rounded-2xl border border-slate-200 bg-slate-900 text-white p-4 space-y-3">
                  <div className="flex items-center justify-between text-xs text-slate-300 pb-2 border-b border-slate-800">
                    <span className="flex items-center font-semibold">
                      <Film className="w-3.5 h-3.5 mr-1.5 text-indigo-400" />
                      Video Storyboard ({task.assetPreview?.duration || '0:15'})
                    </span>
                    <span className="text-[11px] text-slate-400 font-mono">{task.assetPreview?.resolution || '9:16'}</span>
                  </div>

                  <div className="p-4 bg-slate-800/80 rounded-xl space-y-3">
                    <div className="text-xs">
                      <span className="text-indigo-400 font-bold">Hook 3 giây đầu: </span>
                      <span className="italic font-medium text-slate-200">"{task.assetPreview?.hook || 'Website bạn load mất mấy giây?'}"</span>
                    </div>

                    {task.assetPreview?.storyboard?.length > 0 && (
                      <div className="space-y-1.5 pt-1">
                        {task.assetPreview.storyboard.map((frame, idx) => (
                          <div key={idx} className="flex items-center space-x-2 text-[11px] bg-slate-900/70 p-2 rounded-lg">
                            <span className="font-mono text-indigo-400 font-bold shrink-0">{frame.sec}</span>
                            <span className="text-slate-300">{frame.scene}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}

            </div>

            {/* PHẦN 2: ORIGINAL BRIEF (Yêu Cầu Ban Đầu / Creative Brief) */}
            <div className="rounded-2xl border border-indigo-100 bg-indigo-50/40 overflow-hidden">
              <button
                onClick={() => setIsBriefExpanded(!isBriefExpanded)}
                className="w-full px-4 py-3 flex items-center justify-between text-left hover:bg-indigo-50/80 transition-colors"
              >
                <div className="flex items-center space-x-2">
                  <Sparkles className="w-4 h-4 text-indigo-600" />
                  <span className="text-xs font-bold text-indigo-950">
                    Yêu Cầu Ban Đầu (Creative Brief)
                  </span>
                  <span className="text-[10px] font-semibold bg-white text-indigo-700 px-2 py-0.2 rounded-full border border-indigo-200">
                    Đối chiếu chuẩn
                  </span>
                </div>
                {isBriefExpanded ? (
                  <ChevronUp className="w-4 h-4 text-indigo-600" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-indigo-600" />
                )}
              </button>

              {isBriefExpanded && (
                <div className="p-4 pt-1 space-y-3 text-xs bg-white/70 border-t border-indigo-100">
                  <div>
                    <span className="font-bold text-slate-800">Mục tiêu chiến dịch (Objective):</span>
                    <p className="text-slate-600 mt-0.5">{task.creativeBrief?.objective || 'Chưa cập nhật'}</p>
                  </div>
                  <div>
                    <span className="font-bold text-slate-800">Khách hàng mục tiêu (Target Persona):</span>
                    <p className="text-slate-600 mt-0.5">{task.creativeBrief?.targetPersona || 'Chưa cập nhật'}</p>
                  </div>
                  <div>
                    <span className="font-bold text-slate-800">Thông điệp cốt lõi (Key Message):</span>
                    <p className="text-slate-600 mt-0.5 text-indigo-900 font-medium">{task.creativeBrief?.keyMessage || 'Chưa cập nhật'}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-2 pt-1 text-[11px]">
                    <div>
                      <span className="font-bold text-slate-700">Quy cách bàn giao:</span>
                      <p className="text-slate-500">{task.creativeBrief?.deliverables || 'Chưa có'}</p>
                    </div>
                    <div>
                      <span className="font-bold text-slate-700">Tone of Voice:</span>
                      <p className="text-slate-500">{task.creativeBrief?.toneOfVoice || 'Chuyên nghiệp'}</p>
                    </div>
                  </div>
                  {task.creativeBrief?.brandSpecs && (
                    <div className="pt-1 text-[11px] text-slate-500 bg-slate-100/80 p-2 rounded-lg">
                      <strong className="text-slate-700">Brand Specs:</strong> {task.creativeBrief.brandSpecs}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* PHẦN 3: FEEDBACK CHAT & HỆ THỐNG AUTO-QA */}
            <div className="space-y-3 pt-2">
              
              {/* Nút bấm ✨ Hệ Thống Kiểm tra nhanh (Auto-QA) */}
              <div className="p-3.5 rounded-2xl bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 border border-indigo-200/80 space-y-3 shadow-2xs">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="p-1.5 rounded-xl bg-indigo-600 text-white shadow-xs">
                      <Sparkles className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-indigo-950">Hệ Thống Auto-QA</h4>
                      <p className="text-[11px] text-indigo-700">Tự động đối chiếu asset với Brief & chuẩn Meta Ads</p>
                    </div>
                  </div>

                  <button
                    onClick={handleRunAiQa}
                    disabled={isAiChecking}
                    className="inline-flex items-center px-3.5 py-1.5 rounded-full text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white shadow-xs transition-all disabled:opacity-50"
                  >
                    <Sparkles className={`w-3.5 h-3.5 mr-1.5 ${isAiChecking ? 'animate-spin' : ''}`} />
                    <span>{isAiChecking ? 'Đang phân tích...' : 'Kiểm Tra Nhanh'}</span>
                  </button>
                </div>

                {/* Kết quả sau khi bấm Auto-QA */}
                {qaResult && (
                  <div className="p-3 bg-white rounded-xl border border-indigo-100 space-y-2 text-xs animate-in fade-in duration-200">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-1.5">
                      <span className="font-bold text-slate-800 flex items-center">
                        <ShieldCheck className="w-4 h-4 text-emerald-600 mr-1" />
                        Chẩn đoán Hệ thống:
                      </span>
                      <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full">
                        Hoàn thành
                      </span>
                    </div>

                    <p className="text-slate-700 text-xs leading-relaxed">
                      {qaResult.analysisText}
                    </p>

                    <div className="grid grid-cols-3 gap-1.5 pt-1 text-[11px]">
                      <div className="p-1.5 bg-slate-50 rounded-lg text-center">
                        <span className="text-slate-400 block text-[10px]">Mật độ Text</span>
                        <span className={`font-bold ${qaResult.textDensityScore > 20 && task.type === 'Design' ? 'text-amber-600' : 'text-emerald-600'}`}>
                          {qaResult.textDensityScore > 20 && task.type === 'Design' ? '24% (Hơi nhiều)' : 'Đạt chuẩn'}
                        </span>
                      </div>

                      <div className="p-1.5 bg-slate-50 rounded-lg text-center">
                        <span className="text-slate-400 block text-[10px]">Brand Color</span>
                        <span className="font-bold text-emerald-600">100% Khớp</span>
                      </div>

                      <div className="p-1.5 bg-slate-50 rounded-lg text-center">
                        <span className="text-slate-400 block text-[10px]">Đúng Brief</span>
                        <span className="font-bold text-emerald-600">Rõ ràng</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Lịch sử Trao đổi & Feedback Chat */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Lịch Sử Phản Hồi & Trao Đổi
                </h4>

                <div className="space-y-2.5 max-h-[160px] overflow-y-auto pr-1">
                  {(task.feedbackChat && task.feedbackChat.length > 0) ? (
                    task.feedbackChat.map((chat) => (
                      <div 
                        key={chat.id} 
                        className={`p-2.5 rounded-xl text-xs space-y-1 ${
                          chat.sender === 'Marketer' 
                            ? 'bg-indigo-50/70 border border-indigo-100 ml-4' 
                            : 'bg-slate-100/80 mr-4'
                        }`}
                      >
                        <div className="flex items-center justify-between text-[10px]">
                          <span className="font-bold text-slate-800">{chat.name}</span>
                          <span className="text-slate-400">{chat.time}</span>
                        </div>
                        <p className="text-slate-700 leading-normal">{chat.text}</p>
                      </div>
                    ))
                  ) : (
                    <p className="text-xs text-slate-400 italic py-2 text-center">
                      Chưa có trao đổi nào. Hãy nhập phản hồi đầu tiên phía dưới.
                    </p>
                  )}
                </div>
              </div>

            </div>

          </div>

          {/* 3. Footer Form Nhập Phản Hồi & 2 Nút Duyệt / Sửa */}
          <div className="p-4 sm:px-6 border-t border-slate-200 bg-white space-y-3">
            
            {/* Textarea nhập nhận xét */}
            <div className="relative">
              <textarea
                value={feedbackText}
                onChange={(e) => setFeedbackText(e.target.value)}
                placeholder="Nhập yêu cầu sửa đổi hoặc ghi chú trước khi duyệt bài..."
                rows={2}
                className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-slate-800 placeholder-slate-400 resize-none"
              />
              {feedbackText.trim() && (
                <button
                  type="button"
                  onClick={handleSendOnlyComment}
                  className="absolute right-2 bottom-3 p-1 rounded-lg bg-slate-100 text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 transition-colors"
                  title="Chỉ gửi bình luận trao đổi"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* 2 Nút hành động cốt lõi */}
            <div className="grid grid-cols-2 gap-3">
              {/* Nút 1: Yêu cầu sửa (Move to Revision) - Màu cam */}
              <button
                type="button"
                onClick={handleRequestRevision}
                disabled={task.isLocked}
                className="inline-flex items-center justify-center px-4 py-2 rounded-xl text-xs font-bold text-white bg-amber-600 hover:bg-amber-700 disabled:opacity-40 disabled:cursor-not-allowed shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5 mr-1.5" />
                <span>Yêu Cầu Sửa (Revision)</span>
              </button>

              {/* Nút 2: Duyệt (Move to Done) - Màu xanh lá */}
              <button
                type="button"
                onClick={handleApproveDone}
                disabled={task.isLocked}
                className="inline-flex items-center justify-center px-4 py-2 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 disabled:opacity-40 disabled:cursor-not-allowed shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer"
              >
                <Check className="w-3.5 h-3.5 mr-1.5" />
                <span>Duyệt Bài (Move to Done)</span>
              </button>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
