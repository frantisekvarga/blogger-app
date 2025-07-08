import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ROUTES } from '../../constants';
import { useAuth } from '../../context';

export const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, state: authState } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login({ email, password });
      navigate(ROUTES.HOME);
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 py-5 px-3">
      <div className="w-100" style={{ maxWidth: 400 }}>
        <div className="bg-white p-4 shadow rounded">
          <div className="mb-4">
            <h2 className="text-center h3 mb-3 fw-bold text-dark">Sign In</h2>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email *
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="form-control"
                placeholder="Enter email"
                disabled={authState.isLoading}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password *
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="form-control"
                placeholder="Enter password"
                disabled={authState.isLoading}
              />
            </div>

            {authState.error && (
              <div className="alert alert-danger py-2 px-3" role="alert">
                <span>{authState.error}</span>
              </div>
            )}

            <div className="d-grid mb-3">
              <button
                type="submit"
                disabled={authState.isLoading}
                className="btn btn-primary fw-semibold text-uppercase py-2">
                {authState.isLoading ? (
                  <>
                    <span
                      className="spinner-border spinner-border-sm me-2"
                      role="status"
                      aria-hidden="true"></span>
                    Signing in...
                  </>
                ) : (
                  'SIGN IN'
                )}
              </button>
            </div>

            <div className="d-flex justify-content-between align-items-center mb-2">
              <div className="text-sm">
                <Link
                  to={ROUTES.FORGOT_PASSWORD || '#'}
                  className="link-primary text-decoration-none">
                  Forgot your password?
                </Link>
              </div>
            </div>

            <div className="text-center">
              <span className="text-secondary">
                Don't have an account?{' '}
                <Link
                  to={ROUTES.SIGNUP}
                  className="link-primary text-decoration-none">
                  Sign up
                </Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
