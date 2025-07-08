import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ROUTES } from '../../constants';
import { useAuth } from '../../context';

export const RegisterPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const { register, state: authState } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== passwordConfirmation) {
      console.error('Passwords do not match');
      return;
    }

    try {
      await register({
        email,
        name: username,
        password,
        confirmPassword: passwordConfirmation,
      });
      navigate(ROUTES.LOGIN);
    } catch (error) {
      console.error('Registration error:', error);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 py-5 px-3">
      <div className="w-100" style={{ maxWidth: 400 }}>
        <div className="bg-white p-4 shadow rounded">
          <div className="mb-4">
            <h2 className="text-center h3 mb-3 fw-bold text-dark">Sign Up</h2>
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
              <label htmlFor="username" className="form-label">
                Username *
              </label>
              <input
                id="username"
                name="username"
                type="text"
                autoComplete="username"
                required
                value={username}
                onChange={e => setUsername(e.target.value)}
                className="form-control"
                placeholder="Enter username"
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
                autoComplete="new-password"
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="form-control"
                placeholder="Enter password"
                disabled={authState.isLoading}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="passwordConfirmation" className="form-label">
                Confirm Password *
              </label>
              <input
                id="passwordConfirmation"
                name="passwordConfirmation"
                type="password"
                autoComplete="new-password"
                required
                value={passwordConfirmation}
                onChange={e => setPasswordConfirmation(e.target.value)}
                className="form-control"
                placeholder="Confirm password"
                disabled={authState.isLoading}
              />
            </div>

            {authState.error && (
              <div className="alert alert-danger py-2 px-3" role="alert">
                <span>{authState.error}</span>
              </div>
            )}

            <div className="text-xs text-secondary text-center mb-2">
              By clicking "Sign Up" you agree to our{' '}
              <Link
                to="/terms"
                className="link-primary text-decoration-underline">
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link
                to="/privacy"
                className="link-primary text-decoration-underline">
                Privacy Policy
              </Link>
              .
            </div>

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
                    Signing up...
                  </>
                ) : (
                  'SIGN UP'
                )}
              </button>
            </div>

            <div className="text-center">
              <span className="text-secondary">
                Already have an account?{' '}
                <Link
                  to={ROUTES.LOGIN}
                  className="link-primary text-decoration-none">
                  Sign in
                </Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
