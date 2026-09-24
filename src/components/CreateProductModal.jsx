import React, { useState } from 'react';
import { X, Layers, HelpCircle, Users, Tag, Check, Sparkles } from 'lucide-react';

export default function CreateProductModal({ isOpen, onClose, onSave }) {
  const [formData, setFormData] = useState({
    name: '',
    branch: '',
    topicGroup: '',
    problemStatement: '',
    targetUser: ''
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    onSave({
      ...formData,
      id: `prod-${Date.now().toString().slice(-4)}`,
      createdAt: new Date().toISOString().split('T')[0]
    });

    setFormData({
      name: '',
      branch: '',
      topicGroup: '',
      problemStatement: '',
      targetUser: ''
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-slate-100 overflow-hidden transform transition-all animate-in fade-in zoom-in-95 duration-150">
        
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/60">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 rounded-lg bg-indigo-50 text-indigo-600 border border-indigo-100">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base">Thêm Sản phẩm Mới</h3>
              <p className="text-xs text-slate-500">Khai báo thông tin sản phẩm để đưa vào chu kỳ theo dõi Marketing</p>
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
            <label className="block font-semibold text-slate-700 mb-1">
              1. Tên sản phẩm <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="Ví dụ: TalentScout, FinPulse Cashflow, CRM Pro..."
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-indigo-500 focus:bg-white text-slate-900"
            />
          </div>

          {/* 2. Nhánh đề tài & 3. Nhóm chủ đề (Grid 2 cột) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                2. Nhánh đề tài
              </label>
              <input
                type="text"
                placeholder="VD: B2B SaaS, FinTech, EdTech..."
                value={formData.branch}
                onChange={(e) => setFormData({ ...formData, branch: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-indigo-500 focus:bg-white text-slate-900"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                3. Nhóm chủ đề
              </label>
              <input
                type="text"
                placeholder="VD: Tối ưu tỷ lệ chốt deal, Tuyển dụng..."
                value={formData.topicGroup}
                onChange={(e) => setFormData({ ...formData, topicGroup: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-indigo-500 focus:bg-white text-slate-900"
              />
            </div>
          </div>

          {/* 4. Bài toán */}
          <div>
            <label className="block font-semibold text-slate-700 mb-1 flex items-center">
              <HelpCircle className="w-3.5 h-3.5 mr-1 text-slate-400" />
              4. Bài toán giải quyết (Pain Point)
            </label>
            <textarea
              rows={2}
              placeholder="VD: Khách hàng mất 4h/ngày nhập liệu thủ công trên Excel, thất thoát 30% lead nóng..."
              value={formData.problemStatement}
              onChange={(e) => setFormData({ ...formData, problemStatement: e.target.value })}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-indigo-500 focus:bg-white text-slate-900 resize-none"
            />
          </div>

          {/* 5. Người dùng */}
          <div>
            <label className="block font-semibold text-slate-700 mb-1 flex items-center">
              <Users className="w-3.5 h-3.5 mr-1 text-slate-400" />
              5. Đối tượng người dùng mục tiêu (Persona)
            </label>
            <input
              type="text"
              placeholder="VD: Giám đốc kinh doanh B2B, Doanh nghiệp SMBs 10-50 nhân sự..."
              value={formData.targetUser}
              onChange={(e) => setFormData({ ...formData, targetUser: e.target.value })}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-indigo-500 focus:bg-white text-slate-900"
            />
          </div>

          {/* Footer buttons */}
          <div className="pt-3 border-t border-slate-100 flex items-center justify-end space-x-2.5">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="inline-flex items-center px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors shadow-sm"
            >
              <Check className="w-3.5 h-3.5 mr-1.5" />
              Lưu Sản Phẩm
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
