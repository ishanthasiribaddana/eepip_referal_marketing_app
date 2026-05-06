import React, { useEffect, useState, lazy, Suspense } from 'react';
import { Routes, Route, Navigate, useNavigate, Outlet } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import SuspenseFallback from './components/common/SuspenseFallback';
import { authService } from '../api/authService';
import Register from './pages/Register';

// Lazy load all pages for code splitting
const Login = lazy(() => import('./pages/Login'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Tree = lazy(() => import('./pages/Tree'));
const Commissions = lazy(() => import('./pages/Commissions'));
const Profile = lazy(() => import('./pages/Profile'));
const StudentMatch = lazy(() => import('./pages/StudentMatch'));
const BankDashboard = lazy(() => import('./pages/BankDashboard'));
const AgentDashboard = lazy(() => import('./pages/AgentDashboard'));
const AdminPanel = lazy(() => import('./pages/AdminPanel'));
const Reports = lazy(() => import('./pages/Reports'));

function AuthGuard({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const [isValidating, setIsValidating] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const token = authService.getToken();
      if (!token) {
        navigate('/login');
        setIsValidating(false);
        return;
      }

      // Skip backend validation for mock tokens (used when SSO service is down)
      if (token.startsWith('mock_jwt_token_')) {
        setIsValidating(false);
        return;
      }

      try {
        const isValid = await authService.validateSession();
        if (!isValid) {
          navigate('/login');
        }
      } catch {
        // If SSO service is unreachable, allow access (graceful degradation)
        console.warn('SSO unreachable, allowing access');
      } finally {
        setIsValidating(false);
      }
    };

    checkAuth();
  }, [navigate]);

  if (isValidating) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500" />
      </div>
    );
  }

  return <>{children}</>;
}

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Suspense fallback={<SuspenseFallback />}><Login /></Suspense>} />
      <Route element={<MainLayout />}>
        <Route path="/register" element={<Register />} />
        <Route element={<AuthGuard><><Outlet /></></AuthGuard>}>
          <Route path="/dashboard" element={<Suspense fallback={<SuspenseFallback />}><Dashboard /></Suspense>} />
          <Route path="/tree" element={<Suspense fallback={<SuspenseFallback />}><Tree /></Suspense>} />
          <Route path="/commissions" element={<Suspense fallback={<SuspenseFallback />}><Commissions /></Suspense>} />
          <Route path="/student-match" element={<Suspense fallback={<SuspenseFallback />}><StudentMatch /></Suspense>} />
          <Route path="/bank" element={<Suspense fallback={<SuspenseFallback />}><BankDashboard /></Suspense>} />
          <Route path="/agent-dashboard" element={<Suspense fallback={<SuspenseFallback />}><AgentDashboard /></Suspense>} />
          <Route path="/admin" element={<Suspense fallback={<SuspenseFallback />}><AdminPanel /></Suspense>} />
          <Route path="/reports" element={<Suspense fallback={<SuspenseFallback />}><Reports /></Suspense>} />
          <Route path="/profile" element={<Suspense fallback={<SuspenseFallback />}><Profile /></Suspense>} />
        </Route>
      </Route>
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default App;
