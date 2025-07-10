import React from 'react';
import type { RecentArticle } from '../../types/ArticleType';

interface RecentArticlesProps {
  articles: RecentArticle[];
}

export const RecentArticles: React.FC<RecentArticlesProps> = ({ articles }) => {
  return (
    <>
      <h5 className="fw-semibold">Related articles</h5>
      <ul className="list-unstyled">
        {articles.map((article) => (
          <li className="mb-3" key={article.id}>
            <h6 className="mb-1 fw-bold">{article.title}</h6>
            <p className="mb-0 text-muted small">
              {new Date(article.publishedAt).toLocaleDateString()}
            </p>
            <p className="mb-0 text-muted small">{article.perex}</p>

          </li>
        ))}
      </ul>
    </>
  );
};
