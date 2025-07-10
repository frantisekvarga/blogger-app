import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getArticleById } from '../services/ArticleService';
import { ArticleImage } from '../components/article/ArticleImage';
import Header from '../components/Header';
import ReactMarkdown from 'react-markdown';
import { MoreArticlesByAuthor } from '../components/article/MoreArticlesByAuthor';
import ArticleNotFound from '../components/article/ArticleNotFound';
import type { ArticleDetailResponse } from '../types/ArticleType';



export const ArticleDetailPage = () => {
  const { userId, articleId } = useParams<{ userId: string; articleId: string }>();

  const { data, isLoading, isError, error } = useQuery<ArticleDetailResponse>({
    queryKey: ['article', userId, articleId],
    queryFn: () => getArticleById(Number(userId), Number(articleId)),
    enabled: !!userId && !!articleId,
    staleTime: 15 * 60 * 1000,
    retry: 0
  });

  const article = data?.article;
  const userName = data?.userName;
  const recentArticles = data?.recentArticles ?? [];


  if (isError) {
    return <ArticleNotFound />;
  }
  if( !article){
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
            <MoreArticlesByAuthor articles={recentArticles} userId={article.user_id} authorName={userName || 'author'}/>
          </div>
        </div>
      </main>
    </>
  );
};

export default ArticleDetailPage;
