import React from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../constants';
import { Article } from '../../types';

interface ArticleCardProps {
  article: Article;
  showEditDelete?: boolean;
  onEdit?: (article: Article) => void;
  onDelete?: (article: Article) => void;
}

interface ArticleImageProps {
  imageUrl?: string;
}

const ArticleImage: React.FC<ArticleImageProps> = ({ imageUrl }) => (
  <div className="col-auto">
    <img
      src={imageUrl || 'https://placehold.co/96x96?text=Obrazok'}
      alt="Article image"
      className="rounded m-3"
      style={{
        width: 96,
        height: 96,
        objectFit: 'cover',
        background: '#f8f9fa',
      }}
    />
  </div>
);

interface ArticleHeaderProps {
  title: string;
  author?: { id: number; name: string };
  publishedAt: string;
}

const ArticleHeader: React.FC<ArticleHeaderProps> = ({
  title,
  author,
  publishedAt,
}) => (
  <>
    <h2 className="card-title h5 mb-2 text-dark">{title}</h2>
    <p className="card-subtitle mb-2 text-muted small">
      {author && (
        <>
          <Link
            to={ROUTES.AUTHOR_ARTICLES.replace(
              ':authorId',
              author.id.toString()
            )}
            className="link-primary text-decoration-none">
            {author.name}
          </Link>
          {' • '}
        </>
      )}
      {new Date(publishedAt).toLocaleDateString('sk-SK')}
    </p>
  </>
);

interface ArticleContentProps {
  content: string;
}

const ArticleContent: React.FC<ArticleContentProps> = ({ content }) => (
  <p
    className="card-text mb-3 text-secondary"
    style={{
      display: '-webkit-box',
      WebkitLineClamp: 3,
      WebkitBoxOrient: 'vertical',
      overflow: 'hidden',
    }}>
    {content}
  </p>
);

interface ArticleActionsProps {
  articleId: number;
  showEditDelete: boolean;
  onEdit?: (article: Article) => void;
  onDelete?: (article: Article) => void;
  article: Article;
}

const ArticleActions: React.FC<ArticleActionsProps> = ({
  articleId,
  showEditDelete,
  onEdit,
  onDelete,
  article,
}) => (
  <div className="d-flex gap-2 align-items-center">
    <Link
      to={ROUTES.ARTICLE_DETAIL.replace(':articleId', articleId.toString())}
      className="small link-primary text-decoration-none">
      Read more
    </Link>
    <span className="text-muted">•</span>
    <a href="#" className="small link-primary text-decoration-none">
      comments
    </a>
    {showEditDelete && (
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
);

export const ArticleCard: React.FC<ArticleCardProps> = ({
  article,
  showEditDelete = false,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="card mb-3 border-0">
      <div className="row g-0 align-items-center">
        <ArticleImage imageUrl={article.image_url} />
        <div className="col">
          <div className="card-body py-3 px-2">
            <ArticleHeader
              title={article.title}
              author={article.author}
              publishedAt={article.published_at}
            />
            <ArticleContent content={article.content} />
            <ArticleActions
              articleId={article.id}
              showEditDelete={showEditDelete}
              onEdit={onEdit}
              onDelete={onDelete}
              article={article}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
