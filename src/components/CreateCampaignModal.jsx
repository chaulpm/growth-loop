import React, { useState, useEffect } from 'react';
import { 
  X, 
  Sparkles, 
  Calendar, 
  Tag, 
  Send, 
  Check, 
  RefreshCw,
  Zap
} from 'lucide-react';

const COMMON_CHANNELS = [
  'Meta Ads (Facebook/Insta)', 
  'LinkedIn Ads', 
  'Google Search Ads', 
  'Email Sequence', 
  'Webinar', 
  'SEO / Blog'
];

export default function CreateCampaignModal({ 
  isOpen, 
  onClose, 
  products, 
  initialProductId, 
  existingCampaign, 
  presetTitle,
  presetBrief,
  selectedMonth, 
  onSave 
}) {
  const [productId, setProductId] = useState(initialProductId || '');
  const [title, setTitle] = useState('');
  const [targetMonth, setTargetMonth] = useState(selectedMonth || '2026-09');
  const [topicBrief, setTopicBrief] = useState('');
  const [selectedChannels, setSelectedChannels] = useState(['Meta Ads (Facebook/Insta)', 'LinkedIn Ads']);
  const [deadline, setDeadline] = useState('2026-09-30');
  const [nextAction, setNextAction] = useState('');
  const [aiGenerated, setAiGenerated] = useState(false);

  useEffect(() => {
    if (initialProductId) {
      setProductId(initialProductId);
    } else if (products.length > 0 && !productId) {
      setProductId(products[0].id);
    }

    if (presetTitle) {
      setTitle(presetTitle);
    } else if (existingCampaign) {
      setTitle(existingCampaign.title ? `[Làm mới] ${existingCampaign.title}` : '');
    } else {
      setTitle('');
    }

    if (presetBrief) {
      setTopicBrief(presetBrief);
    } else if (existingCampaign) {
      setTopicBrief(existingCampaign.topicBrief || '');
    } else {
      setTopicBrief('');
    }

    if (existingCampaign) {
      setSelectedChannels(existingCampaign.channels || ['Meta Ads (Facebook/Insta)', 'LinkedIn Ads']);
      setNextAction(existingCampaign.nextAction || '');
      setTargetMonth(existingCampaign.targetMonth || selectedMonth);
    } else {
      setNextAction('');
    }
  }, [initialProductId, existingCampaign, presetTitle, presetBrief, products, isOpen, selectedMonth]);

  if (!isOpen) return null;

  const selectedProduct = products.find(p => p.id === productId);

  // Toggle channel chip
  const toggleChannel = (ch) => {
    if (selectedChannels.includes(ch)) {
      setSelectedChannels(selectedChannels.filter(c => c !== ch));
    } else {
      setSelectedChannels([...selectedChannels, ch]);
    }
  };

  // Mock AI Generator: Tự động đề xuất Angle dựa trên 5 trường của Product
  const handleAiSuggest = () => {
    if (!selectedProduct) return;
    setAiGenerated(true);
    setTitle(`Chiến dịch Tăng tốc Tháng ${targetMonth.split('-')[1]}: ${selectedProduct.topicGroup}`);
    setTopicBrief(`Tập trung giải quyết nỗi đau "${selectedProduct.problemStatement}". Kích hoạt tệp đối tượng ${selectedProduct.targetUser} thông qua Case study & Demo thực chiến.`);
    setNextAction(`Thiết lập Meta Pixel & A/B testing 2 mẫu Ad Creative.`);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !productId) return;

    onSave({
      id: existingCampaign?.id ? existingCampaign.id : `camp-${Date.now().toString().slice(-4)}`,
      productId,
      title,
      targetMonth,
      topicBrief,
      status: 'active',
      startDate: new Date().toISOString().split('T')[0],
      deadline,
      daysRunning: 1,
      channels: selectedChannels,
      nextAction: nextAction || 'Triển khai Ad Sets trên Meta Ads Manager',
      aiSuggestion: {
        recommendedAngle: `Nội dung mới cho tháng ${targetMonth}`,
        urgencyScore: 'low'
      }
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-xl w-full shadow-2xl border border-slate-100 overflow-hidden transform transition-all">
        
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/60">
          <div className="flex items-center space-x-2.5">
            <div className={`p-2 rounded-xl ${existingCampaign ? 'bg-amber-50 text-amber-600 border border-amber-200' : 'bg-indigo-50 text-indigo-600 border border-indigo-100'}`}>
              {existingCampaign ? <RefreshCw className="w-5 h-5" /> : <Sparkles className="w-5 h-5" />}
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base">
                {existingCampaign ? 'Làm Mới Campaign (Refresh Angle)' : 'Khởi Tạo Campaign & Gắn Meta Ads'}
              </h3>
              <p className="text-xs text-slate-500">
                Gắn chiến dịch vào chu kỳ tháng để hệ thống tự động đồng bộ API
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
          
          {/* Chọn Sản phẩm & Tháng áp dụng */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-800 mb-1">
                Sản phẩm áp dụng <span className="text-rose-500">*</span>
              </label>
              <select
                value={productId}
                onChange={(e) => setProductId(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-indigo-500 focus:bg-white text-slate-900 font-medium"
              >
                {products.map(p => (
                  <option key={p.id} value={p.id}>
                    {p.name} ({p.branch})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-bold text-slate-800 mb-1">
                Chu kỳ áp dụng
              </label>
              <select
                value={targetMonth}
                onChange={(e) => setTargetMonth(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-indigo-500 focus:bg-white text-slate-900 font-medium"
              >
                <option value="2026-09">Tháng 09/2026 (Hiện tại)</option>
                <option value="2026-10">Tháng 10/2026</option>
              </select>
            </div>
          </div>

          {/* Smart Brief Assistant */}
          <div className="p-3 rounded-xl bg-gradient-to-r from-indigo-50 via-purple-50 to-slate-50 border border-indigo-100 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Sparkles className="w-4 h-4 text-indigo-600" />
              <div>
                <span className="font-bold text-indigo-950">Gợi ý Chiến lược</span>
                <p className="text-[11px] text-indigo-700">Tự động gợi ý Brief & Angle dựa trên bài toán sản phẩm</p>
              </div>
            </div>
            <button
              type="button"
              onClick={handleAiSuggest}
              className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-[11px] transition-colors shadow-xs flex items-center"
            >
              <Zap className="w-3 h-3 mr-1" />
              {aiGenerated ? 'Tạo lại' : '✨ Gợi ý tự động'}
            </button>
          </div>

          {/* Tên chiến dịch */}
          <div>
            <label className="block font-bold text-slate-800 mb-1">
              Tên chiến dịch <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="VD: [BOFU] Case study Sales 2026, [TOFU] Ebook Tuyển dụng IT..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-indigo-500 focus:bg-white text-slate-900"
            />
          </div>

          {/* Định hướng nội dung / Brief */}
          <div>
            <label className="block font-bold text-slate-800 mb-1">
              Brief chủ đề / Angle tiếp cận
            </label>
            <textarea
              rows={3}
              placeholder="VD: Tập trung giải quyết nỗi đau bão hòa tệp lạnh, tạo chiến dịch Retargeting khách vào web..."
              value={topicBrief}
              onChange={(e) => setTopicBrief(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-indigo-500 focus:bg-white text-slate-900 resize-none"
            />
          </div>

          {/* Kênh phân phối */}
          <div>
            <label className="block font-bold text-slate-800 mb-1.5">
              Kênh triển khai (Meta Ads, LinkedIn Ads, Search...)
            </label>
            <div className="flex flex-wrap gap-1.5">
              {COMMON_CHANNELS.map(ch => {
                const isSelected = selectedChannels.includes(ch);
                return (
                  <button
                    key={ch}
                    type="button"
                    onClick={() => toggleChannel(ch)}
                    className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition-colors border ${
                      isSelected
                        ? 'bg-indigo-50 text-indigo-700 border-indigo-200'
                        : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    {isSelected ? `✓ ${ch}` : `+ ${ch}`}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Deadline & Hành động tiếp theo */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-800 mb-1">
                Hạn chót chiến dịch (Deadline)
              </label>
              <input
                type="date"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-indigo-500 focus:bg-white text-slate-900"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-800 mb-1">
                Hành động tiếp theo
              </label>
              <input
                type="text"
                placeholder="VD: Kiểm tra pixel Meta & tạo 3 biến thể ảnh..."
                value={nextAction}
                onChange={(e) => setNextAction(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-indigo-500 focus:bg-white text-slate-900"
              />
            </div>
          </div>

          {/* Footer buttons */}
          <div className="pt-3 border-t border-slate-100 flex items-center justify-end space-x-2.5">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="inline-flex items-center px-4 py-2 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl transition-colors shadow-sm shadow-indigo-100"
            >
              <Check className="w-4 h-4 mr-1.5" />
              Lưu & Kích Hoạt Campaign
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
