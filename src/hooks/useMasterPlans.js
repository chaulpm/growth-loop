import { useState, useEffect, useCallback } from 'react';
import { 
  fetchMasterPlans, 
  createMasterPlan, 
  approveMasterPlanWithLock, 
  rejectMasterPlan 
} from '../services/masterPlanService';

export function useMasterPlans() {
  const [masterPlans, setMasterPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadPlans = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchMasterPlans();
      setMasterPlans(data);
    } catch (err) {
      console.error('Lỗi load master plans:', err);
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadPlans();
  }, [loadPlans]);

  const submitNewPlan = async (planData) => {
    try {
      const created = await createMasterPlan(planData);
      setMasterPlans(prev => [created, ...prev]);
      return created;
    } catch (err) {
      console.error('Lỗi tạo master plan:', err);
      throw err;
    }
  };

  const approvePlan = async (planId, currentVersionHash, approverId) => {
    try {
      const approved = await approveMasterPlanWithLock(planId, currentVersionHash, approverId);
      setMasterPlans(prev => prev.map(p => {
        if (p.id === planId) {
          return {
            ...p,
            status: 'approved',
            approvedAt: new Date().toISOString()
          };
        }
        return p;
      }));
      return approved;
    } catch (err) {
      console.error('Lỗi phê duyệt master plan:', err);
      throw err;
    }
  };

  const rejectPlan = async (planId, currentVersionHash, reason) => {
    try {
      const rejected = await rejectMasterPlan(planId, currentVersionHash, reason);
      setMasterPlans(prev => prev.map(p => {
        if (p.id === planId) {
          return {
            ...p,
            status: 'rejected',
            rejectReason: reason
          };
        }
        return p;
      }));
      return rejected;
    } catch (err) {
      console.error('Lỗi từ chối master plan:', err);
      throw err;
    }
  };

  return {
    masterPlans,
    setMasterPlans,
    loading,
    error,
    submitNewPlan,
    approvePlan,
    rejectPlan,
    reload: loadPlans
  };
}
