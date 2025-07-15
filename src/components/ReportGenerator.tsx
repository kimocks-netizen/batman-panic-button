// src/components/ReportGenerator.tsx
import { useRef, useState } from 'react';
import html2pdf from 'html2pdf.js';
import type { Panic } from '../api/panic';

interface ReportGeneratorProps {
  panics: Panic[];
}

interface DangerZone {
  center: [number, number];
  radius: number;
  panicCount: number;
  types: string[];
}

export default function ReportGenerator({ panics }: ReportGeneratorProps) {
  const reportRef = useRef<HTMLDivElement>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Calculate statistics
  const totalPanics = panics.length;

  // Count emergency types
  const emergencyTypeCounts = panics.reduce((acc, panic) => {
    const type = panic.panic_type || 'Emergency';
    acc[type] = (acc[type] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Calculate danger zones
  const calculateDangerZones = (panics: Panic[]): DangerZone[] => {
    if (panics.length === 0) return [];
    
    const locations = panics.map(p => ({
      lat: parseFloat(p.latitude),
      lng: parseFloat(p.longitude),
      type: p.panic_type || 'Emergency'
    }));

    const clusters: DangerZone[] = [];
    const processed = new Set<number>();
    const clusterDistance = 0.01; // ~1km in degrees

    locations.forEach((loc, i) => {
      if (processed.has(i)) return;

      const nearby = locations
        .map((l, idx) => ({ ...l, idx }))
        .filter((l, idx) => {
          const distance = Math.sqrt(
            Math.pow(l.lat - loc.lat, 2) + 
            Math.pow(l.lng - loc.lng, 2)
          );
          return distance < clusterDistance && !processed.has(idx);
        });

      if (nearby.length > 1) {
        const avgLat = nearby.reduce((sum, l) => sum + l.lat, 0) / nearby.length;
        const avgLng = nearby.reduce((sum, l) => sum + l.lng, 0) / nearby.length;
        
        const types = [...new Set(nearby.map(l => l.type))];
        
        clusters.push({
          center: [avgLat, avgLng],
          radius: clusterDistance,
          panicCount: nearby.length,
          types: types.filter(t => t) // Remove any undefined types
        });

        nearby.forEach(l => processed.add(l.idx));
      }
    });

    return clusters.sort((a, b) => b.panicCount - a.panicCount);
  };

  const dangerZones = calculateDangerZones(panics);
  const reportDate = new Date().toLocaleDateString();
  const reportTime = new Date().toLocaleTimeString();

  const handleDownloadPdf = () => {
    if (reportRef.current) {
      const opt = {
        margin: 0.5,
        filename: 'batman-panic-report.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
      };

      html2pdf().from(reportRef.current).set(opt).save();
    }
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const renderReportContent = () => {
    return (
      <>
        <div style={{ minHeight: '11in', position: 'relative' }}>
          <h1 className="text-2xl font-bold mb-2 text-black dark:text-black">Batman Panic System Report</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Generated on {reportDate} at {reportTime}
          </p>

          {/* Summary Statistics */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-3">Summary</h2>
            <div className="grid grid-cols-1 gap-4 mb-4">
              <div className="border p-2 rounded">
                <p className="font-medium text-black dark:text-black">Total Panics</p>
                <p className="text-xl font-bold text-black dark:text-black">{totalPanics}</p>
              </div>
            </div>
          </div>

          {/* Emergency Type Counts */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-3">Emergency Type Distribution</h2>
            <table className="w-full border-collapse">
              <tbody>
                {Object.entries(emergencyTypeCounts)
                  .sort((a, b) => b[1] - a[1])
                  .map(([type, count]) => (
                    <tr key={type} className="border-b text-sm font-medium text-gray-900">
                      <td className="p-2 font-medium text-black dark:text-black">{type}</td>
                      <td className="p-2 text-right">
                        <span className="bg-gray-200 dark:bg-gray-200 px-3 py-1 rounded-full text-sm text-black">
                          {count} {count === 1 ? 'case' : 'cases'}
                        </span>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>

          {/* Danger Zones */}
          {dangerZones.length > 0 && (
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-3">Danger Zones</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {dangerZones.slice(0, 4).map((zone, i) => (
                  <div key={i} className="border p-4 rounded bg-red-50">
                    <h3 className="font-bold text-red-800">Hotspot #{i + 1}</h3>
                    <p className="text-sm text-black dark:text-black">
                      <span className="font-semibold">Location:</span> {zone.center[0].toFixed(4)}, {zone.center[1].toFixed(4)}
                    </p>
                    <p className="text-sm text-black dark:text-black">
                      <span className="font-semibold">Panic Count:</span> {zone.panicCount}
                    </p>
                    <p className="text-sm text-black dark:text-black">
                      <span className="font-semibold">Common Emergency Types:</span> {zone.types.join(', ')}
                    </p>
                    <p className="text-sm text-black dark:text-black">
                      <span className="font-semibold">Radius:</span> ~1km
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Recent Panics Table */}
          <h2 className="text-xl font-semibold mb-3">Recent Panics</h2>
          <table className="w-full border-collapse mb-6">
            <thead>
              <tr className="bg-gray-100 dark:bg-gray-200">
                <th className="border p-2 text-left text-black dark:text-black">Type</th>
                <th className="border p-2 text-left text-black dark:text-black">Date/Time</th>
                <th className="border p-2 text-left text-black dark:text-black">Status</th>
                <th className="border p-2 text-left text-black dark:text-black">Location</th>
              </tr>
            </thead>
            <tbody>
              {panics.slice(0, 10).map((panic) => (
                <tr key={panic.id} className="border-b text-sm font-medium text-gray-900">
                  <td className="border p-2 text-black dark:text-black">{panic.panic_type || 'Emergency'}</td>
                  <td className="border p-2 text-black dark:text-black">
                    {new Date(panic.created_at).toLocaleString()}
                  </td>
                  <td className="border p-2 text-black dark:text-black">{panic.status.name}</td>
                  <td className="border p-2 text-black dark:text-black">
                    {panic.latitude}, {panic.longitude}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Footer */}
          <div className="text-sm text-gray-600 dark:text-gray-400 mt-6">
            <p>This report was automatically generated by the Batman Panic System.</p>
            <p>Confidential - For authorized personnel only.</p>
          </div>
        </div>
      </>
    );
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={openModal}
          className="flex-1 py-3 px-4 rounded-lg text-white font-bold shadow-md transition-all
            bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 transform hover:scale-[1.01]"
        >
          View Report
        </button>
        <button
          onClick={handleDownloadPdf}
          className="flex-1 py-3 px-4 rounded-lg text-white font-bold shadow-md transition-all
            bg-gradient-to-r from-red-600 to-red-800 hover:from-red-700 hover:to-red-900 transform hover:scale-[1.01]"
        >
          Download PDF
        </button>
      </div>

      {/* Hidden printable content */}
      <div ref={reportRef} className="p-6 bg-white rounded-lg">
        {renderReportContent()}
      </div>

      {/* Modal dialog */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full sm:max-w-4xl max-h-[90vh] overflow-auto">
            <div className="p-6">
              {renderReportContent()}
            </div>
            <div className="sticky bottom-0 bg-white border-t p-4 flex justify-end gap-3">
              <button
                onClick={closeModal}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleDownloadPdf}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                Download PDF
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}