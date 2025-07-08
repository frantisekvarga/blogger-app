import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useArticles } from '../../context';

// Mock related articles 
const relatedArticles = [
  {
    id: 2,
    title: 'Lorem ipsum2',
    excerpt:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse nisl.',
  },
  {
    id: 4,
    title: 'Lorem ipsum4',
    excerpt:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse nisl.',
  },
  {
    id: 8,
    title: 'Lorem ipsum8',
    excerpt:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse nisl.',
  },
  {
    id: 10,
    title: 'Lorem ipsum10',
    excerpt:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse nisl.',
  },
];

export const ArticleDetailPage: React.FC = () => {
  const { articleId } = useParams<{ articleId: string }>();
  const { state, fetchArticleById, clearCurrentArticle } = useArticles();
  const { currentArticle, loading } = state;

  useEffect(() => {
    if (articleId) {
      fetchArticleById(parseInt(articleId));
    }
    return () => {
      clearCurrentArticle();
    };
  }, [articleId, fetchArticleById, clearCurrentArticle]);

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
            {currentArticle.author?.name && (
              <span>autor: {currentArticle.author.name} • </span>
            )}
            <span>
              {new Date(currentArticle.published_at).toLocaleDateString(
                'sk-SK'
              )}
            </span>
          </div>
          
          <img
            src="https://placehold.co/800x400?text=Obrazok"
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
            {relatedArticles.map(a => (
              <div key={a.id} className="mb-3">
                <div className="fw-semibold">{a.title}</div>
                <div className="small text-secondary">{a.excerpt}</div>
              </div>
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
};
