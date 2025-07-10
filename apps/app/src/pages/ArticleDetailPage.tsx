import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getArticleById } from '../services/ArticleService';
import { ArticleImage } from '../components/article/ArticleImage';
import Header from '../components/Header';
import LoadingSpinner from '../components/shared/LoadingSpinner';
import ReactMarkdown from 'react-markdown';
import { RecentArticles } from '../components/article/RecentArticles';
import ArticleNotFound from '../components/article/ArticleNotFound';
import type { ArticleDetailResponse } from '../types/ArticleType';




export const ArticleDetailPage = () => {
  const { userId, articleId } = useParams<{ userId: string; articleId: string }>();
  const [contentReady, setContentReady] = useState(false);

  const { data, isLoading, isError, error } = useQuery<ArticleDetailResponse>({
    queryKey: ['article', userId, articleId],
    queryFn: () => getArticleById(Number(userId), Number(articleId)),
    enabled: !!userId && !!articleId,
    staleTime: 5 * 60 * 1000,
    gcTime: 1000 * 60 * 60 * 24,
    refetchOnWindowFocus: false,
  });

  const article = data?.article;
  const userName = data?.userName;
  const recentArticles = data?.recentArticles ?? [];

  useEffect(() => {
    if (!article?.image_url) return setContentReady(true);

    const img = new Image();
    img.src = article.image_url;
    img.onload = () => setContentReady(true);
    img.onerror = () => setContentReady(true);
    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [article]);

  if ((isLoading || !contentReady) && !isError) {
    return (
      <>
        <Header />
        <LoadingSpinner />
      </>
    );
  }

  if (isError || !article) {
    if ((error as Error).message === 'Article not found') {
      return <ArticleNotFound />;
    }
    return null;
  }

  return (
    <>
      <Header />
      <main className="container my-5 pt-3">
        <div className="row">
          <div className="col-12 col-xl-8">
            <h1 className="fw-bold mb-2">{article.title}</h1>
            <p className="text-muted small">
              {userName} • {new Date(article.published_at ?? '').toLocaleDateString()}
            </p>
            <div className="text-center my-4">
              <ArticleImage
                src={article.image_url || ''}
                alt={article.title}
                className="img-fluid rounded d-block"
              />
            </div>
            <div className="markdown-content">
              <ReactMarkdown>{article.content}</ReactMarkdown>
            </div>
          </div>

          <div className="col-12 col-xl-4 mt-5 mt-xl-0 responsive-border-left">
            <RecentArticles articles={recentArticles} />
          </div>
        </div>
      </main>
    </>
  );
};

export default ArticleDetailPage;
