import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  if (totalPages <= 1) {
    return null;
  }

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const isPreviousDisabled = currentPage === 1;
  const isNextDisabled = currentPage === totalPages;

  return (
    <div className="d-flex justify-content-center mt-4">
      <div className="d-flex gap-2 align-items-center">
        <span
          className={`small ${isPreviousDisabled ? 'text-secondary' : 'text-primary cursor-pointer'}`}
          style={{ cursor: isPreviousDisabled ? 'default' : 'pointer' }}
          onClick={handlePreviousPage}>
          «
        </span>
        <span
          className="bg-light text-dark rounded-circle d-flex align-items-center justify-content-center"
          style={{ width: 28, height: 28, fontSize: 13 }}>
          {currentPage}
        </span>
        <span
          className={`small ${isNextDisabled ? 'text-secondary' : 'text-primary cursor-pointer'}`}
          style={{ cursor: isNextDisabled ? 'default' : 'pointer' }}
          onClick={handleNextPage}>
          »
        </span>
      </div>
    </div>
  );
};
