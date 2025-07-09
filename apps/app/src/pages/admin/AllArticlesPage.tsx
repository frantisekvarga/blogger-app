import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArticleList } from '../../components/articles';
import { useArticles } from '../../context';
import { Article } from '../../types';

export const AllArticlesPage: React.FC = () => {
  const { state, fetchArticles, deleteArticle } = useArticles();
  const { articles, loading } = state;
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchArticles();
  }, [fetchArticles]);

  const handleEdit = (article: Article) => {
    navigate(`/edit-article/${article.id}`);
  };

  const handleDelete = async (article: Article) => {
    if (window.confirm('Naozaj chceš odstrániť tento článok?')) {
      try {
        await deleteArticle(article.id);
      } catch (error) {
        console.error('Chyba pri mazaní článku:', error);
      }
    }
  };

  
  const filteredArticles = articles.filter(article =>
    article.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container py-4">
      <h1 className="display-6 fw-bold mb-4">All Articles</h1>

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
        showActions={true}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
};
