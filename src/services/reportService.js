import { supabase, isSupabaseConfigured } from '../lib/supabaseClient';
import { WEEKLY_REPORT_DATA } from '../data/mockData';

export async function fetchWeeklyReport(weekId = 'w-38') {
  if (!isSupabaseConfigured) {
    return WEEKLY_REPORT_DATA;
  }

  const { data, error } = await supabase
    .from('weekly_reports')
    .select('*')
    .eq('id', weekId)
    .single();

  if (error || !data) {
    console.warn(`Chưa tìm thấy báo cáo ${weekId} trên Supabase, fallback sang mock:`, error);
    return WEEKLY_REPORT_DATA;
  }

  return {
    id: data.id,
    currentWeekId: data.id,
    weekTitle: data.title,
    period: data.period,
    generatedTime: 'Hôm nay lúc 16:30',
    defaultRecipients: data.recipients,
    executiveSummary: data.executive_summary,
    conversionTracking: {
      items: data.conversion_metrics || []
    },
    theGood: data.the_good || [],
    theBadAndRisks: data.the_bad_and_risks || [],
    actionPlan: data.action_plan || []
  };
}

export async function saveWeeklyReport(reportData) {
  if (!isSupabaseConfigured) {
    return reportData;
  }

  const payload = {
    id: reportData.currentWeekId || reportData.id || 'w-38',
    week_number: 38,
    period: reportData.period || '15/09/2026 - 21/09/2026',
    title: reportData.weekTitle || 'Báo Cáo Growth Marketing - Tuần 38',
    executive_summary: reportData.executiveSummary || '',
    recipients: reportData.recipients || reportData.defaultRecipients || 'Alex',
    conversion_metrics: reportData.conversionTracking?.items || [],
    the_good: reportData.theGood || [],
    the_bad_and_risks: reportData.theBadAndRisks || [],
    action_plan: reportData.actionPlan || [],
    updated_at: new Date().toISOString()
  };

  const { data, error } = await supabase
    .from('weekly_reports')
    .upsert([payload])
    .select();

  if (error) {
    console.error('Lỗi lưu báo cáo tuần lên Supabase:', error);
    throw error;
  }

  return data[0];
}
