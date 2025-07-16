import React, { useEffect, useState } from 'react';
import { ArticleList } from '../../components/article';
import { useArticles } from '../../context';
import { useDebounce } from '../../hooks';

export const RecentPage: React.FC = () => {
  const { state, fetchArticles } = useArticles();
  const { articles, loading, pagination } = state;
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 500); // 500ms debounce

  useEffect(() => {
    fetchArticles(currentPage, debouncedSearchTerm);
  }, [currentPage, fetchArticles, debouncedSearchTerm]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleSearch = () => {
    // Search sa spustí automaticky cez useEffect keď sa zmení debouncedSearchTerm
  };

  return (
    <div className="container py-4">
      <h1 className="display-6 fw-bold mb-4">
        Recent Articles
        {debouncedSearchTerm && (
          <span className="fs-6 text-muted ms-2">
            (Searching: "{debouncedSearchTerm}")
          </span>
        )}
      </h1>

      <div className="mb-4 d-flex justify-content-center">
        <div className="input-group" style={{ maxWidth: 400 }}>
          <input
            type="text"
            className="form-control"
            placeholder="Search articles by title..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            onKeyPress={e => e.key === 'Enter' && handleSearch()}
          />
          <button
            className="btn btn-outline-secondary"
            type="button"
            onClick={handleSearch}>
            Search
          </button>
        </div>
      </div>

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
