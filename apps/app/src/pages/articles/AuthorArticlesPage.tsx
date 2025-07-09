import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ArticleList } from '../../components/articles';
import { useArticles } from '../../context';

export const AuthorArticlesPage: React.FC = () => {
  const { authorId } = useParams<{ authorId: string }>();
  const { state, fetchArticlesByAuthor } = useArticles();
  const { articles, loading } = state;

  useEffect(() => {
    if (authorId) {
      fetchArticlesByAuthor(parseInt(authorId));
    }
  }, [authorId, fetchArticlesByAuthor]);

  if (loading.articles) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-lg text-gray-600">Načítavam články autora...</div>
      </div>
    );
  }

  if (!Array.isArray(articles) || articles.length === 0) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: '16rem' }}>
        <div className="fs-5 text-secondary">
          Author not found or has no articles
        </div>
      </div>
    );
  }

  if (state.error) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: '16rem' }}>
        <div className="fs-5 text-danger">{state.error}</div>
      </div>
    );
  }

  const authorIdNum = articles[0]?.user_id || authorId || 'Neznámy autor';

  return (
    <div className="container py-4">
      {/* Author Header */}
      <h1 className="h4 mb-4 text-dark">Autor ID: {authorIdNum} blog</h1>

      {/* Articles List using ArticleList component */}
      <ArticleList
        articles={articles}
        loading={loading.articles}
        currentPage={1}
        totalPages={1}
      />
    </div>
  );
};
