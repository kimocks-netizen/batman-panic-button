import PanicButton from '../components/PanicButton';
import ActivePanics from '../components/ActivePanics';
import PanicMap from '../components/PanicMap';
import usePanicStore from "../store/panicStore";

export default function DashboardPage() {
  const { activePanics } = usePanicStore();

  return (
    <div className="flex flex-col h-[calc(100vh-64px)] w-full p-4 gap-4">
      {/* Three Column Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 flex-1 min-h-0">
        {/* Column 1 - Panic Button Card */}
        <div className="bg-white rounded-xl shadow-xl overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow duration-200 flex flex-col order-1">
          <div className="bg-gradient-to-r from-red-600 to-red-800 px-4 py-3 text-white">
            <h2 className="text-lg font-bold">EMERGENCY PANIC BUTTON</h2>
          </div>
          <div className="flex-1 p-4 flex items-center justify-center">
            <PanicButton />
          </div>
        </div>

        {/* Column 2 - Active Panics Card */}
        <div className="bg-white rounded-xl shadow-xl overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow duration-200 flex flex-col order-2 md:order-3 lg:order-2">
          <div className="bg-gradient-to-r from-gray-800 to-gray-900 px-4 py-3 text-white">
            <h2 className="text-lg font-bold">ACTIVE PANICS</h2>
          </div>
          <div className="flex-1 overflow-auto">
            <ActivePanics />
          </div>
        </div>

        {/* Column 3 - Map Card (Full Height) */}
        <div className="bg-white rounded-xl shadow-xl overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow duration-200 flex flex-col order-3 md:order-2 lg:order-3">
          <div className="bg-gradient-to-r from-blue-800 to-blue-600 px-4 py-3 text-white">
            <h2 className="text-lg font-bold">PANIC LOCATIONS</h2>
          </div>
          <div className="flex-1 min-h-0">
            <PanicMap panics={activePanics} />
          </div>
        </div>
      </div>
    </div>
  );
}