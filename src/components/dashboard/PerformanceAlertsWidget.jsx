import React, { useState } from 'react';
import { AlertOctagon, Zap, Sparkles } from 'lucide-react';

export default function PerformanceAlertsWidget({ alerts, onApplyOption }) {
  const [expandedAlertId, setExpandedAlertId] = useState(null);

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md border border-slate-200/80 transition-all duration-200 flex flex-col justify-between space-y-4">
      <div>
        {/* Header */}
        <div className="flex items-center justify-between pb-3.5 border-b border-slate-100">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shadow-2xs">
              <AlertOctagon className="w-4 h-4" strokeWidth={1.75} />
            </div>
            <div>
              <h3 className="font-bold text-sm text-slate-900 tracking-tight">Performance Alerts</h3>
              <p className="text-xs text-slate-400 font-normal">Cảnh báo hiệu suất và gợi ý can thiệp từ hệ thống</p>
            </div>
          </div>
          <span className="text-[10px] font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600">
            Realtime
          </span>
        </div>

        {/* Alerts List */}
        <div className="space-y-3 mt-4">
          {(alerts || []).map((item) => {
            const isCritical = item.severity === 'critical';
            const isWarning = item.severity === 'warning';
            const isSuccess = item.severity === 'success';
            const hasOptions = item.abTestOptions && item.abTestOptions.length > 0;
            const isExpanded = expandedAlertId === item.id;

            // Semantic button styling by intent
            const actionBtnStyle = isSuccess
              ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-200/50'
              : isWarning
              ? 'bg-amber-500 hover:bg-amber-600 text-white shadow-amber-200/50'
              : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-200/50';

            return (
              <div
                key={item.id}
                className="p-4 rounded-xl text-xs bg-slate-50/70 border border-slate-200/70 hover:border-slate-300 transition-all space-y-3"
              >
                {/* Metric Header with bold semantic indicator colors */}
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div className="flex items-center space-x-2">
                    <strong className="font-bold text-slate-900 text-xs">{item.productName}:</strong>
                    {isCritical ? (
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-rose-50 text-rose-700 border border-rose-200 shadow-2xs">
                        {item.metricChange}
                      </span>
                    ) : isWarning ? (
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-800 border border-amber-200 shadow-2xs">
                        {item.metricChange}
                      </span>
                    ) : (
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 shadow-2xs">
                        {item.metricChange}
                      </span>
                    )}
                  </div>
                  <span className="text-[10px] text-slate-400 font-normal">{item.time}</span>
                </div>

                {/* Performance Diagnosis - Background Tím/Xanh pastel êm dịu */}
                <div className="bg-gradient-to-r from-indigo-50/80 to-purple-50/60 rounded-xl p-3 border border-indigo-150/80 text-slate-700 text-xs flex items-start space-x-2.5 shadow-2xs">
                  <Sparkles className="w-3.5 h-3.5 text-indigo-600 shrink-0 mt-0.5" strokeWidth={1.75} />
                  <div className="leading-relaxed flex-1">
                    <span className="font-bold text-indigo-950 mr-1">Chẩn đoán Hệ thống:</span>
                    <span className="text-slate-700 font-medium">{item.aiSuggestion}</span>
                  </div>
                </div>

                {/* 3 Phương án A/B Test phác thảo sẵn */}
                {hasOptions && isExpanded && (
                  <div className="p-3 bg-white rounded-lg space-y-2 border border-indigo-100 animate-in fade-in duration-150">
                    <div className="font-bold text-slate-800 text-xs flex items-center">
                      <Sparkles className="w-3 h-3 mr-1.5 text-indigo-600" strokeWidth={1.75} />
                      3 Phương án A/B Creative phác thảo sẵn:
                    </div>
                    {item.abTestOptions.map((opt, idx) => (
                      <div key={idx} className="p-2.5 bg-slate-50/70 rounded-lg flex items-center justify-between text-xs border border-slate-200/60">
                        <div>
                          <div className="font-bold text-slate-900">{opt.name}</div>
                          <div className="text-slate-500 text-[11px]">{opt.angle} • <em>{opt.format}</em></div>
                        </div>
                        <button
                          onClick={() => alert(`Đã duyệt khởi chạy ${opt.name} lên Meta Ads!`)}
                          className="px-3 py-1 rounded-full text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 transition-colors cursor-pointer"
                        >
                          Kích hoạt
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {/* Action buttons (Semantic Intent Colors) */}
                <div className="flex items-center justify-end space-x-2 pt-1">
                  {hasOptions && (
                    <button
                      onClick={() => setExpandedAlertId(isExpanded ? null : item.id)}
                      className="px-3 py-1.5 rounded-full text-xs font-medium text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 hover:border-slate-300 transition-colors cursor-pointer shadow-2xs"
                    >
                      {isExpanded ? 'Đóng phương án' : 'Xem 3 phương án A/B'}
                    </button>
                  )}

                  <button
                    onClick={() => alert(`Đã kích hoạt hành động cho ${item.productName}`)}
                    className={`inline-flex items-center px-3.5 py-1.5 rounded-full text-xs font-bold transition-all duration-200 shadow-xs hover:shadow-md cursor-pointer ${actionBtnStyle}`}
                  >
                    <Zap className="w-3 h-3 mr-1" strokeWidth={1.75} />
                    {item.actionText}
                  </button>
                </div>

              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
