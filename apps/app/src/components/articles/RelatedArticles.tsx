import React from 'react';
import { Link } from 'react-router-dom';
import { Article } from '../../types';

interface RelatedArticlesProps {
  articles: Article[];
}

export const RelatedArticles: React.FC<RelatedArticlesProps> = ({
  articles,
}) => {
  return (
    <aside className="col-lg-4 col-12">
      <div className="bg-light border rounded p-3">
        <h5 className="fw-bold mb-3">Related articles</h5>
        {articles.length === 0 && (
          <div className="text-secondary small">
            No other articles from the author.
          </div>
        )}
        {articles.map(article => (
          <Link
            key={article.id}
            to={`/article/${article.id}`}
            className="d-flex align-items-center mb-3 text-decoration-none">
            <img
              src={
                article.image_url || 'https://placehold.co/64x64?text=Obrazok'
              }
              alt="Article image"
              className="rounded me-2"
              style={{
                width: 64,
                height: 64,
                objectFit: 'cover',
                background: '#f8f9fa',
              }}
            />
            <div>
              <div className="fw-semibold text-dark">{article.title}</div>
              <div
                className="small text-secondary"
                style={{
                  maxWidth: 180,
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}>
                {article.content}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </aside>
  );
};
