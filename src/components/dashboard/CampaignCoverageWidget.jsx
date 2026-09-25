import React from 'react';
import { Target, ArrowRight, Sparkles, AlertTriangle, Layers, CheckCircle2 } from 'lucide-react';

export default function CampaignCoverageWidget({ 
  products = [], 
  coverageData, 
  onNavigateToProducts,
  onOpenGuidedPlanning 
}) {
  const { 
    totalProducts = 12, 
    coveredProducts = 8, 
    missingProducts = 4, 
    needsRefresh = 1, 
    activeCampaignsTotal = 15, 
    coveragePercent = 67 
  } = coverageData || {};

  // Filter products by brand (Alpha & Beta)
  const alphaProducts = products.filter(p => p.brand === 'Alpha');
  const betaProducts = products.filter(p => p.brand === 'Beta');

  const alphaTotal = alphaProducts.length || 8;
  const alphaCovered = alphaProducts.filter(p => (p.metaSync?.activeCampaignsCount || 0) > 0).length || 5;
  const alphaPercent = alphaTotal > 0 ? Math.round((alphaCovered / alphaTotal) * 100) : 63;

  const betaTotal = betaProducts.length || 4;
  const betaCovered = betaProducts.filter(p => (p.metaSync?.activeCampaignsCount || 0) > 0).length || 3;
  const betaPercent = betaTotal > 0 ? Math.round((betaCovered / betaTotal) * 100) : 75;

  // Gap products without any active campaign
  const gapProducts = products.filter(p => (p.metaSync?.activeCampaignsCount || 0) === 0);

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md border border-slate-200/80 transition-all duration-300 flex flex-col justify-between space-y-5 h-full">
      <div className="space-y-4">
        
        {/* 1. Header */}
        <div className="flex items-center justify-between pb-3.5 border-b border-slate-100">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shadow-2xs">
              <Target className="w-4 h-4" strokeWidth={1.75} />
            </div>
            <div>
              <h3 className="font-bold text-sm text-slate-900 tracking-tight flex items-center gap-2">
                Campaign Coverage
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-100/80">
                  Danh mục 12 SP
                </span>
              </h3>
              <p className="text-xs text-slate-400 font-normal">Độ phủ chiến dịch & Sức khỏe danh mục sản phẩm</p>
            </div>
          </div>
          <div className="text-right">
            <span className="text-lg font-bold text-indigo-600 tracking-tight">
              {coveragePercent}%
            </span>
            <span className="text-[11px] text-slate-400 font-medium ml-1">Đạt chuẩn</span>
          </div>
        </div>

        {/* 2. Overall Progress Bar */}
        <div className="space-y-1.5">
          <div className="flex items-baseline justify-between text-xs">
            <span className="text-slate-500 font-medium">Sản phẩm đang chạy chiến dịch</span>
            <span className="font-bold text-slate-800">{coveredProducts} / {totalProducts} sản phẩm</span>
          </div>
          <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden flex p-0.5">
            <div 
              className="bg-gradient-to-r from-indigo-500 to-indigo-600 h-full rounded-full transition-all duration-500 shadow-2xs" 
              style={{ width: `${coveragePercent}%` }} 
            />
          </div>
        </div>

        {/* 3. 3-Column Summary Badges */}
        <div className="grid grid-cols-3 divide-x divide-slate-100 rounded-xl bg-slate-50/60 border border-slate-200/60 py-3 text-center">
          <div className="px-2">
            <div className="text-lg font-bold text-slate-900 tracking-tight">{activeCampaignsTotal}</div>
            <div className="mt-0.5">
              <span className="inline-block bg-emerald-50 text-emerald-700 font-bold text-[10px] px-2 py-0.5 rounded-full border border-emerald-200 shadow-2xs">
                Active
              </span>
            </div>
          </div>

          <div className="px-2">
            <div className="text-lg font-bold text-slate-900 tracking-tight">{missingProducts}</div>
            <div className="mt-0.5">
              <span className="inline-block bg-rose-50 text-rose-700 font-bold text-[10px] px-2 py-0.5 rounded-full border border-rose-200 shadow-2xs">
                Thiếu Camp
              </span>
            </div>
          </div>

          <div className="px-2">
            <div className="text-lg font-bold text-slate-900 tracking-tight">{needsRefresh}</div>
            <div className="mt-0.5">
              <span className="inline-block bg-amber-50 text-amber-800 font-bold text-[10px] px-2 py-0.5 rounded-full border border-amber-200 shadow-2xs">
                Cần đổi KV
              </span>
            </div>
          </div>
        </div>

        {/* 4. Brand Coverage Breakdown (Alpha & Beta) */}
        <div className="space-y-3 pt-1">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-slate-800 tracking-tight flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-indigo-600" />
              Độ phủ theo Khối kinh doanh
            </span>
            <span className="text-[11px] text-slate-400 font-medium">2 Khối kinh doanh</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Khối Alpha */}
            <div className="p-3 rounded-xl bg-slate-50/70 border border-slate-200/70 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs text-slate-900 flex items-center gap-1.5">
                  <span>🚀</span> Khối Alpha (SaaS & Cloud)
                </span>
                <span className="text-[11px] font-bold text-indigo-700 bg-indigo-50 border border-indigo-100 px-2 py-0.5 rounded-full">
                  {alphaCovered}/{alphaTotal} ({alphaPercent}%)
                </span>
              </div>
              <div className="w-full bg-slate-200/70 h-1.5 rounded-full overflow-hidden">
                <div 
                  className="bg-indigo-600 h-full rounded-full transition-all duration-500" 
                  style={{ width: `${alphaPercent}%` }} 
                />
              </div>
              {/* Product Pills */}
              <div className="flex flex-wrap gap-1 pt-1">
                {alphaProducts.slice(0, 6).map(p => {
                  const hasCamp = (p.metaSync?.activeCampaignsCount || 0) > 0;
                  return (
                    <span 
                      key={p.id}
                      className={`text-[10px] px-2 py-0.5 rounded-md font-medium border flex items-center gap-1 ${
                        hasCamp 
                          ? 'bg-emerald-50/80 text-emerald-800 border-emerald-200/70' 
                          : 'bg-rose-50 text-rose-700 border-rose-200/80 font-semibold'
                      }`}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full ${hasCamp ? 'bg-emerald-500' : 'bg-rose-500'}`} />
                      {p.name}
                      {hasCamp && <span className="text-[9px] opacity-75 font-bold">({p.metaSync.activeCampaignsCount})</span>}
                    </span>
                  );
                })}
                {alphaProducts.length > 6 && (
                  <span className="text-[10px] px-1.5 py-0.5 rounded-md text-slate-500 bg-slate-100 font-medium">
                    +{alphaProducts.length - 6} khác
                  </span>
                )}
              </div>
            </div>

            {/* Khối Beta */}
            <div className="p-3 rounded-xl bg-slate-50/70 border border-slate-200/70 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs text-slate-900 flex items-center gap-1.5">
                  <span>⚡</span> Khối Beta (Enterprise Solutions)
                </span>
                <span className="text-[11px] font-bold text-indigo-700 bg-indigo-50 border border-indigo-100 px-2 py-0.5 rounded-full">
                  {betaCovered}/{betaTotal} ({betaPercent}%)
                </span>
              </div>
              <div className="w-full bg-slate-200/70 h-1.5 rounded-full overflow-hidden">
                <div 
                  className="bg-indigo-600 h-full rounded-full transition-all duration-500" 
                  style={{ width: `${betaPercent}%` }} 
                />
              </div>
              {/* Product Pills */}
              <div className="flex flex-wrap gap-1 pt-1">
                {betaProducts.map(p => {
                  const hasCamp = (p.metaSync?.activeCampaignsCount || 0) > 0;
                  const isWarning = p.aiDiagnosis?.urgency === 'warning';
                  return (
                    <span 
                      key={p.id}
                      className={`text-[10px] px-2 py-0.5 rounded-md font-medium border flex items-center gap-1 ${
                        !hasCamp 
                          ? 'bg-rose-50 text-rose-700 border-rose-200/80 font-semibold'
                          : isWarning
                          ? 'bg-amber-50 text-amber-800 border-amber-200/80 font-medium'
                          : 'bg-emerald-50/80 text-emerald-800 border-emerald-200/70'
                      }`}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full ${!hasCamp ? 'bg-rose-500' : isWarning ? 'bg-amber-500' : 'bg-emerald-500'}`} />
                      {p.name}
                      {hasCamp && <span className="text-[9px] opacity-75 font-bold">({p.metaSync.activeCampaignsCount})</span>}
                    </span>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* 5. Smart Gap Action Card */}
        <div className="p-3.5 rounded-xl bg-gradient-to-r from-indigo-50/80 via-purple-50/60 to-blue-50/40 border border-indigo-150/80 space-y-2.5 shadow-2xs">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Sparkles className="w-4 h-4 text-indigo-600 shrink-0" />
              <span className="font-bold text-xs text-indigo-950">Phân tích Thiếu hụt Chiến dịch:</span>
            </div>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-100 text-rose-700 border border-rose-200">
              {missingProducts} SP chưa có camp
            </span>
          </div>

          <p className="text-xs text-slate-700 leading-relaxed font-normal">
            Phát hiện <strong>{missingProducts} sản phẩm</strong> chưa có chiến dịch phủ sóng (Cloud Hosting, VMC, S-MIME, Chữ ký số). Khuyến nghị ưu tiên lập Master Plan cho <strong>Cloud Hosting</strong> & <strong>Chữ ký số</strong> để đón đầu nhu cầu chốt số cuối tháng.
          </p>

          <div className="flex items-center justify-between pt-1 flex-wrap gap-2">
            <div className="flex items-center space-x-1.5 text-[11px] text-slate-500">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-500 shrink-0" />
              <span>Ưu tiên: <strong className="text-slate-800">Cloud Hosting & Chữ ký số</strong></span>
            </div>

            {onOpenGuidedPlanning && (
              <button
                onClick={onOpenGuidedPlanning}
                className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-full text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 transition-all shadow-xs cursor-pointer hover:scale-102 active:scale-98"
              >
                <Sparkles className="w-3.5 h-3.5 text-indigo-200" />
                <span>+ Tạo Plan Nhanh</span>
              </button>
            )}
          </div>
        </div>

      </div>

      {/* 6. Footer Link */}
      <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
        <span className="text-[11px] text-slate-400 font-normal">Dữ liệu đồng bộ realtime với Product Master</span>
        <button
          onClick={onNavigateToProducts}
          className="inline-flex items-center space-x-1 text-xs font-semibold text-indigo-600 hover:text-indigo-700 transition-colors group cursor-pointer"
        >
          <span>Xem chi tiết trong Product Master</span>
          <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" strokeWidth={1.75} />
        </button>
      </div>

    </div>
  );
}
