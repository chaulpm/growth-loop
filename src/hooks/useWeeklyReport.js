import { useState, useEffect, useCallback } from 'react';
import { fetchWeeklyReport, saveWeeklyReport } from '../services/reportService';

export function useWeeklyReport(weekId = 'w-38') {
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadReport = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchWeeklyReport(weekId);
      setReport(data);
    } catch (err) {
      console.error('Lỗi load weekly report:', err);
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [weekId]);

  useEffect(() => {
    loadReport();
  }, [loadReport]);

  const saveReport = async (reportData) => {
    try {
      setReport(reportData);
      const result = await saveWeeklyReport(reportData);
      return result;
    } catch (err) {
      console.error('Lỗi lưu report:', err);
      throw err;
    }
  };

  return {
    report,
    setReport,
    loading,
    error,
    saveReport,
    reload: loadReport
  };
}
