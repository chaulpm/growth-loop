import React, { useState } from 'react';
import { 
  ChevronDown, 
  ChevronRight, 
  Zap, 
  HelpCircle, 
  Users, 
  Sparkles, 
  Layers, 
  ArrowRight,
  AlertCircle,
  Globe
} from 'lucide-react';

export default function ProductCard3Zone({ product, onTriggerAction }) {
  const [showFiveFields, setShowFiveFields] = useState(false);
  const [showCampaignsDetail, setShowCampaignsDetail] = useState(false);

  const { metaSync, aiDiagnosis } = product;
  const isSyncLive = metaSync?.status === 'live';
  const hasCampaigns = metaSync?.activeCampaignsCount > 0;
  const isAlpha = product.brand === 'Alpha';

  return (
    <div className="bg-white rounded-3xl shadow-sm hover:shadow-md border border-slate-200/80 hover:border-slate-300 transition-all overflow-hidden">
      
      {/* 3 PHÂN KHU CHÍNH */}
      <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-slate-100">
        
        {/* KHU VỰC 1: THÔNG TIN SẢN PHẨM & TRẠNG THÁI API (BÊN TRÁI - 3.5/12) */}
        <div className="lg:col-span-4 p-6 flex flex-col justify-between space-y-4">
          <div>
            {/* Brand Badge & Category */}
            <div className="flex items-center space-x-2 mb-1.5">
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                isAlpha 
                  ? 'bg-blue-50 text-blue-700 border border-blue-100' 
                  : 'bg-emerald-50 text-emerald-700 border border-emerald-100'
              }`}>
                {isAlpha ? '🚀 Khối Alpha (SaaS & Cloud)' : '⚡ Khối Beta (Enterprise Solutions)'}
              </span>

              <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
                {product.branch}
              </span>
            </div>

            {/* Tên sản phẩm */}
            <h4 
              className="font-bold text-base text-slate-900 tracking-tight hover:text-indigo-600 transition-colors cursor-pointer"
              onClick={() => setShowFiveFields(!showFiveFields)}
            >
              {product.name}
            </h4>

            {/* ĐẶC BIỆT: Danh sách các Chips nhóm Tên Miền (Nếu là thẻ Tên Miền) */}
            {product.isSpecialDomainCard && product.domainChips && (
              <div className="mt-2.5 pt-2 border-t border-slate-100 space-y-1.5">
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center">
                  <Globe className="w-3 h-3 mr-1 text-indigo-500" />
                  Nhóm đuôi mở rộng & ngành hàng:
                </div>
                <div className="flex flex-wrap gap-1">
                  {product.domainChips.map((chip, idx) => (
                    <span 
                      key={idx} 
                      className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-slate-50 text-slate-700 border border-slate-200/60 hover:bg-indigo-50 hover:text-indigo-700 hover:border-indigo-200 transition-colors"
                    >
                      {chip}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Live Sync Meta Ads Badge */}
            <div className="mt-3">
              {isSyncLive ? (
                <div className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-[11px] font-semibold text-emerald-800">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                  </span>
                  <span>Live Sync: Meta Ads</span>
                  <span className="text-emerald-600 font-normal text-[10px]">({metaSync.lastSynced})</span>
                </div>
              ) : (
                <div className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-full bg-slate-100 text-[11px] font-medium text-slate-500">
                  <span className="h-1.5 w-1.5 rounded-full bg-slate-400" />
                  <span>Meta Ads: Chưa liên kết</span>
                </div>
              )}
            </div>
          </div>

          {/* Nút xem Pain Point & Persona */}
          <button
            onClick={() => setShowFiveFields(!showFiveFields)}
            className="text-[11px] font-medium text-slate-400 hover:text-slate-700 flex items-center pt-1 transition-colors w-fit"
          >
            {showFiveFields ? <ChevronDown className="w-3.5 h-3.5 mr-1" /> : <ChevronRight className="w-3.5 h-3.5 mr-1" />}
            <span>{showFiveFields ? 'Thu gọn' : 'Xem Pain Point & Persona'}</span>
          </button>
        </div>

        {/* KHU VỰC 2: CHỈ SỐ HIỆU SUẤT THỜI GIAN THỰC (GIỮA - 4/12) */}
        <div className="lg:col-span-4 p-6 flex flex-col justify-between bg-slate-50/40 space-y-3">
          {hasCampaigns ? (
            <div>
              <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                <button
                  onClick={() => setShowCampaignsDetail(!showCampaignsDetail)}
                  className="font-bold text-indigo-600 hover:text-indigo-800 flex items-center space-x-1"
                >
                  <span>{metaSync?.activeCampaignsCount} Campaigns</span>
                  <span className="text-[10px] text-slate-400">({showCampaignsDetail ? 'Đóng' : 'Chi tiết'})</span>
                </button>
                <span className="text-[11px] text-slate-400">Từ {metaSync.startDate}</span>
              </div>

              {/* Số liệu to, rõ ràng: 250 Leads | 15 SQLs */}
              <div className="bg-white p-4 rounded-2xl shadow-2xs">
                <div className="flex items-baseline space-x-3">
                  <div className="text-2xl font-black text-slate-900 tracking-tight">
                    {metaSync.conversions.leads} <span className="text-xs font-semibold text-slate-400">Leads</span>
                  </div>
                  <span className="text-slate-200 text-lg">/</span>
                  <div className="text-2xl font-black text-emerald-600 tracking-tight">
                    {metaSync.conversions.sqls} <span className="text-xs font-semibold text-emerald-700">SQLs</span>
                  </div>
                </div>

                <div className="mt-2 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                  <span>{metaSync.conversions.cpl} / Lead</span>
                  <span>Tổng: {metaSync.conversions.spend}</span>
                  <span className="font-bold text-emerald-700">CVR {metaSync.conversions.cvr}</span>
                </div>
              </div>
            </div>
          ) : (
            /* KHÔNG CÓ CAMPAIGN: Gộp 1 block duy nhất */
            <div className="h-full flex flex-col items-center justify-center p-5 bg-white/80 rounded-2xl text-center">
              <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 mb-2">
                <AlertCircle className="w-4 h-4" />
              </div>
              <div className="text-xs font-bold text-slate-700">Chưa có chiến dịch trong tháng</div>
              <div className="text-[11px] text-slate-400 mt-0.5">Chưa phát sinh dữ liệu pixel Meta Ads</div>
            </div>
          )}

          <div className="text-[10px] text-slate-400 truncate">
            Ad Account: {metaSync?.adAccountId}
          </div>
        </div>

        {/* KHU VỰC 3: AI DIAGNOSIS & HÀNH ĐỘNG (BÊN PHẢI - 4/12) */}
        <div className="lg:col-span-4 p-6 flex flex-col justify-between space-y-4 bg-gradient-to-br from-indigo-50/20 to-purple-50/30">
          <div>
            <div className={`p-4 rounded-2xl text-xs space-y-2.5 ${
              aiDiagnosis?.urgency === 'danger'
                ? 'bg-rose-50/60'
                : aiDiagnosis?.urgency === 'warning'
                ? 'bg-amber-50/60'
                : 'bg-indigo-50/60'
            }`}>
              
              {/* Header nhỏ gọn với Badge */}
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-slate-700 flex items-center">
                  <Sparkles className="w-3.5 h-3.5 mr-1 text-indigo-600" />
                  Chẩn đoán Hệ thống
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-white/80 text-slate-700">
                  {aiDiagnosis?.badge}
                </span>
              </div>

              {/* Vấn đề: Font chữ mỏng hơn, màu nhạt hơn */}
              <div className="text-[11px] leading-relaxed">
                <span className="text-slate-400 font-medium mr-1.5">Vấn đề:</span>
                <span className="text-slate-600 font-normal">{aiDiagnosis?.problem}</span>
              </div>

              {/* Đề xuất: Làm nổi bật, font đậm hơn */}
              <div className="text-xs leading-relaxed pt-1">
                <span className="text-indigo-950 font-bold mr-1.5">Đề xuất:</span>
                <span className="text-slate-900 font-semibold">{aiDiagnosis?.solution}</span>
              </div>
            </div>
          </div>

          {/* CTA Ngữ cảnh */}
          <div className="flex justify-end">
            <button
              onClick={() => onTriggerAction(product, aiDiagnosis?.actionCtaText)}
              className={`inline-flex items-center px-4 py-2 rounded-full text-xs font-bold text-white transition-all duration-200 shadow-2xs hover:shadow-md cursor-pointer ${
                aiDiagnosis?.urgency === 'danger'
                  ? 'bg-rose-600 hover:bg-rose-700'
                  : aiDiagnosis?.urgency === 'warning'
                  ? 'bg-amber-600 hover:bg-amber-700'
                  : 'bg-indigo-600 hover:bg-indigo-700'
              }`}
            >
              <Zap className="w-3.5 h-3.5 mr-1.5" />
              <span>{aiDiagnosis?.actionCtaText}</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
            </button>
          </div>
        </div>

      </div>

      {/* DROPDOWN CHI TIẾT AD SETS */}
      {showCampaignsDetail && hasCampaigns && (
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 text-xs space-y-2 animate-in fade-in duration-150">
          <div className="font-bold text-slate-700 flex items-center">
            <Layers className="w-3.5 h-3.5 mr-1 text-indigo-600" />
            Chi tiết các Ad Sets Meta Ads:
          </div>
          <div className="space-y-1.5">
            {metaSync.runningCampaigns?.map((camp, idx) => (
              <div key={idx} className="flex items-center justify-between p-2.5 bg-white rounded-xl text-[11px]">
                <span className="font-medium text-slate-800">{camp.name}</span>
                <div className="flex items-center space-x-3 text-slate-500">
                  <span>Chi tiêu: <strong className="text-slate-700">{camp.spend}</strong></span>
                  <span>Kết quả: <strong className="text-emerald-700">{camp.leads} Leads</strong></span>
                  <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 font-semibold">{camp.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* MỞ RỘNG PAIN POINT & PERSONA */}
      {showFiveFields && (
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 text-xs space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="bg-white p-3.5 rounded-2xl">
              <div className="font-bold text-slate-700 mb-1 flex items-center">
                <HelpCircle className="w-3.5 h-3.5 mr-1 text-indigo-500" />
                Bài toán giải quyết:
              </div>
              <p className="text-slate-600 leading-relaxed text-[11px]">
                {product.problemStatement}
              </p>
            </div>

            <div className="bg-white p-3.5 rounded-2xl">
              <div className="font-bold text-slate-700 mb-1 flex items-center">
                <Users className="w-3.5 h-3.5 mr-1 text-emerald-500" />
                Khách hàng mục tiêu:
              </div>
              <p className="text-slate-600 leading-relaxed text-[11px]">
                {product.targetUser}
              </p>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
