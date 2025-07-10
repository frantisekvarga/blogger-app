import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useArticles } from '../../context';

export const EditArticlePage: React.FC = () => {
  const { articleId } = useParams<{ articleId: string }>();
  const { state, fetchArticleById, updateArticle } = useArticles();
  const { currentArticle, loading } = state;
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (articleId) {
      fetchArticleById(Number(articleId));
    }
  }, [articleId, fetchArticleById]);

  useEffect(() => {
    if (currentArticle) {
      setTitle(currentArticle.title || '');
      setContent(currentArticle.content || '');
    }
  }, [currentArticle]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await updateArticle(Number(articleId), { title, content });
      navigate(-1);
    } catch (err) {
      alert('Error saving changes');
    } finally {
      setSaving(false);
    }
  };

  if (loading.single || !currentArticle) {
    return <div className="fs-5 text-secondary">Loading article...</div>;
  }

  return (
    <div className="container py-4">
      <h1 className="display-6 fw-bold mb-4">Edit Article</h1>
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="mb-3">
          <label className="form-label">Title</label>
          <input
            className="form-control"
            value={title}
            onChange={e => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Content</label>
          <textarea
            className="form-control"
            value={content}
            onChange={e => setContent(e.target.value)}
            rows={8}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary" disabled={saving}>
          {saving ? 'Saving' : 'Save changes'}
        </button>
      </form>
    </div>
  );
};
