import React, { useState } from 'react';
import { X, Sparkles, Copy, Check, Send, User, FileText, Target, MessageSquare, Palette } from 'lucide-react';

export default function CreativeBriefModal({ isOpen, onClose, task }) {
  const [copied, setCopied] = useState(false);

  if (!isOpen || !task) return null;

  const brief = task.creativeBrief || {
    objective: "Tối ưu hóa chuyển đổi cho chiến dịch",
    targetPersona: "Khách hàng doanh nghiệp B2B",
    keyMessage: "Giải pháp nhanh chóng, tiết kiệm chi phí và tin cậy",
    deliverables: "Tài liệu và hình ảnh theo định dạng chuẩn",
    toneOfVoice: "Chuyên nghiệp, rõ ràng"
  };

  const handleCopy = () => {
    const text = `CREATIVE BRIEF (Tự động thiết lập)\nTask: ${task.title}\nNhân sự: ${task.assignee} (${task.team})\n\n1. Mục tiêu: ${brief.objective}\n2. Đối tượng mục tiêu: ${brief.targetPersona}\n3. Thông điệp cốt lõi: ${brief.keyMessage}\n4. Quy cách bàn giao: ${brief.deliverables}\n5. Tone of Voice: ${brief.toneOfVoice}`;
    navigator.clipboard?.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-xl w-full shadow-2xl border border-slate-100 overflow-hidden transform transition-all animate-in fade-in zoom-in-95 duration-150">
        
        {/* Header với nhận diện Material 3 & Soft Gradient */}
        <div className="p-6 bg-gradient-to-r from-blue-50/70 via-indigo-50/50 to-purple-50/40 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="h-10 w-10 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 flex items-center justify-center text-white shadow-sm shadow-indigo-200">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="font-bold text-slate-900 text-base">Creative Brief</h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-100 text-indigo-800">
                  Tự động tạo cho {task.assignee}
                </span>
              </div>
              <p className="text-xs text-slate-500 line-clamp-1">{task.title}</p>
            </div>
          </div>

          <button 
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 p-2 rounded-xl hover:bg-white/80 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Brief 5 điểm chuẩn */}
        <div className="p-6 space-y-4 text-xs">
          
          {/* 1. Mục tiêu */}
          <div className="p-3.5 bg-slate-50/70 rounded-2xl space-y-1">
            <div className="font-bold text-slate-700 flex items-center space-x-1.5 text-[11px] uppercase tracking-wider">
              <Target className="w-3.5 h-3.5 text-indigo-600" />
              <span>1. Mục tiêu chiến dịch (Objective)</span>
            </div>
            <p className="text-slate-800 font-medium leading-relaxed pl-5">
              {brief.objective}
            </p>
          </div>

          {/* 2. Persona */}
          <div className="p-3.5 bg-slate-50/70 rounded-2xl space-y-1">
            <div className="font-bold text-slate-700 flex items-center space-x-1.5 text-[11px] uppercase tracking-wider">
              <User className="w-3.5 h-3.5 text-blue-600" />
              <span>2. Đối tượng nhắm tới (Target Persona)</span>
            </div>
            <p className="text-slate-800 font-medium leading-relaxed pl-5">
              {brief.targetPersona}
            </p>
          </div>

          {/* 3. Key Message */}
          <div className="p-3.5 bg-slate-50/70 rounded-2xl space-y-1">
            <div className="font-bold text-slate-700 flex items-center space-x-1.5 text-[11px] uppercase tracking-wider">
              <MessageSquare className="w-3.5 h-3.5 text-purple-600" />
              <span>3. Thông điệp chủ đạo (Key Message)</span>
            </div>
            <p className="text-slate-800 font-bold leading-relaxed pl-5 text-indigo-950">
              "{brief.keyMessage}"
            </p>
          </div>

          {/* 4. Deliverables & 5. Tone */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-3.5 bg-slate-50/70 rounded-2xl space-y-1">
              <div className="font-bold text-slate-700 flex items-center space-x-1.5 text-[11px] uppercase tracking-wider">
                <FileText className="w-3.5 h-3.5 text-emerald-600" />
                <span>4. Quy cách bàn giao</span>
              </div>
              <p className="text-slate-700 font-medium leading-relaxed text-[11px]">
                {brief.deliverables}
              </p>
            </div>

            <div className="p-3.5 bg-slate-50/70 rounded-2xl space-y-1">
              <div className="font-bold text-slate-700 flex items-center space-x-1.5 text-[11px] uppercase tracking-wider">
                <Palette className="w-3.5 h-3.5 text-amber-600" />
                <span>5. Tone of Voice</span>
              </div>
              <p className="text-slate-700 font-medium leading-relaxed text-[11px]">
                {brief.toneOfVoice}
              </p>
            </div>
          </div>

        </div>

        {/* Footer actions */}
        <div className="p-6 pt-2 border-t border-slate-100 flex items-center justify-between">
          <span className="text-[11px] text-slate-400 flex items-center">
            <Sparkles className="w-3 h-3 mr-1 text-indigo-500" />
            Đã đồng bộ vào Task của {task.assignee}
          </span>

          <div className="flex items-center space-x-2">
            <button
              onClick={handleCopy}
              className="inline-flex items-center px-3.5 py-1.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-semibold transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 mr-1.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 mr-1.5 text-slate-500" />}
              <span>{copied ? 'Đã chép Brief' : 'Sao chép Brief'}</span>
            </button>

            <button
              onClick={onClose}
              className="px-4 py-1.5 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition-colors"
            >
              Đóng
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
