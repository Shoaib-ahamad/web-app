'use client';

import { formatDistanceToNow } from 'date-fns';

const statusColors = {
  pending: 'bg-yellow-100 text-yellow-800',
  'in-progress': 'bg-blue-100 text-blue-800',
  completed: 'bg-green-100 text-green-800'
};

const priorityColors = {
  low: 'text-green-600',
  medium: 'text-yellow-600',
  high: 'text-red-600'
};

export function TaskCard({ task, onEdit, onDelete }) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition">
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-lg font-semibold text-gray-900 flex-1">{task.title}</h3>
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[task.status]}`}>
          {task.status}
        </span>
      </div>

      {task.description && (
        <p className="text-sm text-gray-600 mb-3">{task.description}</p>
      )}

      <div className="flex flex-wrap gap-2 mb-3">
        <span className={`text-xs font-medium ${priorityColors[task.priority]}`}>
          Priority: {task.priority}
        </span>
        {task.dueDate && (
          <span className="text-xs text-gray-500">
            Due: {formatDistanceToNow(new Date(task.dueDate), { addSuffix: true })}
          </span>
        )}
      </div>

      {task.tags && task.tags.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-3">
          {task.tags.map((tag) => (
            <span key={tag} className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">
              {tag}
            </span>
          ))}
        </div>
      )}

      <div className="flex gap-2">
        <button
          onClick={() => onEdit(task)}
          className="text-sm bg-blue-100 text-blue-700 px-3 py-1 rounded hover:bg-blue-200 transition"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(task._id)}
          className="text-sm bg-red-100 text-red-700 px-3 py-1 rounded hover:bg-red-200 transition"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
