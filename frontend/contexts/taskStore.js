import { create } from 'zustand';
import { taskAPI } from '../lib/types';

export const useTaskStore = create((set, get) => ({
  tasks: [],
  stats: null,
  isLoading: false,
  filters: {
    status: '',
    priority: '',
    search: '',
    sort: ''
  },

  setFilters: (filters) => {
    set({ filters });
  },

  fetchTasks: async () => {
    set({ isLoading: true });
    try {
      const { filters } = get();
      const response = await taskAPI.getTasks(filters);
      set({ tasks: response.data.data, isLoading: false });
      return { success: true };
    } catch (error) {
      set({ isLoading: false });
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to fetch tasks'
      };
    }
  },

  fetchStats: async () => {
    try {
      const response = await taskAPI.getStats();
      set({ stats: response.data });
      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to fetch stats'
      };
    }
  },

  createTask: async (data) => {
    set({ isLoading: true });
    try {
      const response = await taskAPI.createTask(data);
      set((state) => ({
        tasks: [response.data.data, ...state.tasks],
        isLoading: false
      }));
      return { success: true, task: response.data.data };
    } catch (error) {
      set({ isLoading: false });
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to create task'
      };
    }
  },

  updateTask: async (id, data) => {
    set({ isLoading: true });
    try {
      const response = await taskAPI.updateTask(id, data);
      set((state) => ({
        tasks: state.tasks.map((task) =>
          task._id === id ? response.data.data : task
        ),
        isLoading: false
      }));
      return { success: true, task: response.data.data };
    } catch (error) {
      set({ isLoading: false });
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to update task'
      };
    }
  },

  deleteTask: async (id) => {
    set({ isLoading: true });
    try {
      await taskAPI.deleteTask(id);
      set((state) => ({
        tasks: state.tasks.filter((task) => task._id !== id),
        isLoading: false
      }));
      return { success: true };
    } catch (error) {
      set({ isLoading: false });
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to delete task'
      };
    }
  }
}));
