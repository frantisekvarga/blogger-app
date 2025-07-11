import React, { useEffect } from 'react';
import { ArticleList } from '../../components/articles';
import { useArticles } from '../../context';

export const HomePage: React.FC = () => {
  const { state, fetchFeaturedArticles } = useArticles();
  const { featuredArticles, loading } = state;

  useEffect(() => {
    fetchFeaturedArticles();
  }, [fetchFeaturedArticles]);

  return (
    <div className="container py-4">
      <h1 className="display-6 fw-bold mb-4">Featured Articles</h1>
      <ArticleList
        articles={featuredArticles}
        loading={loading.featured}
        currentPage={1}
        totalPages={1}
      />
    </div>
  );
};
