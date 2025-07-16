import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { ROUTES } from '../../constants';
import { authApi } from '../../services/authApi';

export const ResetPasswordPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [passwords, setPasswords] = useState({
    newPassword: '',
    confirmPassword: '',
  });

  const token = searchParams.get('token');

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswords(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (passwords.newPassword !== passwords.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    if (passwords.newPassword.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }

    if (!token) {
      toast.error('Invalid reset link');
      return;
    }

    setIsLoading(true);
    try {
      await authApi.resetPasswordWithToken({
        token,
        newPassword: passwords.newPassword,
      });

      toast.success('Password reset successfully');
      navigate(ROUTES.LOGIN);
    } catch (error) {
      toast.error('Error resetting password');
      console.error('Reset password error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!token) {
    return (
      <div
        className="d-flex justify-content-center py-5 px-3"
        style={{ minHeight: '100vh', paddingTop: '10vh' }}>
        <div className="w-100" style={{ maxWidth: 400 }}>
          <div className="bg-white p-4 shadow rounded text-center">
            <div className="mb-4">
              <i
                className="fas fa-exclamation-triangle text-warning"
                style={{ fontSize: '3rem' }}></i>
            </div>
            <h2 className="h4 mb-3 fw-bold text-dark">Invalid Reset Link</h2>
            <p className="text-muted mb-4">
              The password reset link is invalid or has expired.
            </p>
            <Link to={ROUTES.FORGOT_PASSWORD} className="btn btn-primary">
              Request New Reset Link
            </Link>
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
              Set New Password
            </h2>
            <p className="text-center text-muted">
              Enter your new password below.
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="newPassword" className="form-label">
                New Password *
              </label>
              <input
                id="newPassword"
                name="newPassword"
                type="password"
                autoComplete="new-password"
                required
                value={passwords.newPassword}
                onChange={handlePasswordChange}
                className="form-control"
                placeholder="Enter new password"
                disabled={isLoading}
                minLength={6}
              />
              <div className="form-text">
                Password must be at least 6 characters
              </div>
            </div>

            <div className="mb-3">
              <label htmlFor="confirmPassword" className="form-label">
                Confirm New Password *
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                autoComplete="new-password"
                required
                value={passwords.confirmPassword}
                onChange={handlePasswordChange}
                className="form-control"
                placeholder="Confirm new password"
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
                    Resetting...
                  </>
                ) : (
                  'Reset Password'
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
