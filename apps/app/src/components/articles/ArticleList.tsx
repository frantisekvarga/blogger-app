import React from 'react';
import { Article } from '../../types';
import { ArticleCard } from './ArticleCard';

interface ArticleListProps {
  articles: Article[];
  loading?: boolean;
  currentPage?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
}

export const ArticleList: React.FC<ArticleListProps> = ({
  articles,
  loading = false,
  currentPage = 1,
  totalPages = 1,
  onPageChange,
}) => {
  if (loading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: '16rem' }}>
        <div className="fs-5 text-secondary">Načítavam články...</div>
      </div>
    );
  }

  if (articles.length === 0) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: '16rem' }}>
        <div className="fs-5 text-secondary">Žiadne články neboli nájdené.</div>
      </div>
    );
  }

  return (
    <div>
      {/* Articles List */}
      <div className="d-flex flex-column gap-4">
        {articles.map(article => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="d-flex justify-content-center mt-4">
          <div className="d-flex gap-2 align-items-center">
            <span
              className={`small ${currentPage === 1 ? 'text-secondary' : 'text-primary cursor-pointer'}`}
              style={{ cursor: currentPage === 1 ? 'default' : 'pointer' }}
              onClick={() =>
                currentPage > 1 && onPageChange && onPageChange(currentPage - 1)
              }>
              «
            </span>
            <span
              className="bg-light text-dark rounded-circle d-flex align-items-center justify-content-center"
              style={{ width: 28, height: 28, fontSize: 13 }}>
              {currentPage}
            </span>
            <span
              className={`small ${currentPage === totalPages ? 'text-secondary' : 'text-primary cursor-pointer'}`}
              style={{
                cursor: currentPage === totalPages ? 'default' : 'pointer',
              }}
              onClick={() =>
                currentPage < totalPages &&
                onPageChange &&
                onPageChange(currentPage + 1)
              }>
              »
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
