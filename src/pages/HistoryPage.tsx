import { useState, useEffect } from 'react';
import { getPanicHistory, cancelPanic } from '../api/panic';
import { toast } from 'react-toastify';
import PanicTypePieChart from '../components/PanicTypePieChart';
import ReportGenerator from '../components/ReportGenerator';
import EmergencyTypeCounts from '../components/EmergencyTypeCounts';

type Panic = {
  id: number;
  longitude: string;
  latitude: string;
  panic_type: string;
  details: string;
  created_at: string;
  status: {
    id: number;
    name: string;
  };
};


const statusColors: Record<number, string> = {
  1: 'bg-yellow-100 text-yellow-800', // In Progress
  2: 'bg-red-100 text-red-800',       // Cancelled
  3: 'bg-green-100 text-green-800'    // Resolved
};

export default function HistoryPage() {
  const [panics, setPanics] = useState<Panic[]>([]);
  const [statusFilter, setStatusFilter] = useState<number | null>(null);
  const [, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const handleStatusChange = async (panicId: number, newStatusId: number) => {
    try {
      if (newStatusId === 2) {
        await cancelPanic(panicId);
      }
      setPanics(panics.map(panic => 
        panic.id === panicId 
          ? { 
              ...panic, 
              status: { 
                id: newStatusId, 
                name: newStatusId === 2 ? 'Cancelled' : 'Resolved' 
              } 
            } 
          : panic
      ));
      toast.success(
        newStatusId === 2 
          ? 'Panic cancelled successfully' 
          : 'Panic marked as resolved (local only)'
      );
    } catch (error) {
      toast.error(`Failed to update panic status`);
    }
  };

  useEffect(() => {
    const fetchHistory = async () => {
      setIsLoading(true);
      try {
        const response = await getPanicHistory(statusFilter || undefined);
        const sortedPanics = (response.data.panics || [] as Panic[])
          .sort((a: Panic, b: Panic) => {
            const dateA = new Date(a.created_at).getTime();
            const dateB = new Date(b.created_at).getTime();
            return dateB - dateA;
          });
        setPanics(sortedPanics);
        setCurrentPage(1);
      } catch (error) {
        toast.error('Failed to load history', {
          position: 'top-center',
          className: 'bg-red-100 text-red-800 font-bold'
        });
      } finally {
        setIsLoading(false);
      }
    };
    fetchHistory();
  }, [statusFilter]);

  const displayedPanics = panics.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(panics.length / itemsPerPage);

return (
  <div className="flex flex-col min-h-screen p-4 md:p-6 gap-6">
    {/* Row 1 - Panic History Table */}
    <div className="max-w-7xl w-full mx-auto bg-white rounded-xl shadow-xl overflow-hidden flex flex-col min-h-[400px]">
      <div className="bg-gradient-to-r from-gray-800 to-gray-900 p-4 text-white">
        <h1 className="text-xl font-bold">PANIC HISTORY</h1>
      </div>

      <div className="p-6 flex flex-col flex-grow">
        {/* Status Filter */}
        <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="w-full sm:w-auto">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Filter by Status
            </label>
            <select
              value={statusFilter || ''}
              onChange={(e) =>
                setStatusFilter(e.target.value ? Number(e.target.value) : null)
              }
              className="w-full sm:w-64 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500"
            >
              <option value="">All Statuses</option>
              <option value="1">In Progress</option>
              <option value="2">Cancelled</option>
              <option value="3">Resolved</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="flex flex-col flex-grow">
          <div className="overflow-x-auto rounded border border-gray-200 flex-grow">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Details</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {displayedPanics.map((panic) => (
                  <tr key={panic.id} className="hover:bg-gray-50 transition-colors duration-150">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{panic.panic_type || 'Emergency'}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{panic.details || '-'}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(panic.created_at).toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          statusColors[panic.status.id] || 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {panic.status.name}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        {panic.status.id === 1 && (
                          <>
                            <button
                              onClick={() => handleStatusChange(panic.id, 2)}
                              className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 text-xs"
                            >
                              Cancel
                            </button>
                            <button
                              onClick={() => handleStatusChange(panic.id, 3)}
                              className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 text-xs"
                            >
                              Resolve
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {panics.length > itemsPerPage && (
            <div className="mt-4 py-4 flex flex-wrap justify-between items-center bg-white border-t border-gray-200 gap-2">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
              >
                Previous
              </button>
               <div className="flex flex-wrap justify-center gap-1 overflow-x-auto max-w-full">
                {Array.from({ length: totalPages }, (_, i) => (
                  <button
                    key={i + 1}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`w-8 h-8 rounded-md text-sm ${
                      currentPage === i + 1
                        ? 'bg-blue-600 text-white'
                        : 'bg-white text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
              <button
                onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                disabled={currentPage >= totalPages}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>
    </div>

    {/* Row 2 - Charts */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Pie Chart */}
      <div className="bg-white rounded-xl shadow-xl overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow duration-200 flex flex-col">
        <div className="bg-gradient-to-r bg-yellow-500 text-gray-900 px-4 py-3 text-white">
          <h2 className="text-base sm:text-lg md:text-xl font-bold">EMERGENCY TYPES</h2>
        </div>
        <div className="flex-1 p-4">
          <PanicTypePieChart panics={panics} />
        </div>
      </div>

      {/* Bar Chart */}
      <div className="bg-white rounded-xl shadow-xl overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow duration-200 flex flex-col">
        <div className="bg-gradient-to-r from-indigo-600 to-indigo-800 px-4 py-3 text-white">
          <h2 className="text-base sm:text-lg md:text-xl font-bold">EMERGENCY TYPES</h2>
        </div>
        <div className="flex-1 p-4">
            <EmergencyTypeCounts panics={panics} />
        </div>
      </div>
    </div>

    {/* Row 3 - Report Generator */}
    <div className="bg-white rounded-xl shadow-xl overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow duration-200">
      <div className="bg-gradient-to-r from-gray-700 to-gray-900 px-4 py-3 text-white">
        <h2 className="text-base sm:text-lg md:text-xl font-bold">REPORT GENERATOR</h2>
      </div>
      <div className="p-4">
        <ReportGenerator panics={panics} />
      </div>
    </div>
  </div>
);
}
