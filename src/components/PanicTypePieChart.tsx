import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import type { Panic } from '../api/panic';

const COLORS = [
  '#0088FE', // Blue
  '#00C49F', // Teal
  '#FFBB28', // Yellow
  '#FF8042', // Orange
  '#8884D8', // Purple
  '#82ca9d', // Light Green
  '#d0ed57', // Lime
  '#a4de6c', // Light Lime
  '#ffc658', // Light Orange
  '#ff6666', // Red
];


interface PieChartData {
  name: string;
  value: number;
}

export default function PanicTypePieChart({ panics }: { panics: Panic[] }) {
  // Group and count panic types
  const panicTypeCounts = panics.reduce((acc, panic) => {
    const type = panic.panic_type || 'Unknown';
    acc[type] = (acc[type] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const data: PieChartData[] = Object.entries(panicTypeCounts).map(
    ([name, value]) => ({ name, value })
  );

  return (
    <div className="bg-white p-4 rounded-lg shadow h-full">
      <h3 className="text-lg font-semibold mb-4 text-center">Emergency Types Distribution</h3>

      {data.length > 0 ? (
        <>
          {/* Chart */}
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  labelLine={false}
                  label={({ name, percent }) =>
                    `${name}: ${((percent ?? 0) * 100).toFixed(0)}%`
                  }
                  dataKey="value"
                >
                  {data.map((_, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${value} cases`, 'Count']} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Responsive Legend */}
          <div className="mt-4 flex flex-wrap justify-center gap-4 text-sm">
            {data.map((entry, index) => (
              <div
                key={`legend-${index}`}
                className="flex items-center space-x-2"
              >
                <span
                  className="w-3 h-3 rounded-full inline-block"
                  style={{ backgroundColor: COLORS[index % COLORS.length] }}
                ></span>
                <span className="text-gray-700">{entry.name}</span>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="flex items-center justify-center h-full text-gray-500">
          No data available
        </div>
      )}
    </div>
  );
}
