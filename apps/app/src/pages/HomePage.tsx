import React, { useEffect } from 'react'
import { ArticleList } from '../components/articles'
import { useArticles } from '../context'

export const HomePage: React.FC = () => {
  const { state, fetchFeaturedArticles } = useArticles();
  const { featuredArticles, loading } = state;

  useEffect(() => {
    fetchFeaturedArticles();
  }, [fetchFeaturedArticles]);

  return (
    <div>
      {/* Page Header */}
      <h1>
        Featured Articles
      </h1>
      

      {/* Articles List using ArticleList component */}
      <ArticleList
        articles={featuredArticles}
        loading={loading.featured}
        currentPage={1}
        totalPages={1}
      />
    </div>
  );
};
