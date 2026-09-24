import React, { useState, useRef } from 'react';
import { 
  X, 
  Sparkles, 
  Send, 
  Upload, 
  Image as ImageIcon, 
  FileText, 
  Calendar, 
  User, 
  Layers, 
  AlertCircle,
  Trash2,
  CheckCircle2,
  Link as LinkIcon
} from 'lucide-react';
import { INITIAL_PRODUCTS } from '../../data/mockData';
import { uploadCreativeAsset } from '../../services/assetService';

export default function CreateTaskModal({
  isOpen,
  onClose,
  onCreateTask,
  teamMembers = [],
  products = INITIAL_PRODUCTS
}) {
  // Form State
  const [title, setTitle] = useState('');
  const [productId, setProductId] = useState('mbi-einvoice');
  const [stage, setStage] = useState('in_review'); // Mặc định: In Review để nộp bài thẳng
  const [taskType, setTaskType] = useState('Content'); // 'Content' | 'Design' | 'Video'
  const [assignee, setAssignee] = useState(teamMembers[0]?.name || 'Hoàng Minh Khôi');
  const [deadline, setDeadline] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 3);
    return d.toISOString().split('T')[0];
  });
  const [priority, setPriority] = useState('normal'); // 'normal' | 'high'
  const [content, setContent] = useState('');
  
  // Image Upload State
  const [imagePreview, setImagePreview] = useState(null);
  const [imageFileName, setImageFileName] = useState('');
  const [imageUrlInput, setImageUrlInput] = useState('');
  const [showUrlInput, setShowUrlInput] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  if (!isOpen) return null;

  // Xử lý chọn file ảnh từ máy và tải lên Supabase Storage
  const handleFileSelect = async (file) => {
    if (!file || !file.type.startsWith('image/')) return;
    setImageFileName(file.name);
    
    // Hiển thị preview tức thời
    const reader = new FileReader();
    reader.onload = (e) => {
      setImagePreview(e.target.result);
    };
    reader.readAsDataURL(file);

    // Tải lên Supabase Storage (nếu đã kết nối)
    try {
      const uploadRes = await uploadCreativeAsset(file, 'task-create');
      if (uploadRes?.publicUrl && !uploadRes.isLocalFallback) {
        setImagePreview(uploadRes.publicUrl);
      }
    } catch (err) {
      console.warn('Fallback DataURL cho asset preview:', err);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleRemoveImage = () => {
    setImagePreview(null);
    setImageFileName('');
    setImageUrlInput('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleApplyUrl = () => {
    if (imageUrlInput.trim()) {
      setImagePreview(imageUrlInput.trim());
      setImageFileName('Ảnh tham khảo từ liên kết');
      setShowUrlInput(false);
    }
  };

  // Tính số từ bài viết
  const wordCount = content.trim() ? content.trim().split(/\s+/).length : 0;

  // Insert nhanh mẫu content
  const handleInsertTemplate = (type) => {
    if (type === 'ad_copy') {
      setContent(prev => (prev ? prev + '\n\n' : '') + 
`🔥 [HEADLINE]: Tối ưu hóa đơn điện tử — Giải pháp toàn diện cho doanh nghiệp!
👉 [BODY]: Tự động hóa truyền dữ liệu sang Cơ quan Thuế, tích hợp phần mềm kế toán chỉ trong 3 phút. Hơn 50,000+ doanh nghiệp đã tin dùng.
🎁 [ƯU ĐÃI]: Tặng ngay 500 số hóa đơn cho khách hàng đăng ký mới tuần này.
📲 [CTA]: Đăng ký tư vấn miễn phí ngay hôm nay!`);
    } else if (type === 'social') {
      setContent(prev => (prev ? prev + '\n\n' : '') + 
`🚀 BẬT MÍ CÁCH TIẾT KIỆM 70% THỜI GIAN XỬ LÝ HÓA ĐƠN ĐẦU VÀO!
Kế toán viên thường mất hàng giờ đối chiếu hóa đơn sai sót?
Với công nghệ OCR tự động:
✅ Quét và nhận diện trong 2 giây
✅ Cảnh báo hóa đơn từ doanh nghiệp có rủi ro thuế
✅ Xuất dữ liệu trực tiếp vào hệ thống ERP
👉 Để lại bình luận hoặc inbox để nhận cẩm nang hướng dẫn chi tiết!`);
    }
  };

  // Submit Handler
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) {
      alert('Vui lòng nhập Tiêu đề Task!');
      return;
    }

    const selectedProd = products.find(p => p.id === productId) || products[0];
    const brand = selectedProd?.brand || (productId.startsWith('mbi') ? 'MBI' : 'MBC');

    // Tìm role của assignee
    const memberObj = teamMembers.find(m => m.name === assignee);
    const assigneeRole = memberObj?.role || (taskType === 'Content' ? 'Copywriter' : taskType === 'Design' ? 'UI Designer' : 'Video Creator');

    // Định dạng deadline hiển thị
    const [year, month, day] = deadline.split('-');
    const formattedDeadline = `${day}/${month}/${year}`;

    const newTask = {
      id: 'tsk-' + Date.now().toString().slice(-4),
      title: title.trim(),
      campaign: selectedProd?.name ? `Chiến dịch ${selectedProd.name}` : 'Chiến dịch Mới',
      brand: brand,
      team: taskType,
      type: taskType,
      assignee: assignee,
      assigneeRole: assigneeRole,
      stage: stage, // Cột Kanban đích (mặc định in_review)
      status: stage === 'in_review' ? 'pending' : (stage === 'done' ? 'completed' : 'active'),
      statusLabel: stage === 'in_review' ? 'Chờ duyệt' : 
                   stage === 'revision' ? 'Yêu cầu sửa' : 
                   stage === 'done' ? 'Hoàn thành' : 
                   stage === 'in_progress' ? 'Đang làm' : 'Chưa bắt đầu',
      deadline: formattedDeadline,
      isOverdue: false,
      severity: priority === 'high' ? 'danger' : 'normal',
      urgency: priority === 'high' ? 'danger' : 'normal',
      creativeBrief: {
        objective: `Quảng bá sản phẩm ${selectedProd?.name || 'Mắt Bão'}`,
        targetPersona: 'Chủ doanh nghiệp, Quản lý tài chính, IT Manager',
        keyMessage: content.slice(0, 150) || title.trim(),
        deliverables: `Tài nguyên ${taskType} chuẩn kích thước và thông điệp`,
        toneOfVoice: 'Chuyên nghiệp, ấn tượng, thôi thúc chuyển đổi'
      },
      assetPreview: {
        type: taskType.toLowerCase(),
        assetName: imageFileName || `${taskType}_Asset_${Date.now().toString().slice(-4)}`,
        dimensions: '1080x1080',
        format: imageFileName ? (imageFileName.endsWith('.png') ? 'PNG' : 'JPG') : 'Draft Copy',
        imageUrl: imagePreview || null,
        headline: title.trim(),
        primaryText: content.trim() || 'Nội dung bài viết chưa có bản thảo chi tiết.',
        ctaButton: 'Đăng Ký Ngay',
        wordCount: wordCount,
        uploadedAt: 'Vừa xong',
        version: 'v1.0 (Nộp bài duyệt)'
      },
      qaReport: { tested: false },
      feedbackChat: [
        {
          id: 'fb-' + Date.now(),
          sender: assignee,
          role: 'Assignee',
          time: 'Vừa xong',
          message: `Đã nộp bài "${title.trim()}" chuyển thẳng vào trạng thái ${stage === 'in_review' ? 'Chờ duyệt (In Review)' : stage}. Quản lý vui lòng xem bản thảo và phản hồi!`
        }
      ]
    };

    onCreateTask(newTask);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-3 sm:p-6">
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
      />

      {/* Modal Dialog (Rộng rãi 750px - 800px chuẩn Material 3) */}
      <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-slate-200/90 overflow-hidden flex flex-col max-h-[92vh] animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="p-5 sm:px-8 border-b border-slate-200/80 bg-slate-50/70 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 border border-indigo-100/80 flex items-center justify-center shadow-2xs shrink-0">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight flex items-center">
                Tạo Task / Gửi Duyệt Nội Dung
                <span className="ml-2.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-indigo-50 text-indigo-700 border border-indigo-150 uppercase tracking-wider">
                  Nộp Bài Mới
                </span>
              </h2>
              <p className="text-xs text-slate-500">
                Điền nội dung bài viết, kịch bản hoặc đính kèm ảnh để chuyển thẳng bài cho quản lý duyệt.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-200/60 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Form Body */}
        <form onSubmit={handleSubmit} className="p-5 sm:p-8 space-y-5 overflow-y-auto flex-1 text-slate-800">
          
          {/* HÀNG 1: Tiêu đề Task */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Tiêu đề Task <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ví dụ: Viết bài Social quảng bá Hóa đơn điện tử MBI..."
              className="w-full px-4 py-2.5 text-xs sm:text-sm bg-slate-50 rounded-2xl border border-slate-200 focus:outline-none focus:bg-white focus:border-indigo-400 text-slate-900 transition-all font-medium"
            />
          </div>

          {/* HÀNG 2: Sản phẩm & Trạng thái đích */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Sản phẩm / Nhánh */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center">
                <Layers className="w-3.5 h-3.5 mr-1 text-indigo-600" />
                Sản phẩm / Nhánh thương hiệu
              </label>
              <select
                value={productId}
                onChange={(e) => setProductId(e.target.value)}
                className="w-full px-3.5 py-2.5 text-xs bg-slate-50 rounded-2xl border border-slate-200 focus:outline-none focus:bg-white focus:border-indigo-400 text-slate-900 font-medium"
              >
                <optgroup label="🏢 MBC (Matbao-corp)">
                  {products.filter(p => p.brand === 'MBC').map(p => (
                    <option key={p.id} value={p.id}>
                      MBC — {p.name}
                    </option>
                  ))}
                </optgroup>
                <optgroup label="🧾 MBI (Matbao-invoice)">
                  {products.filter(p => p.brand === 'MBI').map(p => (
                    <option key={p.id} value={p.id}>
                      MBI — {p.name}
                    </option>
                  ))}
                </optgroup>
              </select>
            </div>

            {/* Trạng thái Kanban đích */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center justify-between">
                <span>Chuyển thẳng vào cột</span>
                <span className="text-[10px] text-amber-700 font-bold bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                  Khuyên dùng: In Review
                </span>
              </label>
              <select
                value={stage}
                onChange={(e) => setStage(e.target.value)}
                className="w-full px-3.5 py-2.5 text-xs bg-slate-50 rounded-2xl border border-amber-300 focus:outline-none focus:bg-white focus:border-amber-500 text-slate-900 font-bold"
              >
                <option value="in_review">🟡 In Review (Chờ duyệt) — Nộp bài ngay</option>
                <option value="not_started">⚪ Not Started (Chưa bắt đầu)</option>
                <option value="in_progress">🔵 In Progress (Đang thực hiện)</option>
                <option value="revision">🔴 Revision (Yêu cầu sửa)</option>
                <option value="done">🟢 Done (Hoàn thành)</option>
              </select>
            </div>

          </div>

          {/* HÀNG 3: Loại Task, Người phụ trách & Deadline */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            
            {/* Loại Task */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Loại Task
              </label>
              <div className="flex rounded-2xl bg-slate-100 p-1 border border-slate-200">
                {['Content', 'Design', 'Video'].map(type => (
                  <button
                    type="button"
                    key={type}
                    onClick={() => setTaskType(type)}
                    className={`flex-1 py-1.5 rounded-xl text-xs font-bold transition-all ${
                      taskType === type 
                        ? 'bg-white text-indigo-700 shadow-2xs' 
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* Người phụ trách / Người nộp */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center">
                <User className="w-3.5 h-3.5 mr-1 text-slate-400" />
                Người nộp / Phụ trách
              </label>
              <select
                value={assignee}
                onChange={(e) => setAssignee(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-slate-50 rounded-2xl border border-slate-200 focus:outline-none focus:bg-white text-slate-900 font-medium"
              >
                {teamMembers.map(m => (
                  <option key={m.id || m.name} value={m.name}>
                    {m.name} ({m.role})
                  </option>
                ))}
              </select>
            </div>

            {/* Deadline */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center">
                <Calendar className="w-3.5 h-3.5 mr-1 text-slate-400" />
                Hạn chót duyệt (Deadline)
              </label>
              <input
                type="date"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-slate-50 rounded-2xl border border-slate-200 focus:outline-none focus:bg-white text-slate-900 font-medium"
              />
            </div>

          </div>

          {/* HÀNG 4: 📝 KHUNG GHI CONTENT (RẤT QUAN TRỌNG) */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center">
                <span className="p-1 rounded-md bg-purple-100 text-purple-700 mr-1.5">📝</span>
                Nội dung bài viết / Ad Copy / Kịch bản
              </label>
              <div className="flex items-center space-x-2">
                <button
                  type="button"
                  onClick={() => handleInsertTemplate('ad_copy')}
                  className="text-[10px] font-bold text-indigo-600 hover:text-indigo-800 bg-indigo-50 px-2 py-0.5 rounded-md transition-colors"
                >
                  + Mẫu Ad Copy
                </button>
                <button
                  type="button"
                  onClick={() => handleInsertTemplate('social')}
                  className="text-[10px] font-bold text-purple-600 hover:text-purple-800 bg-purple-50 px-2 py-0.5 rounded-md transition-colors"
                >
                  + Mẫu Social Post
                </button>
                <span className="text-[11px] text-slate-400 font-medium bg-slate-100 px-2 py-0.5 rounded-full">
                  {wordCount} từ
                </span>
              </div>
            </div>

            <textarea
              rows={6}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Nhập toàn bộ nội dung bài đăng Social, Ad Copy quảng cáo, dàn ý kịch bản hoặc lời bình tại đây... Hỗ trợ xuống dòng thoải mái."
              className="w-full p-4 text-xs sm:text-sm bg-slate-50/80 rounded-2xl border border-slate-200 focus:outline-none focus:bg-white focus:border-indigo-400 text-slate-900 leading-relaxed transition-all font-mono resize-y min-h-[140px]"
            />
          </div>

          {/* HÀNG 5: 🖼️ KHUNG UPLOAD HÌNH ẢNH REF */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center">
                <span className="p-1 rounded-md bg-blue-100 text-blue-700 mr-1.5">🖼️</span>
                Hình ảnh tham khảo / Banner nháp đính kèm
              </label>
              <button
                type="button"
                onClick={() => setShowUrlInput(!showUrlInput)}
                className="text-[10px] font-bold text-slate-500 hover:text-slate-800 flex items-center"
              >
                <LinkIcon className="w-3 h-3 mr-1" />
                {showUrlInput ? 'Ẩn nhập URL' : 'Dán đường dẫn ảnh'}
              </button>
            </div>

            {/* Dán URL ảnh ngoài */}
            {showUrlInput && (
              <div className="flex items-center space-x-2 p-2 bg-slate-100 rounded-xl animate-in fade-in duration-200">
                <input
                  type="text"
                  placeholder="Dán URL hình ảnh (vd: https://images.unsplash.com/...)"
                  value={imageUrlInput}
                  onChange={(e) => setImageUrlInput(e.target.value)}
                  className="flex-1 px-3 py-1.5 text-xs bg-white rounded-lg border border-slate-200 focus:outline-none"
                />
                <button
                  type="button"
                  onClick={handleApplyUrl}
                  className="px-3 py-1.5 text-xs font-bold bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 shrink-0"
                >
                  Áp dụng
                </button>
              </div>
            )}

            {/* Khu vực Upload / Drag & Drop */}
            {!imagePreview ? (
              <div
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onClick={() => fileInputRef.current?.click()}
                className={`border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-all ${
                  isDragging 
                    ? 'border-indigo-500 bg-indigo-50/50 scale-[0.99]' 
                    : 'border-slate-300 hover:border-indigo-400 bg-slate-50/50 hover:bg-slate-50'
                }`}
              >
                <input
                  type="file"
                  ref={fileInputRef}
                  accept="image/*"
                  onChange={(e) => handleFileSelect(e.target.files?.[0])}
                  className="hidden"
                />
                <div className="flex flex-col items-center justify-center space-y-2">
                  <div className="p-3 rounded-full bg-indigo-50 text-indigo-600">
                    <Upload className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-700">
                      Kéo thả hình ảnh vào đây, hoặc <span className="text-indigo-600 underline">chọn tệp từ máy</span>
                    </p>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      Hỗ trợ PNG, JPG, JPEG, GIF, WebP (Tối đa 15MB)
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              /* Đã có ảnh preview */
              <div className="relative rounded-2xl border border-slate-200 overflow-hidden bg-slate-900 group">
                <div className="p-3 bg-slate-800 text-white text-xs flex items-center justify-between">
                  <span className="font-mono text-slate-300 truncate max-w-sm flex items-center">
                    <ImageIcon className="w-3.5 h-3.5 mr-1.5 text-indigo-400" />
                    {imageFileName || 'Ảnh tham khảo'}
                  </span>
                  <button
                    type="button"
                    onClick={handleRemoveImage}
                    className="p-1 rounded-lg bg-rose-600/80 hover:bg-rose-600 text-white transition-colors flex items-center text-[10px] font-bold px-2"
                  >
                    <Trash2 className="w-3 h-3 mr-1" /> Xóa ảnh
                  </button>
                </div>
                <div className="max-h-60 flex items-center justify-center bg-slate-950 p-2">
                  <img
                    src={imagePreview}
                    alt="Preview reference"
                    className="max-h-56 max-w-full object-contain rounded-lg shadow-md"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Footer Actions - Soft SaaS Minimalism */}
          <div className="pt-4 border-t border-slate-200/80 flex items-center justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 hover:border-slate-300 transition-colors cursor-pointer"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 shadow-sm transition-all flex items-center space-x-2 active:scale-98 cursor-pointer"
            >
              <Send className="w-3.5 h-3.5 text-indigo-200" strokeWidth={2.5} />
              <span>Lưu & Gửi Duyệt</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
