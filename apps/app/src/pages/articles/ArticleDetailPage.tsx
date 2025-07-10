import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { RelatedArticles } from '../../components/articles';
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
        <div className="fs-5 text-secondary">Loading article...</div>
      </div>
    );
  }

  if (!currentArticle) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: '16rem' }}>
        <div className="fs-5 text-secondary">Article not found</div>
      </div>
    );
  }

  return (
    <div className="container py-4">
      <div className="row justify-content-center">
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
            alt="Article image"
            className="img-fluid rounded mb-4 w-100"
            style={{ maxHeight: 400, objectFit: 'cover' }}
          />
          <article
            className="fs-5 lh-lg text-dark"
            style={{ whiteSpace: 'pre-line' }}>
            {currentArticle.content}
          </article>
        </div>
        <RelatedArticles articles={authorArticles} />
      </div>
    </div>
  );
};
