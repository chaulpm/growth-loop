import React from 'react';
import { Sparkles, ArrowRight, Lightbulb, Bot } from 'lucide-react';

export default function AiSuggestionBox({ missingProducts, onQuickCreateCampaign }) {
  if (!missingProducts || missingProducts.length === 0) {
    return (
      <div className="bg-gradient-to-r from-emerald-50/70 to-slate-50 border border-emerald-200/70 rounded-xl p-4 flex items-center justify-between text-xs">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <div className="font-bold text-slate-900">Trạng thái Tối ưu Danh mục</div>
            <p className="text-slate-600">Toàn bộ danh mục sản phẩm đã được kích hoạt chiến dịch trong chu kỳ tháng này.</p>
          </div>
        </div>
      </div>
    );
  }

  const topMissing = missingProducts[0];

  return (
    <div className="bg-gradient-to-r from-indigo-50/80 via-white to-indigo-50/40 border border-indigo-200/80 rounded-xl p-4 text-xs shadow-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        
        <div className="flex items-start space-x-3">
          <div className="w-9 h-9 rounded-xl bg-indigo-600 text-white flex items-center justify-center shrink-0 shadow-sm shadow-indigo-200">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-bold text-slate-900 text-sm">Gợi ý Tối ưu Danh mục</span>
              <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-indigo-100 text-indigo-800">
                Phase 1 Preview
              </span>
            </div>
            <p className="text-slate-600 mt-0.5">
              Phát hiện sản phẩm <strong className="text-indigo-950 font-semibold">{topMissing.name}</strong> ({topMissing.branch}) chưa có chiến dịch trong tháng.
            </p>
            <div className="mt-2 text-slate-700 bg-white/80 p-2.5 rounded-lg border border-indigo-100/80 leading-relaxed">
              <span className="font-semibold text-indigo-700 flex items-center mb-1">
                <Lightbulb className="w-3.5 h-3.5 mr-1" />
                Gợi ý góc tiếp cận (Angle đề xuất):
              </span>
              "{topMissing.topicGroup}: Khai thác trực diện vấn đề '{topMissing.problemStatement.slice(0, 70)}...' dành riêng cho {topMissing.targetUser.split(',')[0]}."
            </div>
          </div>
        </div>

        <button
          onClick={() => onQuickCreateCampaign(topMissing.id)}
          className="self-end sm:self-center inline-flex items-center px-3.5 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors shadow-sm shrink-0"
        >
          Áp dụng Angle này
          <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
        </button>

      </div>
    </div>
  );
}
