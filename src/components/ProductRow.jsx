import React, { useState } from 'react';
import { 
  ChevronDown, 
  ChevronRight, 
  Plus, 
  RefreshCw, 
  Calendar, 
  Users, 
  HelpCircle, 
  Tag, 
  AlertTriangle,
  CheckCircle,
  Clock,
  Sparkles,
  ExternalLink
} from 'lucide-react';

export default function ProductRow({ 
  product, 
  campaign, 
  onAddCampaign, 
  onRefreshCampaign 
}) {
  const [expanded, setExpanded] = useState(false);

  // Xác định trạng thái của sản phẩm trong tháng
  let statusType = 'missing';
  if (campaign) {
    if (campaign.status === 'needs_refresh' || campaign.daysRunning > 30) {
      statusType = 'needs_refresh';
    } else {
      statusType = 'active';
    }
  }

  return (
    <div className={`border rounded-xl transition-all duration-200 ${
      statusType === 'missing' 
        ? 'bg-white border-rose-200 hover:border-rose-300' 
        : statusType === 'needs_refresh'
          ? 'bg-white border-amber-200 hover:border-amber-300'
          : 'bg-white border-slate-200 hover:border-slate-300'
    } shadow-xs`}>
      
      {/* Hàng chính: Tổng quan Product -> Brief -> Campaign -> Monthly Status -> Action */}
      <div className="p-4 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        
        {/* Khối 1: Thông tin Sản phẩm (Tên, Nhánh đề tài, Nhóm chủ đề) */}
        <div className="lg:w-1/3 flex items-start space-x-3">
          <button 
            onClick={() => setExpanded(!expanded)} 
            className="mt-1 text-slate-400 hover:text-slate-600 transition-colors"
            title="Xem chi tiết Bài toán & Người dùng"
          >
            {expanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
          </button>
          
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-bold text-slate-900 text-sm hover:text-indigo-600 transition-colors cursor-pointer"
                    onClick={() => setExpanded(!expanded)}>
                {product.name}
              </span>
              <span className="px-2 py-0.5 text-[11px] font-medium rounded-md bg-slate-100 text-slate-600 border border-slate-200">
                {product.branch}
              </span>
            </div>
            
            <div className="text-xs text-slate-500 mt-1 flex items-center">
              <Tag className="w-3 h-3 mr-1 text-slate-400" />
              <span>{product.topicGroup}</span>
            </div>
          </div>
        </div>

        {/* Khối 2: Thông tin Campaign hiện tại theo tháng */}
        <div className="lg:w-5/12 border-t lg:border-t-0 lg:border-l border-slate-100 pt-3 lg:pt-0 lg:pl-4">
          {campaign ? (
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <span className="font-semibold text-xs text-slate-800 line-clamp-1">
                  {campaign.title}
                </span>
                <span className="text-[11px] text-slate-400 shrink-0">
                  ({campaign.daysRunning} ngày)
                </span>
              </div>
              <p className="text-xs text-slate-600 line-clamp-1 italic">
                "{campaign.topicBrief}"
              </p>
              {/* Kênh phân phối */}
              <div className="flex flex-wrap gap-1 pt-1">
                {campaign.channels?.map((ch, idx) => (
                  <span key={idx} className="text-[10px] px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 font-medium">
                    {ch}
                  </span>
                ))}
              </div>
            </div>
          ) : (
            <div className="flex items-center space-x-2 text-rose-600 text-xs py-1">
              <AlertTriangle className="w-4 h-4 text-rose-500 shrink-0" />
              <span className="font-medium">Chưa có Campaign trong tháng này!</span>
            </div>
          )}
        </div>

        {/* Khối 3: Trạng thái tháng (Monthly Status Badge) */}
        <div className="lg:w-2/12 flex items-center">
          {statusType === 'missing' && (
            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-rose-50 text-rose-700 border border-rose-200">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mr-1.5" />
              Thiếu Campaign
            </span>
          )}

          {statusType === 'needs_refresh' && (
            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-800 border border-amber-200">
              <Clock className="w-3.5 h-3.5 mr-1 text-amber-600" />
              Cần đổi mới
            </span>
          )}

          {statusType === 'active' && (
            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
              <CheckCircle className="w-3.5 h-3.5 mr-1 text-emerald-600" />
              Đang chạy tốt
            </span>
          )}
        </div>

        {/* Khối 4: Nút Hành động (CTA) */}
        <div className="lg:w-2/12 flex items-center justify-end space-x-2">
          {statusType === 'missing' ? (
            <button
              onClick={() => onAddCampaign(product.id)}
              className="w-full lg:w-auto inline-flex items-center justify-center px-3 py-1.5 text-xs font-semibold text-white bg-rose-600 hover:bg-rose-700 rounded-lg transition-colors shadow-xs"
            >
              <Plus className="w-3.5 h-3.5 mr-1" />
              Tạo Campaign
            </button>
          ) : (
            <button
              onClick={() => onRefreshCampaign(campaign)}
              className={`w-full lg:w-auto inline-flex items-center justify-center px-3 py-1.5 text-xs font-medium rounded-lg transition-colors border shadow-xs ${
                statusType === 'needs_refresh'
                  ? 'bg-amber-600 hover:bg-amber-700 text-white border-transparent'
                  : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-300'
              }`}
            >
              <RefreshCw className="w-3 h-3 mr-1.5" />
              {statusType === 'needs_refresh' ? 'Đổi Campaign' : 'Làm mới / Sửa'}
            </button>
          )}
        </div>

      </div>

      {/* Vùng mở rộng: Chi tiết đầy đủ 5 trường của Product & Đề xuất AI */}
      {expanded && (
        <div className="px-5 py-4 border-t border-slate-100 bg-slate-50/70 rounded-b-xl text-xs space-y-3">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Trường 4: Bài toán */}
            <div className="bg-white p-3 rounded-lg border border-slate-200">
              <div className="font-semibold text-slate-700 mb-1 flex items-center">
                <HelpCircle className="w-3.5 h-3.5 mr-1 text-indigo-500" />
                Bài toán giải quyết (Pain Point):
              </div>
              <p className="text-slate-600 leading-relaxed">
                {product.problemStatement}
              </p>
            </div>

            {/* Trường 5: Người dùng */}
            <div className="bg-white p-3 rounded-lg border border-slate-200">
              <div className="font-semibold text-slate-700 mb-1 flex items-center">
                <Users className="w-3.5 h-3.5 mr-1 text-emerald-500" />
                Đối tượng người dùng mục tiêu (Persona):
              </div>
              <p className="text-slate-600 leading-relaxed">
                {product.targetUser}
              </p>
            </div>

          </div>

          {/* Nếu có campaign, hiển thị thêm next action & AI suggestions */}
          {campaign && (
            <div className="bg-white p-3 rounded-lg border border-slate-200 flex flex-col md:flex-row justify-between items-start md:items-center gap-2">
              <div>
                <span className="font-semibold text-slate-700 mr-2">Hành động tiếp theo:</span>
                <span className="text-slate-600">{campaign.nextAction || "Tiếp tục theo dõi hiệu quả kênh."}</span>
              </div>
              
              {campaign.aiSuggestion && (
                <div className="inline-flex items-center px-2.5 py-1 rounded-md bg-indigo-50 border border-indigo-100 text-indigo-700 text-[11px]">
                  <Sparkles className="w-3.5 h-3.5 mr-1.5 text-indigo-500" />
                  <span>Gợi ý Tối ưu: {campaign.aiSuggestion.recommendedAngle}</span>
                </div>
              )}
            </div>
          )}

        </div>
      )}

    </div>
  );
}
