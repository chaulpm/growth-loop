import React, { useState } from 'react';
import ProductCard3Zone from './ProductCard3Zone';
import { Search, Plus, Sparkles, Building2, Server, FileCheck2, Filter } from 'lucide-react';

export default function ProductMasterView({ 
  products, 
  onOpenNewProductModal, 
  onOpenGuidedPlanning, 
  onTriggerAction 
}) {
  const [selectedBrand, setSelectedBrand] = useState('all'); // 'all' | 'MBC' | 'MBI'
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all'); // 'all' | 'active' | 'needs_action' | 'missing'

  // Tính toán số lượng cảnh báo đỏ cho từng Brand để hiển thị Gemini Notification Dot
  const mbcAlertCount = products.filter(p => p.brand === 'MBC' && p.aiDiagnosis?.urgency === 'danger').length;
  const mbiAlertCount = products.filter(p => p.brand === 'MBI' && p.aiDiagnosis?.urgency === 'danger').length;

  // Lọc sản phẩm theo Thương hiệu (Brand), Trạng thái và Tìm kiếm
  const filterProduct = (prod) => {
    // Brand filter
    if (selectedBrand !== 'all' && prod.brand !== selectedBrand) return false;

    // Status filter
    if (filterType === 'active' && (!prod.metaSync || prod.metaSync.activeCampaignsCount === 0)) return false;
    if (filterType === 'missing' && prod.metaSync && prod.metaSync.activeCampaignsCount > 0) return false;
    if (filterType === 'needs_action' && prod.aiDiagnosis?.urgency === 'success') return false;

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = prod.name.toLowerCase().includes(q);
      const matchBranch = prod.branch.toLowerCase().includes(q);
      const matchTopic = prod.topicGroup.toLowerCase().includes(q);
      const matchProblem = prod.aiDiagnosis?.problem?.toLowerCase().includes(q);
      const matchSolution = prod.aiDiagnosis?.solution?.toLowerCase().includes(q);
      const matchChips = prod.domainChips?.some(c => c.toLowerCase().includes(q));
      return matchName || matchBranch || matchTopic || matchProblem || matchSolution || matchChips;
    }

    return true;
  };

  const mbcProducts = products.filter(p => p.brand === 'MBC').filter(filterProduct);
  const mbiProducts = products.filter(p => p.brand === 'MBI').filter(filterProduct);

  const totalFilteredCount = mbcProducts.length + mbiProducts.length;

  return (
    <div className="space-y-6">
      
      {/* Top Banner Soft SaaS Style */}
      <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-2xs border border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center space-x-3.5">
          <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 border border-indigo-100/80 flex items-center justify-center shadow-2xs">
            <Building2 className="w-5 h-5" strokeWidth={2} />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight flex items-center">
              Product Master & Planner
              <span className="ml-2.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-indigo-50 text-indigo-700 border border-indigo-100 uppercase tracking-wide">
                Catalogs
              </span>
            </h2>
            <p className="text-xs text-slate-500 font-normal">
              Quản lý danh mục 2 khối kinh doanh: MBC (Hosting/Domain/Cloud) & MBI (Hóa đơn/Ký số)
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2.5 shrink-0 flex-wrap gap-y-2">
          {/* Secondary CTA */}
          <button
            onClick={onOpenGuidedPlanning}
            className="inline-flex items-center px-4 py-2 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 rounded-xl border border-slate-200 hover:border-slate-300 transition-all cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 mr-1.5 text-indigo-600" strokeWidth={2} />
            <span>Trợ lý Hoạch định</span>
          </button>

          {/* Primary CTA: Deep Indigo Button */}
          <button
            onClick={onOpenNewProductModal}
            className="inline-flex items-center px-4 py-2 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl transition-all shadow-sm cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5 mr-1 text-white" strokeWidth={2.5} />
            <span>+ Thêm Sản Phẩm</span>
          </button>
        </div>
      </div>

      {/* KHU VỰC TÌM KIẾM & BỘ LỌC THƯƠNG HIỆU INLINE (SOFT MINIMALIST) */}
      <div className="space-y-3">
        <div className="bg-white p-3 rounded-2xl border border-slate-200/80 shadow-2xs flex flex-col lg:flex-row lg:items-center justify-between gap-3">
          
          {/* 1. Thanh tìm kiếm (Bên trái) */}
          <div className="relative flex-1 min-w-[240px]">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" strokeWidth={2} />
            <input
              type="text"
              placeholder="Tìm kiếm sản phẩm, tên miền .VN, hóa đơn..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-3 py-2 text-xs bg-slate-50/70 rounded-xl focus:outline-none focus:bg-white text-slate-800 placeholder-slate-400 transition-all border border-slate-200 focus:border-indigo-500 font-normal"
            />
          </div>

          {/* 2. Bộ lọc thương hiệu Segmented Control */}
          <div className="flex items-center space-x-1 bg-slate-100/80 p-1 rounded-xl border border-slate-200/80 shrink-0">
            
            {/* Nút 1: Tất cả */}
            <button
              onClick={() => setSelectedBrand('all')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                selectedBrand === 'all'
                  ? 'bg-white text-indigo-700 shadow-2xs font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Tất cả ({products.length})
            </button>

            {/* Nút 2: 🏢 MBC (Matbao-corp) */}
            <button
              onClick={() => setSelectedBrand('MBC')}
              className={`relative flex items-center space-x-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                selectedBrand === 'MBC'
                  ? 'bg-white text-indigo-700 shadow-2xs font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <span>🏢 MBC</span>
              {mbcAlertCount > 0 && (
                <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
              )}
            </button>

            {/* Nút 3: 🧾 MBI (Matbao-invoice) */}
            <button
              onClick={() => setSelectedBrand('MBI')}
              className={`relative flex items-center space-x-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                selectedBrand === 'MBI'
                  ? 'bg-white text-indigo-700 shadow-2xs font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <span>🧾 MBI</span>
              {mbiAlertCount > 0 && (
                <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
              )}
            </button>

          </div>

        </div>

        {/* Thanh lọc trạng thái bổ trợ nhỏ gọn (Sub-bar) */}
        <div className="flex items-center justify-between px-3 text-xs text-slate-500">
          <div className="flex items-center space-x-1.5 overflow-x-auto">
            <span className="text-[11px] font-medium text-slate-400 mr-1 flex items-center">
              <Filter className="w-3 h-3 mr-1" /> Lọc trạng thái:
            </span>
            {[
              { id: 'all', label: 'Tất cả' },
              { id: 'needs_action', label: 'Cần tối ưu' },
              { id: 'active', label: 'Đang chạy Ads' },
              { id: 'missing', label: 'Chưa có camp' }
            ].map(f => (
              <button
                key={f.id}
                onClick={() => setFilterType(f.id)}
                className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold transition-colors ${
                  filterType === f.id
                    ? 'bg-indigo-600 text-white'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          <span className="text-[11px] text-slate-400 hidden sm:inline">
            Đang hiển thị <strong>{totalFilteredCount}</strong> sản phẩm
          </span>
        </div>
      </div>

      {/* DANH SÁCH SẢN PHẨM PHÂN NHÓM (REAL-TIME FILTERING) */}
      <div className="space-y-8">
        
        {/* SECTION 1: 🏢 MBC (Matbao-corp) - Ẩn hoàn toàn khi chọn tab MBI */}
        {(selectedBrand === 'all' || selectedBrand === 'MBC') && (
          <div className="space-y-4 animate-in fade-in duration-200">
            
            {/* Header phân nhóm MBC */}
            <div className="flex items-center justify-between px-2 pb-1 border-b-2 border-blue-200/80">
              <div className="flex items-center space-x-2.5">
                <div className="w-7 h-7 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold text-xs shadow-2xs">
                  MBC
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-sm tracking-tight flex items-center">
                    <span>🏢 MBC (Matbao-corp)</span>
                    <span className="ml-2 text-slate-400 font-normal text-xs">— Hạ tầng Hosting, Tên Miền & Cloud Workplace</span>
                  </h3>
                </div>
              </div>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-50 text-blue-800">
                {mbcProducts.length} Sản phẩm
              </span>
            </div>

            {/* Danh sách thẻ sản phẩm MBC */}
            {mbcProducts.length > 0 ? (
              <div className="space-y-4">
                {mbcProducts.map(product => (
                  <ProductCard3Zone
                    key={product.id}
                    product={product}
                    onTriggerAction={onTriggerAction}
                  />
                ))}
              </div>
            ) : (
              <div className="p-6 bg-white rounded-3xl text-center text-xs text-slate-400 border border-dashed border-slate-200">
                Không tìm thấy sản phẩm MBC nào phù hợp với bộ lọc hiện tại.
              </div>
            )}

          </div>
        )}

        {/* SECTION 2: 🧾 MBI (Matbao-invoice) - Ẩn hoàn toàn khi chọn tab MBC */}
        {(selectedBrand === 'all' || selectedBrand === 'MBI') && (
          <div className="space-y-4 pt-2 animate-in fade-in duration-200">
            
            {/* Header phân nhóm MBI */}
            <div className="flex items-center justify-between px-2 pb-1 border-b-2 border-emerald-200/80">
              <div className="flex items-center space-x-2.5">
                <div className="w-7 h-7 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold text-xs shadow-2xs">
                  MBI
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-sm tracking-tight flex items-center">
                    <span>🧾 MBI (Matbao-invoice)</span>
                    <span className="ml-2 text-slate-400 font-normal text-xs">— Hệ sinh thái Hóa Đơn & Chứng Từ Thuế Số</span>
                  </h3>
                </div>
              </div>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-800">
                {mbiProducts.length} Sản phẩm
              </span>
            </div>

            {/* Danh sách thẻ sản phẩm MBI */}
            {mbiProducts.length > 0 ? (
              <div className="space-y-4">
                {mbiProducts.map(product => (
                  <ProductCard3Zone
                    key={product.id}
                    product={product}
                    onTriggerAction={onTriggerAction}
                  />
                ))}
              </div>
            ) : (
              <div className="p-6 bg-white rounded-3xl text-center text-xs text-slate-400 border border-dashed border-slate-200">
                Không tìm thấy sản phẩm MBI nào phù hợp với bộ lọc hiện tại.
              </div>
            )}

          </div>
        )}

      </div>

    </div>
  );
}
