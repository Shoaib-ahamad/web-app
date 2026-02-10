'use client';

import { useTaskStore } from '../contexts/taskStore';

export function useTasks() {
  const store = useTaskStore();

  return {
    tasks: store.tasks,
    stats: store.stats,
    isLoading: store.isLoading,
    filters: store.filters,
    setFilters: store.setFilters,
    fetchTasks: store.fetchTasks,
    fetchStats: store.fetchStats,
    createTask: store.createTask,
    updateTask: store.updateTask,
    deleteTask: store.deleteTask
  };
}
