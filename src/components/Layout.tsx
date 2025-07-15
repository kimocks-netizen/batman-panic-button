// src/components/Layout.tsx
import { Outlet, Link, useLocation } from 'react-router-dom';
import useAuthStore from '../store/authStore';

export default function Layout() {
  const logout = useAuthStore((state) => state.logout);
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;
  return (
 <div className="flex flex-col flex-1">
      <nav className="bg-gradient-to-r from-gray-900 to-gray-800 shadow-lg">
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <Link 
              to="/" 
              className="flex items-center text-white font-bold text-xl"
            >
              <span className="bg-yellow-500 text-gray-900 px-2 py-1 rounded mr-2">⚡</span>
              BAT PANIC
            </Link>
            <div className="flex space-x-4">
              <Link
                to="/"
                className={`px-3 py-1 sm:px-4 sm:py-2 rounded-md font-medium ${
                  isActive('/') 
                    ? 'bg-yellow-500 text-gray-900 hover:bg-yellow-600'
                    : 'text-white hover:bg-gray-700'
                }`}
              >
                Panic Button
              </Link>
              <Link
                to="/history"
                className={`px-3 py-1 sm:px-4 sm:py-2 rounded-md font-medium ${
                  isActive('/history')
                    ? 'bg-yellow-500 text-gray-900 hover:bg-yellow-600'
                    : 'text-white hover:bg-gray-700'
                }`}
              >
                History
              </Link>
              <button
                onClick={logout}
                className="px-3 py-1 sm:px-4 sm:py-2 text-white bg-green-600 hover:bg-red-700 rounded-md font-medium"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>
       <main className="flex-1 overflow-y-auto sm:overflow-visible"> {/* Crucial for map */}
        <Outlet />
      </main>
    </div>
  );
}