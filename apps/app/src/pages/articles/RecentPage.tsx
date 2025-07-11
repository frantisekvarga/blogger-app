import React, { useEffect, useState } from 'react';
import { ArticleList } from '../../components/articles';
import { useArticles } from '../../context';

export const RecentPage: React.FC = () => {
  const { state, fetchArticles } = useArticles();
  const { articles, loading, pagination } = state;
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchArticles(currentPage);
  }, [currentPage, fetchArticles]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="container py-4">
      <h1 className="display-6 fw-bold mb-4">Recent Articles</h1>

      <ArticleList
        articles={articles}
        loading={loading.articles}
        currentPage={pagination.currentPage}
        totalPages={pagination.totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};
