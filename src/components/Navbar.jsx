import React from 'react';
import { 
  Repeat, 
  Plus, 
  Calendar, 
  Sparkles, 
  Layers
} from 'lucide-react';

export default function Navbar({ 
  selectedMonth, 
  setSelectedMonth, 
  onOpenCreateProduct, 
  onOpenCreateCampaign 
}) {
  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & Brand */}
          <div className="flex items-center space-x-3">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-indigo-400 flex items-center justify-center text-white shadow-sm shadow-indigo-200">
              <Repeat className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-bold text-lg tracking-tight text-slate-900">Growth-loop</span>
                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-indigo-50 text-indigo-700 border border-indigo-100">
                  <Sparkles className="w-3 h-3 mr-1" />
                  Data-Driven
                </span>
              </div>
              <p className="text-xs text-slate-500 hidden sm:block">
                Campaign Lifecycle & Reminder Engine
              </p>
            </div>
          </div>

          {/* Month Filter & CTAs */}
          <div className="flex items-center space-x-3">
            {/* Bộ chọn tháng làm việc */}
            <div className="flex items-center space-x-2 bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-xs text-slate-700">
              <Calendar className="w-4 h-4 text-slate-500" />
              <span className="font-medium text-slate-500">Chu kỳ:</span>
              <select 
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                className="bg-transparent font-semibold text-slate-800 focus:outline-none cursor-pointer"
              >
                <option value="2026-09">Tháng 09/2026 (Hiện tại)</option>
                <option value="2026-10">Tháng 10/2026</option>
                <option value="2026-08">Tháng 08/2026</option>
              </select>
            </div>

            {/* Nút thêm sản phẩm */}
            <button
              onClick={onOpenCreateProduct}
              className="inline-flex items-center px-3 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 hover:border-slate-400 transition-colors shadow-sm"
              title="Thêm sản phẩm mới vào hệ thống quản lý"
            >
              <Layers className="w-3.5 h-3.5 mr-1.5 text-slate-500" />
              + Thêm Sản phẩm
            </button>

            {/* Nút tạo campaign nhanh */}
            <button
              onClick={() => onOpenCreateCampaign()}
              className="inline-flex items-center px-3.5 py-1.5 text-xs font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors shadow-sm shadow-indigo-100"
              title="Tạo chiến dịch mới cho sản phẩm"
            >
              <Plus className="w-3.5 h-3.5 mr-1" />
              Tạo Campaign
            </button>
          </div>

        </div>
      </div>
    </header>
  );
}
