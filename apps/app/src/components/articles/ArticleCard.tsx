import React from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../constants';
import { Article } from '../../types';

interface ArticleCardProps {
  article: Article;
}

export const ArticleCard: React.FC<ArticleCardProps> = ({ article }) => {
  return (
    <div className="card mb-3 border-0">
      <div className="row g-0 align-items-center">
        {/* Article Image */}
        <div className="col-auto">
          <div
            className="bg-light d-flex align-items-center justify-content-center rounded m-3"
            style={{ width: 96, height: 96 }}>
            
          </div>
        </div>
        {/* Article Content */}
        <div className="col">
          <div className="card-body py-3 px-2">
            <h2 className="card-title h5 mb-2 text-dark">{article.title}</h2>
            <p className="card-subtitle mb-2 text-muted small">
              {article.author && (
                <>
                  <Link
                    to={ROUTES.AUTHOR_ARTICLES.replace(
                      ':authorId',
                      article.author.id.toString()
                    )}
                    className="link-primary text-decoration-none">
                    {article.author.name}
                  </Link>
                  {' • '}
                </>
              )}
              {new Date(article.published_at).toLocaleDateString('sk-SK')}
            </p>
            <p
              className="card-text mb-3 text-secondary"
              style={{
                display: '-webkit-box',
                WebkitLineClamp: 3,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
              }}>
              {article.content}
            </p>
            <div className="d-flex gap-2 align-items-center">
              <Link
                to={ROUTES.ARTICLE_DETAIL.replace(
                  ':articleId',
                  article.id.toString()
                )}
                className="small link-primary text-decoration-none">
                Prečítať celý článok
              </Link>
              <span className="text-muted">•</span>
              <a href="#" className="small link-primary text-decoration-none">
                komentáre
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
