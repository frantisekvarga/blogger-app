import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getArticleById } from '../services/ArticleService';
import { ArticleImage } from '../components/article/ArticleImage';
import Header from '../components/Header';
import LoadingSpinner from '../components/shared/LoadingSpinner';
import ReactMarkdown from 'react-markdown';
import { RelatedArticles } from '../components/article/RelatedArticles';
import ArticleNotFound from '../components/article/ArticleNotFound';

export const ArticleDetailPage = () => {
  const { userId, articleId } = useParams<{ userId: string; articleId: string }>();
  const [contentReady, setContentReady] = useState(false);
  const { data: article, isLoading, isError, error } = useQuery({
    queryKey: ['article', userId, articleId],
    queryFn: () => getArticleById(Number(userId), Number(articleId)),
    enabled: !!userId && !!articleId,
    retry: 1
  });

  useEffect(() => {
    if (!article) {
      return;
    }
    const img = new Image();
    img.src = article.image_url || '';
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
    return;
  }


  return (
    <>
      <Header />
      <main className="container  my-5 pt-3">
        <div className="row">
          <div className="col-12 col-xl-8">
            <h1 className="fw-bold mb-2">{article.title}</h1>
            <p className="text-muted small">{`user${userId} • ${new Date(article.published_at ?? '').toLocaleDateString()}`}</p>
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
            <RelatedArticles relatedIds={[2, 4, 8, 10, 12]} />
          </div>
        </div>
      </main>
    </>
  );
};

export default ArticleDetailPage;
