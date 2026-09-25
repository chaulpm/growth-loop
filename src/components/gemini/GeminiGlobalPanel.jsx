import React, { useState } from 'react';
import { 
  X, 
  Sparkles, 
  Send, 
  Mic, 
  Bot, 
  User, 
  ChevronRight, 
  Zap, 
  CheckCircle2, 
  AlertCircle, 
  DollarSign, 
  Clock,
  Layers,
  ArrowUpRight
} from 'lucide-react';

export default function GeminiGlobalPanel({ 
  isOpen, 
  onClose, 
  activeTab, 
  products, 
  tasks,
  onOpenBriefModal,
  onOpenGuidedPlanning
}) {
  const [messages, setMessages] = useState([
    {
      sender: 'gemini',
      text: 'Xin chào! Tôi là Trợ lý Vận hành Growth Loop đồng hành cùng bạn trên toàn bộ chu trình Plan → Assign → Execute → Monitor → Optimize → Learn. Tôi có thể hỗ trợ gì cho bạn hôm nay?'
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  // Context-aware prompt suggestions based on current tab
  const contextPrompts = activeTab === 'control-center' ? [
    "✨ Phân tích nguyên nhân CPL Microsoft 365 tăng",
    "✨ Đề xuất giải pháp xử lý 3 task đang trễ hạn",
    "✨ Xem đúc kết A/B Test mới nhất từ Thư viện Growth"
  ] : [
    "✨ Tổng hợp ngân sách E-Invoicing Platform & task trễ của team Content",
    "✨ Sinh kế hoạch Top-of-Funnel cho DeskFlow Support",
    "✨ Kiểm tra trạng thái đồng bộ Meta Ads API"
  ];

  const handleSendPrompt = (promptText) => {
    const textToSend = promptText || inputValue;
    if (!textToSend.trim()) return;

    // Add user message
    const newMessages = [...messages, { sender: 'user', text: textToSend }];
    setMessages(newMessages);
    setInputValue('');
    setIsTyping(true);

    // Simulate System Reasoning & Contextual Action Response
    setTimeout(() => {
      setIsTyping(false);

      if (textToSend.includes('E-Invoicing') || textToSend.includes('team Content')) {
        setMessages(prev => [
          ...prev,
          {
            sender: 'gemini',
            type: 'invoice_summary_card',
            text: 'Tôi đã truy vấn dữ liệu thời gian thực từ Meta Ads API và Task Database. Dưới đây là báo cáo tổng hợp bạn yêu cầu:',
            data: {
              productName: 'E-Invoicing Platform',
              budget: '$1,200',
              spend: '$1,200',
              conversions: '320 Leads • 28 SQLs',
              cpl: '$3.75',
              roas: '5.1x',
              delayedContentTasks: [
                { id: 'tsk-02', name: 'Landing Page Copy: AI Productivity Suite', assignee: 'Member B', delay: 'Trễ 1 ngày' },
                { id: 'tsk-03', name: 'Case Study SMB: Smart AP Automation', assignee: 'Member C', delay: 'Trễ 3 ngày' }
              ]
            }
          }
        ]);
      } else if (textToSend.includes('CPL') || textToSend.includes('Microsoft 365')) {
        setMessages(prev => [
          ...prev,
          {
            sender: 'gemini',
            type: 'cpl_analysis_card',
            text: 'Phát hiện CPL của Microsoft 365 tăng 15% do tần suất hiển thị (Frequency) trên tệp Broad IT đã chạm ngưỡng 4.2. Tôi đề xuất thay thế bằng 3 phương án A/B Test sau:',
            data: {
              options: [
                'Concept A (Bảo mật): MS Defender chống rò rỉ dữ liệu',
                'Concept B (Chi phí): Tiết kiệm 35% chi phí bản quyền',
                'Concept C: Tự động hóa báo cáo và phân tích'
              ]
            }
          }
        ]);
      } else {
        setMessages(prev => [
          ...prev,
          {
            sender: 'gemini',
            text: `Tôi đã ghi nhận yêu cầu: "${textToSend}". Tôi đã đồng bộ với hệ thống dữ liệu và chuẩn bị sẵn sàng thực thi khi bạn xác nhận.`
          }
        ]);
      }
    }, 800);
  };

  if (!isOpen) return null;

  return (
    <aside className="fixed top-16 right-0 bottom-0 w-96 bg-white/95 backdrop-blur-md border-l border-slate-200 z-40 shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-200">
      
      {/* Panel Header */}
      <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-gradient-to-r from-blue-50/60 via-indigo-50/40 to-purple-50/30">
        <div className="flex items-center space-x-2.5">
          <div className="h-8 w-8 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 flex items-center justify-center text-white shadow-xs">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center space-x-1.5">
              <span className="font-bold text-slate-900 text-sm">Trợ lý Tăng trưởng</span>
              <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-indigo-100 text-indigo-700">
                Live
              </span>
            </div>
            <p className="text-[10px] text-slate-500">Growth OS • Smart Assistant</p>
          </div>
        </div>

        <button 
          onClick={onClose}
          className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-100 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 p-4 overflow-y-auto space-y-4 text-xs">
        
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex items-start space-x-2.5 ${msg.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
            {msg.sender === 'gemini' ? (
              <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center shrink-0 text-[10px]">
                ✨
              </div>
            ) : (
              <div className="w-6 h-6 rounded-full bg-slate-800 text-white flex items-center justify-center shrink-0 text-[10px]">
                U
              </div>
            )}

            <div className={`p-3 rounded-2xl max-w-[85%] leading-relaxed ${
              msg.sender === 'user'
                ? 'bg-indigo-600 text-white font-medium'
                : 'bg-slate-50 text-slate-800'
            }`}>
              <p>{msg.text}</p>

              {/* Special Rich Response: E-Invoicing Platform & Content Delay Summary */}
              {msg.type === 'invoice_summary_card' && (
                <div className="mt-3 p-3 bg-white rounded-xl border border-slate-200/80 space-y-2.5 text-slate-800 shadow-2xs">
                  <div className="font-bold text-indigo-950 flex items-center justify-between pb-1 border-b border-slate-100">
                    <span>{msg.data.productName}</span>
                    <span className="text-emerald-700 font-bold">ROAS {msg.data.roas}</span>
                  </div>

                  <div className="grid grid-cols-2 gap-1.5 text-[11px]">
                    <div>Ngân sách: <strong>{msg.data.budget}</strong></div>
                    <div>Chuyển đổi: <strong>{msg.data.conversions}</strong></div>
                  </div>

                  <div className="pt-2 border-t border-slate-100 space-y-1.5">
                    <div className="font-bold text-rose-700 flex items-center text-[10px] uppercase">
                      <AlertCircle className="w-3 h-3 mr-1" />
                      Task trễ hạn của team Content:
                    </div>
                    {msg.data.delayedContentTasks.map((t, tIdx) => (
                      <div key={tIdx} className="p-1.5 bg-rose-50/60 rounded-lg flex items-center justify-between text-[10px]">
                        <div>
                          <div className="font-semibold text-slate-900">{t.name}</div>
                          <div className="text-slate-500">Phụ trách: {t.assignee}</div>
                        </div>
                        <span className="font-bold text-rose-700">{t.delay}</span>
                      </div>
                    ))}
                  </div>

                    <div className="pt-1 flex space-x-1.5">
                    <button
                      onClick={() => alert("Đã gửi ping tự động qua MS Teams nhắc việc cho Member A và Member C.")}
                      className="w-full py-1.5 bg-rose-600 hover:bg-rose-700 text-white rounded-lg font-bold text-[10px] transition-colors"
                    >
                      Nhắc việc Member A & Member C (Teams)
                    </button>
                  </div>
                </div>
              )}

              {/* Special Rich Response: CPL Analysis */}
              {msg.type === 'cpl_analysis_card' && (
                <div className="mt-3 p-3 bg-white rounded-xl border border-slate-200/80 space-y-2 text-slate-800 shadow-2xs">
                  <div className="font-bold text-indigo-950 text-[11px]">3 Phương án A/B Creative:</div>
                  <div className="space-y-1 text-[11px]">
                    {msg.data.options.map((opt, oIdx) => (
                      <div key={oIdx} className="p-1.5 bg-indigo-50/60 rounded-lg font-medium text-slate-700">
                        {opt}
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={() => onOpenGuidedPlanning()}
                    className="w-full py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-bold text-[10px] transition-colors flex items-center justify-center"
                  >
                    <Sparkles className="w-3 h-3 mr-1" />
                    Tạo A/B Test Với Cấu Trúc Này
                  </button>
                </div>
              )}

            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex items-center space-x-2 text-slate-400 pl-8 text-[11px]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500" />
            </span>
            <span className="italic">Hệ thống đang suy nghĩ & phân tích ngữ cảnh...</span>
          </div>
        )}

      </div>

      {/* Context-Aware Prompts & Input Bar */}
      <div className="p-3.5 border-t border-slate-100 bg-slate-50/60 space-y-2.5">
        
        {/* Context-aware Prompt Chips */}
        <div>
          <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-1.5 flex items-center">
            <Sparkles className="w-3 h-3 mr-1 text-indigo-500" />
            Gợi ý theo ngữ cảnh ({activeTab === 'control-center' ? 'Dashboard' : 'Product Master'}):
          </div>
          <div className="space-y-1">
            {contextPrompts.map((cp, idx) => (
              <button
                key={idx}
                onClick={() => handleSendPrompt(cp)}
                className="w-full text-left p-1.5 rounded-lg text-[11px] font-medium text-slate-700 hover:bg-white hover:text-indigo-600 transition-colors truncate border border-transparent hover:border-slate-200"
              >
                {cp}
              </button>
            ))}
          </div>
        </div>

        {/* Input Bar with Voice & Send buttons */}
        <div className="flex items-center space-x-1.5 bg-white p-1 rounded-2xl border border-slate-200 focus-within:border-indigo-400 shadow-2xs">
          <input
            type="text"
            placeholder="Nhập yêu cầu hoặc ra lệnh cho hệ thống..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendPrompt()}
            className="flex-1 px-3 py-1.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none bg-transparent"
          />

          <button
            type="button"
            onClick={() => handleSendPrompt("✨ Hệ thống, tổng hợp ngân sách tháng này cho chiến dịch E-Invoicing Platform và báo cáo tình trạng các task đang trễ hẹn của team Content.")}
            className="p-1.5 rounded-xl text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 transition-colors"
            title="Lệnh giọng nói (Voice Command)"
          >
            <Mic className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={() => handleSendPrompt()}
            className="p-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white transition-colors"
          >
            <Send className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>

    </aside>
  );
}
