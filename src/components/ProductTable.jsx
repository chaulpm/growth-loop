import React, { useState } from 'react';
import ProductRow from './ProductRow';
import { 
  Search, 
  Filter, 
  AlertTriangle, 
  CheckCircle, 
  Layers, 
  HelpCircle 
} from 'lucide-react';

export default function ProductTable({ 
  products, 
  campaigns, 
  selectedMonth, 
  onAddCampaign, 
  onRefreshCampaign 
}) {
  const [filterType, setFilterType] = useState('all'); // 'all' | 'needs_action' | 'active'
  const [searchQuery, setSearchQuery] = useState('');

  // Map campaign tương ứng với từng sản phẩm trong tháng đang chọn
  const getProductCampaign = (productId) => {
    return campaigns.find(c => c.productId === productId && c.targetMonth === selectedMonth);
  };

  // Lọc sản phẩm
  const filteredProducts = products.filter(prod => {
    const campaign = getProductCampaign(prod.id);
    const isMissing = !campaign;
    const isNeedsRefresh = campaign && (campaign.status === 'needs_refresh' || campaign.daysRunning > 30);
    const isActive = campaign && !isNeedsRefresh;

    // Bộ lọc trạng thái
    if (filterType === 'needs_action' && !isMissing && !isNeedsRefresh) return false;
    if (filterType === 'active' && !isActive) return false;

    // Tìm kiếm văn bản
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = prod.name.toLowerCase().includes(q);
      const matchBranch = prod.branch.toLowerCase().includes(q);
      const matchTopic = prod.topicGroup.toLowerCase().includes(q);
      const matchProblem = prod.problemStatement.toLowerCase().includes(q);
      const matchCampaign = campaign ? campaign.title.toLowerCase().includes(q) : false;
      return matchName || matchBranch || matchTopic || matchProblem || matchCampaign;
    }

    return true;
  });

  return (
    <div className="space-y-4">
      
      {/* Thanh điều khiển tìm kiếm & bộ lọc */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-3">
        
        {/* Tìm kiếm */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Tìm theo sản phẩm, nhánh đề tài, chủ đề, bài toán..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-indigo-500 focus:bg-white transition-all text-slate-800 placeholder-slate-400"
          />
        </div>

        {/* Nút lọc nhanh */}
        <div className="flex items-center space-x-1.5">
          <button
            onClick={() => setFilterType('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              filterType === 'all'
                ? 'bg-slate-900 text-white'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Tất cả ({products.length})
          </button>
          
          <button
            onClick={() => setFilterType('needs_action')}
            className={`inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              filterType === 'needs_action'
                ? 'bg-rose-600 text-white'
                : 'text-rose-700 bg-rose-50 hover:bg-rose-100'
            }`}
          >
            <AlertTriangle className="w-3.5 h-3.5 mr-1" />
            Cần xử lý
          </button>

          <button
            onClick={() => setFilterType('active')}
            className={`inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              filterType === 'active'
                ? 'bg-emerald-600 text-white'
                : 'text-emerald-700 bg-emerald-50 hover:bg-emerald-100'
            }`}
          >
            <CheckCircle className="w-3.5 h-3.5 mr-1" />
            Đang chạy ổn định
          </button>
        </div>

      </div>

      {/* Danh sách các sản phẩm */}
      {filteredProducts.length > 0 ? (
        <div className="space-y-3">
          {filteredProducts.map(product => {
            const campaign = getProductCampaign(product.id);
            return (
              <ProductRow
                key={product.id}
                product={product}
                campaign={campaign}
                onAddCampaign={onAddCampaign}
                onRefreshCampaign={onRefreshCampaign}
              />
            );
          })}
        </div>
      ) : (
        <div className="text-center py-12 bg-white rounded-xl border border-slate-200">
          <Layers className="w-10 h-10 text-slate-300 mx-auto mb-3" />
          <h4 className="text-sm font-semibold text-slate-700">Không tìm thấy sản phẩm nào</h4>
          <p className="text-xs text-slate-500 mt-1">
            Hãy thử thay đổi từ khóa tìm kiếm hoặc bộ lọc trạng thái.
          </p>
        </div>
      )}

    </div>
  );
}
