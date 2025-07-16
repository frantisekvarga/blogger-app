import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArticleList } from '../../components/article';
import { useArticles } from '../../context';
import { useDebounce } from '../../hooks';
import { Article } from '../../types';

export const AllArticlesPage: React.FC = () => {
  const { state, fetchAllArticlesForAdmin, deleteArticle } = useArticles();
  const { articles, loading, pagination } = state;
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 500); // 500ms debounce

  useEffect(() => {
    fetchAllArticlesForAdmin(1, debouncedSearchTerm);
  }, [fetchAllArticlesForAdmin, debouncedSearchTerm]);

  const handleEdit = (article: Article) => {
    navigate(`/edit-article/${article.id}`);
  };

  const handleDelete = async (article: Article) => {
    if (window.confirm('Are you sure you want to delete this article?')) {
      try {
        await deleteArticle(article.id);
      } catch (error) {
        console.error('Error deleting article:', error);
      }
    }
  };

  const handlePageChange = (page: number) => {
    setSearchTerm('');
    fetchAllArticlesForAdmin(page);
  };

  const handleSearch = () => {
    // Search sa spustí automaticky cez useEffect keď sa zmení debouncedSearchTerm
  };

  return (
    <div className="container py-4">
      <h1 className="display-6 fw-bold mb-4">
        All Articles
        {debouncedSearchTerm ? (
          <span className="fs-6 text-muted ms-2">
            (Searching: "{debouncedSearchTerm}")
          </span>
        ) : (
          <span className="fs-6 text-muted ms-2">
            (Page {pagination.currentPage} of {pagination.totalPages} -{' '}
            {pagination.totalItems} total)
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
        showEditDelete={true}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
};
