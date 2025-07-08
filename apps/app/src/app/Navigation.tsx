import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../assets/logo.png';
import { ROUTES } from '../constants';
import { useAuth } from '../context';

export const Navigation: React.FC = () => {
  const location = useLocation();
  const { state, logout } = useAuth();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="navbar navbar-expand-md navbar-light bg-light border-bottom shadow-sm px-3 px-md-5 py-3">
      <div className="container-fluid">
        <Link
          className="navbar-brand d-flex align-items-center"
          to={ROUTES.HOME}>
          <img
            src={logo}
            alt="Blogger Logo"
            style={{ height: '32px', width: 'auto' }}
          />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-md-0">
            <li className="nav-item">
              <Link
                className={`nav-link fw-medium pb-1 ${isActive(ROUTES.HOME) ? 'active border-bottom border-primary' : ''}`}
                aria-current={isActive(ROUTES.HOME) ? 'page' : undefined}
                to={ROUTES.HOME}>
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link fw-medium pb-1 ${isActive(ROUTES.RECENT_ARTICLES) ? 'active border-bottom border-primary' : ''}`}
                aria-current={
                  isActive(ROUTES.RECENT_ARTICLES) ? 'page' : undefined
                }
                to={ROUTES.RECENT_ARTICLES}>
                Recent Articles
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link fw-medium pb-1 ${isActive(ROUTES.ABOUT) ? 'active border-bottom border-primary' : ''}`}
                aria-current={isActive(ROUTES.ABOUT) ? 'page' : undefined}
                to={ROUTES.ABOUT}>
                About
              </Link>
            </li>
          </ul>
          <div className="d-flex align-items-center gap-2">
            {state.isAuthenticated && state.user ? (
              <>
                <span className="fw-semibold text-primary me-2">
                  {state.user.name}
                </span>
                <button
                  className="btn btn-outline-secondary btn-sm"
                  onClick={logout}>
                  Logout
                </button>
              </>
            ) : (
              <Link
                to={ROUTES.LOGIN}
                className="btn btn-outline-primary btn-sm fw-semibold">
                Log in »
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
