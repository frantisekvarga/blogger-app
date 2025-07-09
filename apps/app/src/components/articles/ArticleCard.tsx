import React from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../constants';
import { useAuth } from '../../hooks/useAuth';
import { Article } from '../../types';

interface ArticleCardProps {
  article: Article;
  showActions?: boolean;
  onEdit?: (article: Article) => void;
  onDelete?: (article: Article) => void;
}

export const ArticleCard: React.FC<ArticleCardProps> = ({
  article,
  showActions = false,
  onEdit,
  onDelete,
}) => {
  const { state: authState } = useAuth();
  const currentUser = authState.user;

  const canEditOrDelete =
    currentUser &&
    (currentUser.id === article.user_id || currentUser.role === 'admin');

  return (
    <div className="card mb-3 border-0">
      <div className="row g-0 align-items-center">
        {/* Article Image */}
        <div className="col-auto">
          <img
            src={article.image_url || 'https://placehold.co/96x96?text=Obrazok'}
            alt="Obrázok článku"
            className="rounded m-3"
            style={{
              width: 96,
              height: 96,
              objectFit: 'cover',
              background: '#f8f9fa',
            }}
          />
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
                Read more
              </Link>
              <span className="text-muted">•</span>
              <a href="#" className="small link-primary text-decoration-none">
                comments
              </a>
              {showActions && canEditOrDelete && (
                <>
                  <button
                    className="btn btn-sm btn-outline-secondary ms-2"
                    onClick={() => onEdit && onEdit(article)}>
                    Edit
                  </button>
                  <button
                    className="btn btn-sm btn-outline-danger ms-2"
                    onClick={() => onDelete && onDelete(article)}>
                    Delete
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
