import React, { useState } from 'react';
import { X, Layers, Plus, Check, Radio, HelpCircle, Users, Sparkles } from 'lucide-react';

export default function NewProductLaunchModal({ isOpen, onClose, onSave }) {
  const [formData, setFormData] = useState({
    name: '',
    branch: 'B2B SaaS / Bán hàng',
    topicGroup: '',
    frequency: 'monthly', // 'monthly' | 'quarterly' | 'feature_launch'
    requiresMonthlyCampaign: true,
    adAccountId: 'act_',
    problemStatement: '',
    targetUser: ''
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    const newProduct = {
      id: `prod-${Date.now().toString().slice(-4)}`,
      name: formData.name,
      branch: formData.branch,
      topicGroup: formData.topicGroup || 'Chiến dịch sản phẩm mới',
      problemStatement: formData.problemStatement || 'Giải quyết nhu cầu tối ưu chi phí và tăng hiệu suất làm việc.',
      targetUser: formData.targetUser || 'Doanh nghiệp SMBs và quản lý bộ phận',
      createdAt: new Date().toISOString().split('T')[0],
      metaSync: {
        status: formData.adAccountId && formData.adAccountId.length > 5 ? 'live' : 'disconnected',
        adAccountId: formData.adAccountId || 'Chưa liên kết',
        lastSynced: 'Vừa liên kết',
        activeCampaignsCount: 0,
        startDate: 'Chưa có',
        conversions: {
          leads: 0,
          sqls: 0,
          cpl: '$0',
          spend: '$0',
          cvr: '0%'
        },
        runningCampaigns: []
      },
      aiDiagnosis: {
        type: 'missing_campaign',
        badge: '⚠️ Setup Mới',
        insight: `Sản phẩm '${formData.name}' vừa được đưa vào hệ sinh thái. Chưa có chiến dịch kích hoạt chu kỳ đầu tiên.`,
        recommendation: `Đề xuất: Tạo chiến dịch Top-of-Funnel giới thiệu tính năng chủ lực tới tệp khách hàng tiềm năng.`,
        actionCtaText: 'Tạo Campaign Launch Ngay',
        urgency: 'danger'
      }
    };

    onSave(newProduct);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-slate-100 overflow-hidden transform transition-all animate-in fade-in zoom-in-95 duration-150">
        
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/60">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 rounded-xl bg-indigo-50 text-indigo-600 border border-indigo-100">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base">Thêm Sản Phẩm Mới (New Launch)</h3>
              <p className="text-xs text-slate-500">Cài đặt sản phẩm chủ lực và cấu hình chu kỳ Growth Campaign</p>
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
          
          {/* 1. Tên sản phẩm */}
          <div>
            <label className="block font-bold text-slate-800 mb-1">
              Tên sản phẩm chủ lực <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="VD: Microsoft 365, Vibe Hosting, Google Workspace, CyberShield..."
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-indigo-500 focus:bg-white text-slate-900 font-medium"
            />
          </div>

          {/* 2. Category / Ngành hàng & Meta Ad Account ID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-800 mb-1">
                Category / Phân loại
              </label>
              <select
                value={formData.branch}
                onChange={(e) => setFormData({ ...formData, branch: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-indigo-500 focus:bg-white text-slate-900 font-medium"
              >
                <option value="B2B SaaS / Bán hàng">B2B SaaS / Bán hàng</option>
                <option value="Cloud Infrastructure">Cloud Infrastructure</option>
                <option value="Workplace Tools">Workplace & Productivity</option>
                <option value="Cybersecurity">Cybersecurity</option>
                <option value="FinTech">FinTech</option>
                <option value="HR Tech">HR Tech</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-slate-800 mb-1">
                Meta Ad Account ID
              </label>
              <input
                type="text"
                placeholder="VD: act_981273910"
                value={formData.adAccountId}
                onChange={(e) => setFormData({ ...formData, adAccountId: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-indigo-500 focus:bg-white text-slate-900 font-mono"
              />
            </div>
          </div>

          {/* 3. Tần suất chạy Campaign */}
          <div>
            <label className="block font-bold text-slate-800 mb-1.5">
              Tần suất chạy Campaign Marketing
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'monthly', label: 'Hàng tháng (Chu kỳ chính)' },
                { id: 'quarterly', label: 'Theo quý (Quarterly)' },
                { id: 'feature_launch', label: 'Khi có tính năng mới' }
              ].map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setFormData({ ...formData, frequency: item.id })}
                  className={`p-2 rounded-xl text-left border text-[11px] font-medium transition-all ${
                    formData.frequency === item.id
                      ? 'bg-indigo-50 border-indigo-300 text-indigo-900 font-bold'
                      : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* 4. Yêu cầu Campaign tháng bắt buộc? */}
          <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-200">
            <div>
              <div className="font-bold text-slate-800">Yêu cầu Campaign tháng bắt buộc?</div>
              <p className="text-[11px] text-slate-500">Nếu bật, hệ thống sẽ cảnh báo đỏ trên Control Center nếu tháng này chưa có camp.</p>
            </div>
            <input
              type="checkbox"
              checked={formData.requiresMonthlyCampaign}
              onChange={(e) => setFormData({ ...formData, requiresMonthlyCampaign: e.target.checked })}
              className="w-4 h-4 text-indigo-600 rounded border-slate-300 focus:ring-indigo-500 cursor-pointer"
            />
          </div>

          {/* 5. Pain point & Persona (Rút gọn) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-800 mb-1">
                Bài toán giải quyết (Pain Point)
              </label>
              <textarea
                rows={2}
                placeholder="VD: Chi phí bản quyền quá đắt, khó tích hợp..."
                value={formData.problemStatement}
                onChange={(e) => setFormData({ ...formData, problemStatement: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-indigo-500 focus:bg-white text-slate-900 resize-none"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-800 mb-1">
                Người dùng mục tiêu (Persona)
              </label>
              <textarea
                rows={2}
                placeholder="VD: CTO, DevOps Lead, SMBs 50 nhân sự..."
                value={formData.targetUser}
                onChange={(e) => setFormData({ ...formData, targetUser: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-indigo-500 focus:bg-white text-slate-900 resize-none"
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
              Lưu Sản Phẩm & Kích Hoạt Sync
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
