import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArticleList } from '../../components/articles';
import { useArticles, useAuth } from '../../context';
import { Article } from '../../types';

export const MyArticlesPage: React.FC = () => {
  const {
    state: articleState,
    fetchArticlesByAuthor,
    deleteArticle,
  } = useArticles();
  const { state: authState } = useAuth();
  const { articles, loading } = articleState;
  const userId = authState.user?.id;
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (userId) {
      fetchArticlesByAuthor(userId);
    }
  }, [userId, fetchArticlesByAuthor]);

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

  const filteredArticles = articles.filter(article =>
    article.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading.articles) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-lg text-gray-600">Loading articles...</div>
      </div>
    );
  }

  return (
    <div className="container py-4">
      <h1 className="display-6 fw-bold mb-4">My Articles</h1>

      {/* Search Input */}
      <div className="mb-4 d-flex justify-content-center">
        <div className="input-group" style={{ maxWidth: 400 }}>
          <input
            type="text"
            className="form-control"
            placeholder="Search articles by title..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
          <button className="btn btn-outline-secondary" type="button">
            Search
          </button>
        </div>
      </div>

      <ArticleList
        articles={filteredArticles}
        loading={loading.articles}
        currentPage={1}
        totalPages={1}
        showEditDelete={true}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
};
