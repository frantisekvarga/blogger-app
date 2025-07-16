import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import EditArticleForm from '../../components/article/EditArticleForm';
import { useArticles } from '../../context';

export const EditArticlePage: React.FC = () => {
  const { articleId } = useParams<{ articleId: string }>();
  const { state, fetchArticleById } = useArticles();
  const { currentArticle, loading } = state;
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (articleId) {
      fetchArticleById(Number(articleId));
    }
  }, [articleId, fetchArticleById]);

  if (loading.single) {
    return (
      <div className="container py-4">
        <div className="fs-5 text-secondary">Loading article...</div>
      </div>
    );
  }

  if (error || !currentArticle) {
    return (
      <div className="container py-4">
        <div className="alert alert-danger">
          Error loading article: {error || 'Article not found'}
        </div>
      </div>
    );
  }

  return (
    <div className="container py-4">
      <h1 className="display-6 fw-bold mb-4">Edit Article</h1>
      <EditArticleForm article={currentArticle} />
    </div>
  );
};
