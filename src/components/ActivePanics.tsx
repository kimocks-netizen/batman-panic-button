// src/components/ActivePanics.tsx
import { useState, useEffect } from 'react';
import { getPanicHistory } from '../api/panic';
import { toast } from 'react-toastify';

// Define the Panic type directly in the component file
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

export default function ActivePanics() {
  const [panics, setPanics] = useState<Panic[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    const fetchPanics = async () => {
      try {
        const response = await getPanicHistory(1); // Status 1 = In Progress
        // Sort by most recent first (newest at top) with proper typing
        const sortedPanics = (response.data.panics || [] as Panic[])
          .sort((a: Panic, b: Panic) => {
            const dateA = new Date(a.created_at).getTime();
            const dateB = new Date(b.created_at).getTime();
            return dateB - dateA; // Descending order
          });
        setPanics(sortedPanics);
      } catch (error) {
        toast.error('Failed to load active panics');
      }
    };

    fetchPanics();
    const interval = setInterval(fetchPanics, 30000);
    return () => clearInterval(interval);
  }, []);

  // Calculate displayed panics (most recent first)
  const displayedPanics = panics.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(panics.length / itemsPerPage);

  return (
    <div className="flex flex-col h-full">
      {/* Panics List */}
      <div className="flex-1 overflow-y-auto space-y-3">
        {displayedPanics.length > 0 ? (
          displayedPanics.map((panic) => (
            <div 
              key={panic.id} 
              className="border border-gray-200 rounded-lg p-3 hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold">{panic.panic_type || 'Emergency'}</h3>
                  <p className="text-sm text-gray-600">
                    {panic.details || 'No details provided'}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {new Date(panic.created_at).toLocaleString()}
                  </p>
                </div>
                <span className={`px-2 py-1 text-xs font-bold rounded-full ${
                  panic.status.id === 1 ? 'bg-yellow-100 text-yellow-800' :
                  panic.status.id === 2 ? 'bg-red-100 text-red-800' :
                  'bg-green-100 text-green-800'
                }`}>
                  {panic.status.name}
                </span>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8 text-gray-500">
            No active panic signals
          </div>
        )}
      </div>

      {/* Pagination Controls */}
      {panics.length > itemsPerPage && (
        <div className="mt-4 flex justify-between items-center border-t pt-3">
          <button
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 border rounded disabled:opacity-50 text-sm"
          >
            Previous
          </button>
          <span className="text-sm text-gray-600">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage(p => p + 1)}
            disabled={currentPage >= totalPages}
            className="px-3 py-1 border rounded disabled:opacity-50 text-sm"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}