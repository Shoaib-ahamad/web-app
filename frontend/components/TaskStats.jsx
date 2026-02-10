'use client';

export function TaskStats({ stats }) {
  if (!stats) return null;

  const statusMap = {};
  stats.byStatus?.forEach((item) => {
    statusMap[item._id] = item.count;
  });

  const priorityMap = {};
  stats.byPriority?.forEach((item) => {
    priorityMap[item._id] = item.count;
  });

  const StatCard = ({ label, value, color }) => (
    <div className="bg-white rounded-lg border border-gray-200 p-4">
      <p className="text-sm text-gray-600 mb-1">{label}</p>
      <p className={`text-2xl font-bold ${color}`}>{value}</p>
    </div>
  );

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      <StatCard label="Total" value={Object.values(statusMap).reduce((a, b) => a + b, 0)} color="text-blue-600" />
      <StatCard label="Pending" value={statusMap['pending'] || 0} color="text-yellow-600" />
      <StatCard label="In Progress" value={statusMap['in-progress'] || 0} color="text-blue-600" />
      <StatCard label="Completed" value={statusMap['completed'] || 0} color="text-green-600" />
    </div>
  );
}
