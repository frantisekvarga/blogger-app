import React from 'react';

export const LoadingIndicator: React.FC = () => {
  return (
    <div
      className="d-flex justify-content-center align-items-center w-100 h-100" role="status">
      <div
        className="spinner-border text-secondary"
        style={{ width: '3rem', height: '3rem' }}>
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
};
