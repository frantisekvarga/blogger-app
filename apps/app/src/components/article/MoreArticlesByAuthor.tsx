import React from 'react';
import { useNavigate } from 'react-router-dom';

import type { RecentArticle } from '../../types/ArticleType';

interface MoreArticlesByAuthorProps {
  articles: RecentArticle[];
  userId: number;
  authorName: string;
}

export const MoreArticlesByAuthor: React.FC<MoreArticlesByAuthorProps> = ({
  articles,
  userId,
  authorName,
}) => {
  const navigate = useNavigate();
  const handleClick = (articleId: number) => {
    navigate(`/user/${userId}/article/${articleId}`);
  };

  return (
    <div className="mt-4">
      <h5 className="fw-semibold mb-3">More articles by {authorName}</h5>
      {articles.length === 0 ? (
        <p className="text-muted pb-3 fst-italic small mb-0">
          This user has not published any other articles.
        </p>
      ) : (
        <ul className="list-unstyled">
          {articles.map(article => (
            <li key={article.id} className="mb-3">
              <div
                onClick={() => handleClick(article.id)}
                role="button"
                tabIndex={0}
                onKeyDown={e => {
                  if (e.key === 'Enter' || e.key === ' ')
                    handleClick(article.id);
                }}
                className="p-3 border rounded bg-light text-decoration-none text-dark article-hover"
                style={{ cursor: 'pointer' }}>
                <h6 className="mb-1 fw-bold">{article.title}</h6>
                <p className="mb-0 text-muted small">
                  {new Date(article.publishedAt).toLocaleDateString()}
                </p>
                <p className="mb-0 text-muted small">{article.perex}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
