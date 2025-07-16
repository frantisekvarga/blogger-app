import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../constants';
import { useAuth } from '../../hooks/useAuth';
import { articleApi } from '../../services/articleApi';
import { Article } from '../../types';

export const DraftsPage: React.FC = () => {
  const navigate = useNavigate();
  const { state } = useAuth();
  const [currentPage, setCurrentPage] = useState(1);
  const [draftsData, setDraftsData] = useState<{
    articles: Article[];
    total: number;
    totalPages: number;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isPublishing, setIsPublishing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchDrafts = async () => {
    if (!state.isAuthenticated) return;

    setIsLoading(true);
    setError(null);
    try {
      const data = await articleApi.getDrafts(currentPage);
      setDraftsData(data);
    } catch (err) {
      setError('Error loading drafts');
      console.error('Drafts error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDrafts();
  }, [currentPage, state.isAuthenticated]);

  const handlePublish = async (article: Article) => {
    if (window.confirm('Are you sure you want to publish this article?')) {
      setIsPublishing(true);
      try {
        await articleApi.publishArticle(article.id);
        toast.success('Article published successfully');
        fetchDrafts();
      } catch (err) {
        toast.error('Error publishing article');
        console.error('Publish error:', err);
      } finally {
        setIsPublishing(false);
      }
    }
  };

  const handleDelete = async (article: Article) => {
    if (window.confirm('Are you sure you want to delete this article?')) {
      setIsDeleting(true);
      try {
        await articleApi.deleteArticle(article.id);
        toast.success('Article deleted successfully');
        fetchDrafts();
      } catch (err) {
        toast.error('Error deleting article');
        console.error('Delete error:', err);
      } finally {
        setIsDeleting(false);
      }
    }
  };

  const handleEdit = (article: Article) => {
    navigate(ROUTES.EDIT_ARTICLE.replace(':articleId', article.id.toString()));
  };

  if (!state.isAuthenticated) {
    return (
      <div className="container mt-4">
        <div className="alert alert-warning">
          You must be logged in to view your drafts.
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-4">
        <div className="alert alert-danger">
          Error loading drafts: {error}
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-12">
          {isLoading ? (
            <div className="text-center py-5">
              <div className="fs-5 text-secondary">Loading drafts...</div>
            </div>
          ) : draftsData?.articles && draftsData.articles.length > 0 ? (
            <div className="d-flex flex-column gap-4">
              {draftsData.articles.map(article => (
                <div key={article.id} className="card border-0 shadow-sm">
                  <div className="row g-0 align-items-center">
                    <div className="col-auto">
                      <img
                        src={
                          article.image_url ||
                          'https://placehold.co/96x96?text=Obrazok'
                        }
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
                    <div className="col">
                      <div className="card-body py-3 px-2">
                        <h2 className="card-title h5 mb-2 text-dark">
                          {article.title}
                        </h2>
                        <p className="card-subtitle mb-2 text-muted small">
                          Created:{' '}
                          {new Date(
                            article.created_at || article.published_at
                          ).toLocaleDateString('sk-SK')}
                          {article.updated_at &&
                            article.updated_at !== article.created_at && (
                              <>
                                {' • '}
                                <span className="text-muted">
                                  edited{' '}
                                  {new Date(
                                    article.updated_at
                                  ).toLocaleDateString('sk-SK')}
                                </span>
                              </>
                            )}
                        </p>
                        <p
                          className="card-text mb-3 text-secondary"
                          style={{
                            display: '-webkit-box',
                            WebkitLineClamp: 3,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                          }}>
                          {article.perex || article.content}
                        </p>
                        <div className="d-flex gap-2 align-items-center">
                          <button
                            className="btn btn-sm btn-outline-primary"
                            onClick={() => handleEdit(article)}>
                            Edit
                          </button>
                          <button
                            className="btn btn-sm btn-success"
                            onClick={() => handlePublish(article)}
                            disabled={isPublishing}>
                            {isPublishing ? 'Publishing...' : 'Publish'}
                          </button>
                          <button
                            className="btn btn-sm btn-outline-danger"
                            onClick={() => handleDelete(article)}
                            disabled={isDeleting}>
                            {isDeleting ? 'Deleting...' : 'Delete'}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-5">
              <h3 className="text-muted">No drafts</h3>
              <p className="text-muted">
                You don't have any drafts yet.
              </p>
              <button
                className="btn btn-primary"
                onClick={() => navigate(ROUTES.CREATE_ARTICLE)}>
                Create article
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
