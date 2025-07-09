// src/App.tsx
import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useAuthStore from './store/authStore';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import HistoryPage from './pages/HistoryPage';
import Layout from './components/Layout';
import Footer from './components/Footer';

function App() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen bg-gray-100">
        <ToastContainer position="top-right" />
        <Routes>
          <Route path="/login" element={
            isAuthenticated ? <Navigate to="/" /> : <LoginPage />
          } />
          <Route path="/" element={
            isAuthenticated ? <Layout /> : <Navigate to="/login" />
          }>
            <Route index element={<DashboardPage />} />
            <Route path="history" element={<HistoryPage />} />
          </Route>
        </Routes>
        {isAuthenticated && <Footer />}
      </div>
    </BrowserRouter>
  );
}

export default App;