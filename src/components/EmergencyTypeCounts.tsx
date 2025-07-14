// src/components/EmergencyTypeCounts.tsx
import type { Panic } from '../api/panic';

export default function EmergencyTypeCounts({ panics }: { panics: Panic[] }) {
  // Count panic types
  const panicTypeCounts = panics.reduce((acc, panic) => {
    const type = panic.panic_type || 'Emergency';
    acc[type] = (acc[type] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="bg-white p-4 rounded-lg shadow h-full">
      <h3 className="text-lg font-semibold mb-4">Emergency Type Counts</h3>
      
      {Object.keys(panicTypeCounts).length > 0 ? (
        <table className="w-full">
          <tbody>
            {Object.entries(panicTypeCounts).map(([type, count]) => (
              <tr key={type} className="border-b">
                <td className="py-2 font-medium">{type}</td>
                <td className="py-2 text-right">
                  <span className="bg-gray-100 px-3 py-1 rounded-full text-sm">
                    {count} {count === 1 ? 'case' : 'cases'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="flex items-center justify-center h-full text-gray-500">
          No emergency data available
        </div>
      )}
    </div>
  );
}