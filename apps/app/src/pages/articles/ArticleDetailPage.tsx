import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { useParams } from 'react-router-dom';

import { ArticleImage } from '../../components/article/ArticleImage';
import ArticleNotFound from '../../components/article/ArticleNotFound';
import { MoreArticlesByAuthor } from '../../components/article/MoreArticlesByAuthor';

import { getArticleById } from '../../services/ArticleService';
import type { ArticleDetailResponse } from '../../types/ArticleType';

export const ArticleDetailPage = () => {
  const { userId, articleId } = useParams<{
    userId: string;
    articleId: string;
  }>();

  const [data, setData] = useState<ArticleDetailResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArticle = async () => {
      if (!userId || !articleId) return;

      setIsLoading(true);
      setError(null);

      try {
        const response = await getArticleById(
          Number(userId),
          Number(articleId)
        );
        setData(response);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : 'Error loading article'
        );
        console.error('Error fetching article:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchArticle();
  }, [userId, articleId]);

  if (isLoading) {
    return (
      <div className="container my-5 pt-3">
        <div className="text-center">
          <div className="fs-5 text-secondary">Loading article...</div>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return <ArticleNotFound />;
  }

  const { article, userName, recentArticles } = data;

  return (
    <>
      <main className="container my-5 pt-3">
        <div className="row">
          <div className="col-12 col-xl-8">
            <h1 className="fw-bold mb-2">{article.title}</h1>
            <p className="text-muted small">
              {userName} •{' '}
              {new Date(article.published_at ?? '').toLocaleDateString()}
            </p>
            <p className="lead text-muted">{article.perex}</p>
            <div className="text-center my-4">
              <ArticleImage
                src={article.image_url || ''}
                alt={article.title}
                className="img-fluid rounded d-block"
                uniqueKey={article.id}
              />
            </div>
            <div className="markdown-content">
              <ReactMarkdown>{article.content}</ReactMarkdown>
            </div>
          </div>

          <div className="col-12 col-xl-4 mt-5 mt-xl-0 responsive-border-left">
            <MoreArticlesByAuthor
              articles={recentArticles}
              userId={article.user_id}
              authorName={userName || 'author'}
            />
          </div>
        </div>
      </main>
    </>
  );
};

export default ArticleDetailPage;
