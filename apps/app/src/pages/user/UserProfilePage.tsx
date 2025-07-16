import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { authApi } from '../../services/authApi';

export const UserProfilePage: React.FC = () => {
  const { state, logout } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [stats, setStats] = useState({ publishedArticles: 0, drafts: 0 });
  const [passwords, setPasswords] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [deletePassword, setDeletePassword] = useState('');

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await authApi.getUserStats();
        setStats(response.data);
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    };

    if (state.isAuthenticated) {
      fetchStats();
    }
  }, [state.isAuthenticated]);

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswords(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePasswordReset = async (e: React.FormEvent) => {
    e.preventDefault();

    if (passwords.newPassword !== passwords.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    if (passwords.newPassword.length < 6) {
      toast.error('New password must be at least 6 characters');
      return;
    }

    setIsLoading(true);
    try {
      await authApi.resetPassword({
        currentPassword: passwords.currentPassword,
        newPassword: passwords.newPassword,
      });

      toast.success('Password changed successfully');
      setPasswords({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
    } catch (error) {
      toast.error('Error changing password');
      console.error('Password reset error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!state.isAuthenticated || !state.user) {
    return (
      <div className="container py-4">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="alert alert-warning">
              You must be logged in to view your profile.
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-4">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card border-0">
            <div className="card-header bg-transparent">
              <h2 className="h4 mb-0">My Profile</h2>
            </div>
            <div className="card-body">
              <div className="row mb-4">
                <div className="col-md-6">
                  <h5 className="text-muted mb-3">
                    Information about your account
                  </h5>
                  <div className="mb-3">
                    <label className="form-label fw-semibold">Name:</label>
                    <p className="form-control-plaintext">{state.user.name}</p>
                  </div>
                  <div className="mb-3">
                    <label className="form-label fw-semibold">Email:</label>
                    <p className="form-control-plaintext">{state.user.email}</p>
                  </div>
                  <div className="mb-3">
                    <label className="form-label fw-semibold">Role:</label>
                    <p className="form-control-plaintext">
                      <span
                        className={`badge ${state.user.role === 'admin' ? 'bg-danger' : 'bg-secondary'}`}>
                        {state.user.role === 'admin' ? 'Admin' : 'User'}
                      </span>
                    </p>
                  </div>
                </div>
                <div className="col-md-6">
                  <h5 className="text-muted mb-3">Statistics</h5>
                  <div className="mb-3">
                    <label className="form-label fw-semibold">Articles:</label>
                    <p className="form-control-plaintext">
                      {stats.publishedArticles} published
                    </p>
                  </div>
                  <div className="mb-3">
                    <label className="form-label fw-semibold">Drafts:</label>
                    <p className="form-control-plaintext">
                      {stats.drafts} drafts
                    </p>
                  </div>
                </div>
              </div>

              <hr />

              <div className="mt-4">
                <h5 className="text-muted mb-3">Password change</h5>
                <form onSubmit={handlePasswordReset}>
                  <div className="mb-3">
                    <label htmlFor="currentPassword" className="form-label">
                      Current password
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      id="currentPassword"
                      name="currentPassword"
                      value={passwords.currentPassword}
                      onChange={handlePasswordChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="newPassword" className="form-label">
                      New password
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      id="newPassword"
                      name="newPassword"
                      value={passwords.newPassword}
                      onChange={handlePasswordChange}
                      required
                      minLength={6}
                    />
                    <div className="form-text">
                      Password must be at least 6 characters
                    </div>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="confirmPassword" className="form-label">
                      Confirm new password
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      id="confirmPassword"
                      name="confirmPassword"
                      value={passwords.confirmPassword}
                      onChange={handlePasswordChange}
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" />
                        Changing password...
                      </>
                    ) : (
                      'Change password'
                    )}
                  </button>
                </form>
              </div>

              <hr />

              <div className="mt-4">
                <h5 className="text-danger mb-3">Delete account</h5>
                <form
                  onSubmit={async e => {
                    e.preventDefault();
                    if (
                      !window.confirm(
                        'Are you sure you want to delete your account? This action cannot be undone.'
                      )
                    )
                      return;
                    setIsDeleting(true);
                    try {
                      await authApi.deleteAccount({
                        currentPassword: deletePassword,
                      });
                      toast.success('Account deleted successfully');
                      logout();
                      navigate('/');
                    } catch (error) {
                      toast.error('Error deleting account');
                      console.error('Delete account error:', error);
                    } finally {
                      setIsDeleting(false);
                    }
                  }}>
                  <div className="mb-3">
                    <label htmlFor="deletePassword" className="form-label">
                      Confirm your password
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      id="deletePassword"
                      name="deletePassword"
                      value={deletePassword}
                      onChange={e => setDeletePassword(e.target.value)}
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="btn btn-danger"
                    disabled={isDeleting}>
                    {isDeleting ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" />
                        Deleting account...
                      </>
                    ) : (
                      'Delete account'
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
