import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useArticles } from '../../context';
import { articleApi } from '../../services/articleApi';

export const ArticleDetailPage: React.FC = () => {
  const { articleId } = useParams<{ articleId: string }>();
  const { state, fetchArticleById, clearCurrentArticle } = useArticles();
  const { currentArticle, loading } = state;
  const [authorArticles, setAuthorArticles] = useState<any[]>([]);

  useEffect(() => {
    if (articleId) {
      fetchArticleById(parseInt(articleId));
    }
    return () => {
      clearCurrentArticle();
    };
  }, [articleId, fetchArticleById, clearCurrentArticle]);

  useEffect(() => {
    const fetchRelated = async () => {
      if (currentArticle?.user_id) {
        const res = await articleApi.getArticlesByAuthor(
          currentArticle.user_id
        );
        // Filter out the current article
        setAuthorArticles(res.articles.filter(a => a.id !== currentArticle.id));
      } else {
        setAuthorArticles([]);
      }
    };
    fetchRelated();
  }, [currentArticle]);

  if (loading.single) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: '16rem' }}>
        <div className="fs-5 text-secondary">Načítavam článok...</div>
      </div>
    );
  }

  if (!currentArticle) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: '16rem' }}>
        <div className="fs-5 text-secondary">Článok nebol nájdený</div>
      </div>
    );
  }

  return (
    <div className="container py-4">
      <div className="row justify-content-center">
        {/* Main article content */}
        <div className="col-lg-8 col-12 mb-4">
          <h1 className="display-5 fw-bold mb-2 text-dark">
            {currentArticle.title}
          </h1>
          <div className="mb-3 text-muted small">
            <span>
              {new Date(currentArticle.published_at).toLocaleDateString(
                'sk-SK'
              )}
            </span>
          </div>

          <img
            src={
              currentArticle.image_url ||
              'https://placehold.co/800x400?text=Obrazok'
            }
            alt="Obrázok článku"
            className="img-fluid rounded mb-4 w-100"
            style={{ maxHeight: 400, objectFit: 'cover' }}
          />
          <article
            className="fs-5 lh-lg text-dark"
            style={{ whiteSpace: 'pre-line' }}>
            {currentArticle.content}
          </article>
        </div>
        {/* Sidebar - Related articles */}
        <aside className="col-lg-4 col-12">
          <div className="bg-light border rounded p-3">
            <h5 className="fw-bold mb-3">Related articles</h5>
            {authorArticles.length === 0 && (
              <div className="text-secondary small">
                No other articles from the author.
              </div>
            )}
            {authorArticles.map(a => (
              <Link
                key={a.id}
                to={`/article/${a.id}`}
                className="d-flex align-items-center mb-3 text-decoration-none">
                <img
                  src={a.image_url || 'https://placehold.co/64x64?text=Obrazok'}
                  alt="Obrázok článku"
                  className="rounded me-2"
                  style={{
                    width: 64,
                    height: 64,
                    objectFit: 'cover',
                    background: '#f8f9fa',
                  }}
                />
                <div>
                  <div className="fw-semibold text-dark">{a.title}</div>
                  <div
                    className="small text-secondary"
                    style={{
                      maxWidth: 180,
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}>
                    {a.content}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
};
