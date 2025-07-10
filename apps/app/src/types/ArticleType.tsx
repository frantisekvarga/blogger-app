export interface Article {
  id: number;
  title: string;
  content: string;
  perex: string;
  image_url: string;
  published_at: string;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
  user_id: number;
}

export interface RecentArticle {
  id: number;
  title: string;
  perex: string;
  publishedAt: string;
}

export interface ArticleDetailResponse {
  article: Article;
  userName: string;
  recentArticles: RecentArticle[];
}

