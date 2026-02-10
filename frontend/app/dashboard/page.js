'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { DashboardNavbar } from '../../components/DashboardNavbar';
import { TaskForm } from '../../components/TaskForm';
import { TaskCard } from '../../components/TaskCard';
import { TaskFilters } from '../../components/TaskFilters';
import { TaskStats } from '../../components/TaskStats';
import { Modal } from '../../components/Modal';
import { useTasks } from '../../hooks/useTasks';
import { useAuth } from '../../hooks/useAuth';
import toast from 'react-hot-toast';

export default function DashboardPage() {
  const router = useRouter();
  const { user, isAuthenticated } = useAuth();
  const { tasks, stats, isLoading, filters, setFilters, fetchTasks, fetchStats, createTask, updateTask, deleteTask } = useTasks();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  useEffect(() => {
    if (isAuthenticated) {
      fetchTasks();
      fetchStats();
    }
  }, [isAuthenticated, filters]);

  const handleCreateTask = async (task) => {
    const result = await createTask(task);
    if (result.success) {
      setIsModalOpen(false);
      setEditingTask(null);
      await fetchStats();
    }
  };

  const handleUpdateTask = (task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const handleSaveEdit = async (task) => {
    const result = await updateTask(editingTask._id, task);
    if (result.success) {
      setIsModalOpen(false);
      setEditingTask(null);
      await fetchStats();
    }
  };

  const handleDeleteTask = async (taskId) => {
    if (confirm('Are you sure you want to delete this task?')) {
      const result = await deleteTask(taskId);
      if (result.success) {
        toast.success('Task deleted!');
        await fetchStats();
      }
    }
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div>
      <DashboardNavbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <button
            onClick={() => {
              setEditingTask(null);
              setIsModalOpen(true);
            }}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition"
          >
            + New Task
          </button>
        </div>

        <TaskStats stats={stats} />

        <TaskFilters filters={filters} onFilterChange={setFilters} />

        {isLoading && tasks.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">Loading tasks...</p>
          </div>
        ) : tasks.length === 0 ? (
          <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
            <p className="text-gray-500 text-lg">No tasks found</p>
            <p className="text-gray-400">Create a new task to get started</p>
          </div>
        ) : (
          <div className="grid gap-4">
            {tasks.map((task) => (
              <TaskCard
                key={task._id}
                task={task}
                onEdit={handleUpdateTask}
                onDelete={handleDeleteTask}
              />
            ))}
          </div>
        )}
      </main>

      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingTask(null);
        }}
        title={editingTask ? 'Edit Task' : 'Create New Task'}
      >
        <TaskForm
          onSuccess={editingTask ? handleSaveEdit : handleCreateTask}
          initialData={editingTask}
        />
      </Modal>
    </div>
  );
}
