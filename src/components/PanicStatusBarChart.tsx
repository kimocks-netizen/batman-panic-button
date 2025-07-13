// src/components/PanicStatusBarChart.tsx
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import type { Panic } from '../api/panic';

export default function PanicStatusBarChart({ panics }: { panics: Panic[] }) {
  // Count each status type
  const inProgressCount = panics.filter(p => p.status.name === 'In progress').length;
  const cancelledCount = panics.filter(p => p.status.name === 'Cancelled').length;

  // Normalized data for two bars
  const chartData = [
    {
      name: 'Status',
      InProgress: inProgressCount,
      Cancelled: cancelledCount,
    },
  ];

  return (
    <div className="bg-white p-4 rounded-lg shadow h-full">
      <h3 className="text-lg font-semibold mb-4">Panic Status Overview</h3>
      <div className="h-64">
        {panics.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              layout="vertical"
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <XAxis type="number" />
              <YAxis dataKey="name" type="category" />
              <Tooltip />
              <Legend />
              <Bar dataKey="InProgress" fill="#FFBB28" name="In Progress" />
              <Bar dataKey="Cancelled" fill="#FF8042" name="Cancelled" />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500">
            No panic data available
          </div>
        )}
      </div>
    </div>
  );
}
