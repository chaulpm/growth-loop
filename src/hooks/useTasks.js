import { useState, useEffect, useCallback } from 'react';
import { fetchTasks, updateTaskStage, createTasksBatch } from '../services/taskService';

export function useTasks() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadTasks = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchTasks();
      setTasks(data);
    } catch (err) {
      console.error('Lỗi load tasks:', err);
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadTasks();
  }, [loadTasks]);

  const moveTask = async (taskId, newStage, learningNotes = null) => {
    // 1. Optimistic Update phía UI ngay lập tức
    setTasks(prev => prev.map(t => {
      if (t.id === taskId) {
        return {
          ...t,
          stage: newStage,
          learningNotes: learningNotes || t.learningNotes,
          updatedAt: new Date().toISOString()
        };
      }
      return t;
    }));

    // 2. Gửi request cập nhật lên Database
    try {
      await updateTaskStage(taskId, newStage, learningNotes);
    } catch (err) {
      console.error('Lỗi lưu trạng thái task lên DB, revert lại:', err);
      // Revert lại nếu có lỗi
      loadTasks();
      throw err;
    }
  };

  const addGeneratedTasks = async (newTasks) => {
    // Optimistic UI update
    setTasks(prev => [...newTasks, ...prev]);

    try {
      await createTasksBatch(newTasks);
    } catch (err) {
      console.warn('Lỗi chèn tasks vào DB:', err);
    }
  };

  return {
    tasks,
    setTasks,
    loading,
    error,
    moveTask,
    addGeneratedTasks,
    reload: loadTasks
  };
}
