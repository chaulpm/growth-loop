import React from 'react';
import { Sparkles, Award } from 'lucide-react';

export default function GrowthExperimentsWidget({ experimentData }) {
  const { activeTest, aiLearning } = experimentData;

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md border border-slate-200/80 transition-all flex flex-col justify-between space-y-4">
      <div className="space-y-4">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3.5 border-b border-slate-100">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shadow-2xs">
              <Sparkles className="w-4 h-4" strokeWidth={1.75} />
            </div>
            <div>
              <h3 className="font-bold text-sm text-slate-900 tracking-tight">Thư viện Growth (Growth Library)</h3>
              <p className="text-xs text-slate-400 font-normal">Vòng lặp Thực thi - Tối ưu - Kế thừa tri thức</p>
            </div>
          </div>
          <span className="px-2.5 py-0.5 text-[10px] font-semibold rounded-full bg-indigo-50 text-indigo-700 border border-indigo-100/80">
            A/B Live
          </span>
        </div>

        {/* 1. Active A/B Test Card (Soft Pastel UI) */}
        <div className="p-4 bg-slate-50/70 rounded-xl space-y-3 border border-slate-200/60">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-slate-800 truncate">{activeTest.title}</span>
            <span className="text-[10px] font-medium text-slate-500 bg-white border border-slate-200/80 px-2 py-0.5 rounded-full">
              {activeTest.duration}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs">
            {/* Variant A */}
            <div className="p-3 bg-white rounded-lg border border-slate-200/70 shadow-2xs space-y-1">
              <div className="text-[10px] text-slate-400 font-medium">Variant A: {activeTest.variantA.angle}</div>
              <div className="text-sm font-bold text-slate-800">
                {activeTest.variantA.cvr} <span className="text-[10px] font-normal text-slate-400">CVR</span>
              </div>
            </div>

            {/* Variant B (Winner with Soft Indigo Accent) */}
            <div className="p-3 bg-indigo-50/70 rounded-lg border border-indigo-100/80 shadow-2xs space-y-1">
              <div className="text-[10px] font-bold text-indigo-700 flex items-center justify-between">
                <span>Variant B (Winner)</span>
                <Award className="w-3.5 h-3.5 text-indigo-600" strokeWidth={1.75} />
              </div>
              <div className="text-sm font-bold text-indigo-950">
                {activeTest.variantB.cvr} <span className="text-[10px] font-semibold text-indigo-600 ml-1">{activeTest.leading}</span>
              </div>
            </div>
          </div>
        </div>

        {/* 2. Gemini Synthesized Learning Card */}
        <div className="p-4 bg-slate-50/70 rounded-xl space-y-2 border border-slate-200/60">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-800">
            <div className="flex items-center space-x-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-600" />
              <span>Đúc kết tự động • {aiLearning.period}</span>
            </div>
            <span className="text-[10px] text-indigo-600 hover:text-indigo-700 font-semibold cursor-pointer transition-colors">
              Thư viện (8 bài) →
            </span>
          </div>

          <div className="text-xs font-semibold text-slate-900 leading-snug">
            {aiLearning.headline}
          </div>

          <ul className="space-y-1.5 text-xs text-slate-600 list-disc list-inside">
            {aiLearning.points?.map((pt, idx) => (
              <li key={idx} className="leading-relaxed">{pt}</li>
            ))}
          </ul>
        </div>

      </div>
    </div>
  );
}
