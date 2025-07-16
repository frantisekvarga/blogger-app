import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ArticleList } from '../../components/article';
import { useArticles } from '../../context';

export const AuthorArticlesPage: React.FC = () => {
  const { authorId } = useParams<{ authorId: string }>();

  try {
    const { state, fetchArticlesByAuthor } = useArticles();

    if (!state) {
      return (
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ minHeight: '16rem' }}>
          <div className="fs-5 text-danger">Error loading context</div>
        </div>
      );
    }

    const { articles, loading } = state;

    useEffect(() => {
      if (authorId) {
        fetchArticlesByAuthor(parseInt(authorId));
      }
    }, [authorId, fetchArticlesByAuthor]);

    if (loading.articles) {
      return (
        <div className="flex justify-center items-center h-64">
          <div className="text-lg text-gray-600">Loading articles...</div>
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

    if (!Array.isArray(articles) || articles.length === 0) {
      return (
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ minHeight: '16rem' }}>
          <div className="fs-5 text-secondary">
            This author has no published articles
          </div>
        </div>
      );
    }

    const authorName = articles[0]?.author?.name || `Autor ID: ${authorId}`;

    return (
      <div className="container py-4">
        <h1 className="h4 mb-4 text-dark">{authorName} - articles</h1>

        <ArticleList
          articles={articles}
          loading={loading.articles}
          currentPage={1}
          totalPages={1}
        />
      </div>
    );
  } catch (error) {
    console.error('Error in AuthorArticlesPage:', error);
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: '16rem' }}>
        <div className="fs-5 text-danger">
          Error loading articles:{' '}
          {error instanceof Error ? error.message : 'Unknown error'}
        </div>
      </div>
    );
  }
};
