import React from 'react';
import { 
  AlertCircle, 
  Clock, 
  CheckCircle2, 
  ArrowUpRight, 
  Sparkles,
  RefreshCw,
  PlusCircle
} from 'lucide-react';

export default function ActionReminders({ 
  missingProducts, 
  staleCampaigns, 
  activeCampaignsCount, 
  totalProductsCount, 
  onQuickCreateCampaign, 
  onQuickRefreshCampaign 
}) {
  const coveragePercent = totalProductsCount > 0 
    ? Math.round(((totalProductsCount - missingProducts.length) / totalProductsCount) * 100) 
    : 0;

  return (
    <div className="space-y-4">
      {/* Hàng chỉ số hành động thực tế (Action-oriented Metrics, không phải vanity metrics) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        
        {/* Card 1: Cảnh báo thiếu campaign */}
        <div className={`p-4 rounded-xl border transition-all ${
          missingProducts.length > 0 
            ? 'bg-rose-50/70 border-rose-200 text-rose-900 shadow-sm' 
            : 'bg-white border-slate-200 text-slate-800'
        }`}>
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-rose-700 flex items-center">
              <AlertCircle className="w-4 h-4 mr-1.5 text-rose-600" />
              Chưa có Campaign tháng này
            </span>
            <span className="px-2 py-0.5 text-xs font-bold rounded-full bg-rose-100 text-rose-700">
              {missingProducts.length} sản phẩm
            </span>
          </div>
          <div className="mt-2">
            <div className="text-2xl font-bold tracking-tight text-rose-900">
              {missingProducts.length} / {totalProductsCount}
            </div>
            <p className="text-xs text-rose-600 mt-1">
              {missingProducts.length > 0 
                ? "Cần tạo campaign khẩn cấp để không bỏ trống phễu tiếp thị." 
                : "Tuyệt vời! Toàn bộ sản phẩm đều đã có campaign."}
            </p>
          </div>
        </div>

        {/* Card 2: Cảnh báo campaign cũ */}
        <div className={`p-4 rounded-xl border transition-all ${
          staleCampaigns.length > 0 
            ? 'bg-amber-50/70 border-amber-200 text-amber-900 shadow-sm' 
            : 'bg-white border-slate-200 text-slate-800'
        }`}>
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-amber-700 flex items-center">
              <Clock className="w-4 h-4 mr-1.5 text-amber-600" />
              Campaign đã cũ (&gt;30 ngày)
            </span>
            <span className="px-2 py-0.5 text-xs font-bold rounded-full bg-amber-100 text-amber-700">
              {staleCampaigns.length} cần đổi mới
            </span>
          </div>
          <div className="mt-2">
            <div className="text-2xl font-bold tracking-tight text-amber-900">
              {staleCampaigns.length}
            </div>
            <p className="text-xs text-amber-700 mt-1">
              Nội dung/Angle đã bão hòa hoặc quá chu kỳ chạy hiệu quả.
            </p>
          </div>
        </div>

        {/* Card 3: Tỷ lệ phủ chiến dịch theo tháng */}
        <div className="p-4 rounded-xl border border-slate-200 bg-white shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-600 flex items-center">
              <CheckCircle2 className="w-4 h-4 mr-1.5 text-emerald-600" />
              Độ phủ Campaign tháng này
            </span>
            <span className="px-2 py-0.5 text-xs font-bold rounded-full bg-slate-100 text-slate-700">
              {coveragePercent}%
            </span>
          </div>
          <div className="mt-2">
            <div className="text-2xl font-bold tracking-tight text-slate-900">
              {activeCampaignsCount} <span className="text-sm font-normal text-slate-500">đang chạy</span>
            </div>
            {/* Thanh tiến độ */}
            <div className="w-full bg-slate-100 h-2 rounded-full mt-2 overflow-hidden">
              <div 
                className="bg-emerald-500 h-full rounded-full transition-all duration-500" 
                style={{ width: `${coveragePercent}%` }}
              />
            </div>
          </div>
        </div>

      </div>

      {/* Danh sách hành động khẩn cấp (Action Reminders Panel) */}
      {(missingProducts.length > 0 || staleCampaigns.length > 0) && (
        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
          <div className="flex items-center justify-between mb-3 border-b border-slate-100 pb-2.5">
            <div className="flex items-center space-x-2">
              <span className="h-2 w-2 rounded-full bg-rose-500 animate-pulse" />
              <h3 className="text-sm font-bold text-slate-900">
                Action Center: Các đầu việc Marketing cần giải quyết hôm nay
              </h3>
            </div>
            <span className="text-xs text-slate-500">
              Tự động đối soát từ chu kỳ sản phẩm
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            
            {/* Cột nhắc: Sản phẩm chưa có campaign */}
            {missingProducts.length > 0 && (
              <div className="space-y-2">
                <div className="text-xs font-semibold text-rose-700 flex items-center">
                  <AlertCircle className="w-3.5 h-3.5 mr-1" />
                  Sản phẩm chưa có Campaign ({missingProducts.length}):
                </div>
                {missingProducts.map(prod => (
                  <div 
                    key={prod.id}
                    className="flex items-center justify-between p-2.5 bg-rose-50/50 rounded-lg border border-rose-100 hover:border-rose-300 transition-colors"
                  >
                    <div>
                      <div className="font-semibold text-xs text-slate-900">{prod.name}</div>
                      <div className="text-[11px] text-slate-500">{prod.branch} • {prod.topicGroup}</div>
                    </div>
                    <button
                      onClick={() => onQuickCreateCampaign(prod.id)}
                      className="inline-flex items-center px-2.5 py-1 text-xs font-medium text-rose-700 bg-white border border-rose-200 rounded-md hover:bg-rose-100 hover:text-rose-800 transition-colors shadow-xs"
                    >
                      <PlusCircle className="w-3.5 h-3.5 mr-1 text-rose-500" />
                      Tạo ngay
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Cột nhắc: Campaign cũ cần đổi mới */}
            {staleCampaigns.length > 0 && (
              <div className="space-y-2">
                <div className="text-xs font-semibold text-amber-700 flex items-center">
                  <Clock className="w-3.5 h-3.5 mr-1" />
                  Chiến dịch đã chạy lâu &gt; 30 ngày ({staleCampaigns.length}):
                </div>
                {staleCampaigns.map(({ campaign, product }) => (
                  <div 
                    key={campaign.id}
                    className="flex items-center justify-between p-2.5 bg-amber-50/50 rounded-lg border border-amber-100 hover:border-amber-300 transition-colors"
                  >
                    <div>
                      <div className="font-semibold text-xs text-slate-900">
                        {campaign.title}
                      </div>
                      <div className="text-[11px] text-amber-800 flex items-center">
                        <span className="font-medium text-slate-700 mr-1.5">{product?.name}</span>
                        • Đã chạy {campaign.daysRunning} ngày
                      </div>
                    </div>
                    <button
                      onClick={() => onQuickRefreshCampaign(campaign)}
                      className="inline-flex items-center px-2.5 py-1 text-xs font-medium text-amber-800 bg-white border border-amber-200 rounded-md hover:bg-amber-100 transition-colors shadow-xs"
                    >
                      <RefreshCw className="w-3.5 h-3.5 mr-1 text-amber-600" />
                      Làm mới
                    </button>
                  </div>
                ))}
              </div>
            )}

          </div>
        </div>
      )}
    </div>
  );
}
