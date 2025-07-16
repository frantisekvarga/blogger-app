import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../constants';
import { authApi } from '../../services/authApi';

export const ForgotPasswordPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await authApi.forgotPassword({ email });
      setEmailSent(true);
      toast.success('Reset link has been sent to your email');
    } catch (error) {
      toast.error('Error sending reset email');
      console.error('Forgot password error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (emailSent) {
    return (
      <div
        className="d-flex justify-content-center py-5 px-3"
        style={{ minHeight: '100vh', paddingTop: '10vh' }}>
        <div className="w-100" style={{ maxWidth: 400 }}>
          <div className="bg-white p-4 shadow rounded text-center">
            <div className="mb-4">
              <i
                className="fas fa-envelope text-success"
                style={{ fontSize: '3rem' }}></i>
            </div>
            <h2 className="h4 mb-3 fw-bold text-dark">Check Your Email</h2>
            <p className="text-muted mb-4">
              We've sent a password reset link to <strong>{email}</strong>
            </p>
            <p className="text-muted small mb-4">
              Click the link in the email to reset your password. The link will
              expire in 1 hour.
            </p>
            <div className="d-grid gap-2">
              <Link to={ROUTES.LOGIN} className="btn btn-primary">
                Back to Login
              </Link>
              <button
                onClick={() => setEmailSent(false)}
                className="btn btn-outline-secondary">
                Try another email
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="d-flex justify-content-center py-5 px-3"
      style={{ minHeight: '100vh', paddingTop: '10vh' }}>
      <div className="w-100" style={{ maxWidth: 400 }}>
        <div className="bg-white p-4 shadow rounded">
          <div className="mb-4">
            <h2 className="text-center h3 mb-3 fw-bold text-dark">
              Reset Password
            </h2>
            <p className="text-center text-muted">
              Enter your email address and we'll send you a link to reset your
              password.
            </p>
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
                placeholder="Enter your email"
                disabled={isLoading}
              />
            </div>

            <div className="d-grid mb-3">
              <button
                type="submit"
                disabled={isLoading}
                className="btn btn-primary fw-semibold text-uppercase py-2">
                {isLoading ? (
                  <>
                    <span
                      className="spinner-border spinner-border-sm me-2"
                      role="status"
                      aria-hidden="true"></span>
                    Sending...
                  </>
                ) : (
                  'Send Reset Link'
                )}
              </button>
            </div>

            <div className="text-center">
              <span className="text-secondary">
                Remember your password?{' '}
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
