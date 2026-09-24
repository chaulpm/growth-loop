import React, { useState, useEffect } from 'react';
import { Sparkles, Trophy, CheckCircle2, X, Bookmark } from 'lucide-react';

export default function LearningCaptureModal({
  isOpen,
  onClose,
  task,
  onSaveLearning
}) {
  const [selectedWinner, setSelectedWinner] = useState('variantA');
  const [learningText, setLearningText] = useState('');

  useEffect(() => {
    if (task) {
      const defaultVariantA = task.abTestVariants?.variantA || 'Variant A: Tặng 500 số Hóa đơn điện tử (CPL $3.20 - CVR 7.8%)';
      const defaultVariantB = task.abTestVariants?.variantB || 'Variant B: Miễn phí phần mềm kế toán 1 năm (CPL $4.20 - CVR 5.1%)';
      const defaultRationale = task.abTestVariants?.defaultRationale || 
        'Variant A mang lại CPL thấp hơn 24% và CVR vượt 53% nhờ thông điệp rõ ràng về số lượng cụ thể (500 số) đánh trúng tâm lý kế toán mùa quyết toán.';
      
      setSelectedWinner('variantA');
      setLearningText(defaultRationale);
    }
  }, [task]);

  if (!isOpen || !task) return null;

  const variantALabel = task.abTestVariants?.variantA || 'Variant A: Tặng 500 số HĐĐT (CPL $3.20)';
  const variantBLabel = task.abTestVariants?.variantB || 'Variant B: Miễn phí kế toán 1 năm (CPL $4.20)';

  const handleWinnerChange = (winner) => {
    setSelectedWinner(winner);
    if (winner === 'variantA') {
      setLearningText(task.abTestVariants?.defaultRationale || 
        'Variant A mang lại CPL thấp hơn 24% và CVR vượt 53% nhờ thông điệp rõ ràng về số lượng cụ thể (500 số) đánh trúng tâm lý kế toán mùa quyết toán.'
      );
    } else {
      setLearningText(
        'Variant B tiếp cận được nhiều Kế toán trưởng quan tâm giải pháp trọn gói dài hạn, tuy nhiên chi phí CPL cao hơn do offer phức tạp hơn.'
      );
    }
  };

  const handleSave = () => {
    if (onSaveLearning) {
      onSaveLearning({
        taskId: task.id,
        taskTitle: task.title,
        campaign: task.campaign,
        brand: task.brand,
        winner: selectedWinner,
        winnerLabel: selectedWinner === 'variantA' ? variantALabel : variantBLabel,
        learning: learningText
      });
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="bg-white w-full max-w-xl rounded-2xl p-6 sm:p-7 shadow-[0_10px_35px_rgba(0,0,0,0.06)] border border-slate-200/80 relative space-y-6 animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" strokeWidth={2} />
        </button>

        {/* Modal Header */}
        <div className="flex items-start space-x-3.5 pr-8">
          <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 border border-indigo-100/80 flex items-center justify-center shadow-2xs shrink-0">
            <Sparkles className="w-5 h-5" strokeWidth={2} />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h2 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
                Đúc kết bài học A/B Test
              </h2>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-100/60 uppercase tracking-wide">
                Closed Loop
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5 font-normal">
              Đóng vòng lặp thực thi và lưu trữ tri thức vào Thư viện Growth (Growth Library)
            </p>
          </div>
        </div>

        {/* Completed Task Card Info */}
        <div className="bg-slate-50/70 rounded-xl p-3.5 border border-slate-200/60 flex items-center justify-between">
          <div className="space-y-0.5 pr-3">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
              {task.brand} • {task.campaign}
            </span>
            <p className="text-xs font-semibold text-slate-800 line-clamp-1">
              {task.title}
            </p>
          </div>
          <span className="shrink-0 px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-100/80 uppercase tracking-wide flex items-center">
            <CheckCircle2 className="w-3.5 h-3.5 mr-1 text-emerald-600" strokeWidth={2.5} />
            Đã xong
          </span>
        </div>

        {/* Question: Pick the Winner */}
        <div className="space-y-2.5">
          <label className="text-xs font-bold text-slate-700 flex items-center justify-between">
            <span>Phương án nào là Winner (Chiến thắng)?</span>
            <span className="text-[11px] text-slate-400 font-normal">Chọn 1 phương án</span>
          </label>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Variant A */}
            <button
              type="button"
              onClick={() => handleWinnerChange('variantA')}
              className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer relative ${
                selectedWinner === 'variantA'
                  ? 'border-2 border-indigo-500 bg-indigo-50/40 shadow-2xs'
                  : 'border-slate-200/80 hover:border-slate-300 bg-white'
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className={`text-xs font-bold flex items-center ${selectedWinner === 'variantA' ? 'text-indigo-900' : 'text-slate-800'}`}>
                  <Trophy className={`w-3.5 h-3.5 mr-1.5 ${selectedWinner === 'variantA' ? 'text-indigo-600' : 'text-slate-400'}`} strokeWidth={2} />
                  Variant A
                </span>
                {selectedWinner === 'variantA' && (
                  <span className="w-2 h-2 rounded-full bg-indigo-600 ring-2 ring-indigo-200" />
                )}
              </div>
              <p className="text-xs text-slate-600 leading-snug">
                {variantALabel}
              </p>
            </button>

            {/* Variant B */}
            <button
              type="button"
              onClick={() => handleWinnerChange('variantB')}
              className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer relative ${
                selectedWinner === 'variantB'
                  ? 'border-2 border-indigo-500 bg-indigo-50/40 shadow-2xs'
                  : 'border-slate-200/80 hover:border-slate-300 bg-white'
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className={`text-xs font-bold flex items-center ${selectedWinner === 'variantB' ? 'text-indigo-900' : 'text-slate-800'}`}>
                  <Trophy className={`w-3.5 h-3.5 mr-1.5 ${selectedWinner === 'variantB' ? 'text-indigo-600' : 'text-slate-400'}`} strokeWidth={2} />
                  Variant B
                </span>
                {selectedWinner === 'variantB' && (
                  <span className="w-2 h-2 rounded-full bg-indigo-600 ring-2 ring-indigo-200" />
                )}
              </div>
              <p className="text-xs text-slate-600 leading-snug">
                {variantBLabel}
              </p>
            </button>
          </div>
        </div>

        {/* Editable Gemini Learning Summary */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-slate-700 flex items-center space-x-1.5">
              <Sparkles className="w-3.5 h-3.5 text-indigo-600" strokeWidth={2} />
              <span>Đúc kết bài học chiến dịch (Learning):</span>
            </label>
            <span className="text-[11px] text-slate-400 font-normal">Có thể chỉnh sửa</span>
          </div>

          <textarea
            rows={3}
            value={learningText}
            onChange={(e) => setLearningText(e.target.value)}
            className="w-full text-xs text-slate-800 font-normal p-3.5 rounded-xl bg-slate-50/60 border border-slate-200/80 focus:border-indigo-500 focus:bg-white focus:outline-none transition-all leading-relaxed placeholder-slate-400"
            placeholder="Nhập nhận định tại sao phương án này chiến thắng..."
          />
        </div>

        {/* Action Buttons - Soft Minimalist Style */}
        <div className="pt-2 flex items-center justify-end space-x-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200 transition-colors cursor-pointer"
          >
            Bỏ qua
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="inline-flex items-center px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 active:scale-98 shadow-sm transition-all cursor-pointer"
          >
            <Bookmark className="w-3.5 h-3.5 mr-1.5 text-indigo-200" strokeWidth={2.5} />
            <span>Lưu vào Thư viện</span>
          </button>
        </div>

      </div>
    </div>
  );
}
