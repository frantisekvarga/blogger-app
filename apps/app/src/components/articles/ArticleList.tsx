import React from 'react';
import { Article } from '../../types';
import { Pagination } from '../common/Pagination';
import { ArticleCard } from './ArticleCard';

interface ArticleListProps {
  articles: Article[];
  loading?: boolean;
  currentPage?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
  showEditDelete?: boolean;
  onEdit?: (article: Article) => void;
  onDelete?: (article: Article) => void;
}

export const ArticleList: React.FC<ArticleListProps> = ({
  articles,
  loading = false,
  currentPage = 1,
  totalPages = 1,
  onPageChange,
  showEditDelete = false,
  onEdit,
  onDelete,
}) => {
  if (loading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: '16rem' }}>
        <div className="fs-5 text-secondary">Loading articles...</div>
      </div>
    );
  }

  if (articles.length === 0) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: '16rem' }}>
        <div className="fs-5 text-secondary">No articles found.</div>
      </div>
    );
  }

  return (
    <div>
      <div className="d-flex flex-column gap-4">
        {articles.map(article => (
          <ArticleCard
            key={article.id}
            article={article}
            showEditDelete={showEditDelete}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>

      {totalPages > 1 && onPageChange && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
      )}
    </div>
  );
};
