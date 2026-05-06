import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../../api/authService';

interface LoginFormData {
  username: string;
  password: string;
}

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<LoginFormData>({ username: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (error) setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.username || !formData.password) {
      setError('Username and password are required');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Attempt real SSO login
      const response = await authService.login({
        username: formData.username,
        password: formData.password,
      });

      // Store user info from SSO response
      localStorage.setItem('eepip_user', JSON.stringify(response.user));

      navigate('/dashboard');
    } catch (err) {
      console.warn('SSO service unavailable, using mock login:', err);
      // Fallback to mock SSO if service is down
      await new Promise(resolve => setTimeout(resolve, 500));

      const mockUser = {
        id: 1,
        username: formData.username,
        fullName: formData.username === 'admin' ? 'Admin User' : 'John Smith',
        email: `${formData.username}@temcobank.com`,
        roles: formData.username === 'admin' ? ['ADMIN'] : ['AI_ENGINEER'],
      };

      localStorage.setItem('sso_token', 'mock_jwt_token_' + Date.now());
      localStorage.setItem('eepip_user', JSON.stringify(mockUser));

      navigate('/dashboard');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-500 via-primary-600 to-accent-500 px-4">
      <div className="w-full max-w-md">
        {/* Logo / Branding */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold text-white tracking-tight">EEPIP</h1>
          <p className="mt-2 text-primary-100 text-sm font-medium">
            Education Easy-Pay Investment Plan
          </p>
          <p className="mt-1 text-primary-200 text-xs">
            Powered by TEMCO Bank &amp; Java Institute Holdings
          </p>
        </div>

        {/* Login Card */}
        <div className="card shadow-2xl">
          <h2 className="text-xl font-bold text-gray-800 mb-1">Sign In</h2>
          <p className="text-sm text-gray-500 mb-6">
            Access your AI Engineer dashboard
          </p>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg flex items-start gap-2">
              <svg className="w-5 h-5 shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1.5">
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                autoComplete="username"
                className="input-field"
                placeholder="Enter your username"
                value={formData.username}
                onChange={handleChange}
                disabled={loading}
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1.5">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                className="input-field"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                disabled={loading}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full flex items-center justify-center gap-2"
            >
              {loading && (
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
              )}
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <div className="mt-6 pt-5 border-t border-gray-100 text-center">
            <p className="text-xs text-gray-400">
              SSO Authentication via TEMCO Bank
            </p>
            <p className="text-xs text-gray-300 mt-1">
              Demo: Use any username/password to login
            </p>
            <div className="mt-4">
              <button
                type="button"
                onClick={() => navigate('/register')}
                className="text-sm text-primary-600 hover:text-primary-700 font-medium"
              >
                New Enrollment? Register here
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-primary-200 text-xs mt-6">
          &copy; 2026 EEPIP v3.2 &mdash; TEMCO Bank &amp; Java Institute Holdings
        </p>
      </div>
    </div>
  );
}
