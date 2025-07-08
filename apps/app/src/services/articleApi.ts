import { Article } from '../types';
import { apiService } from './api';

export interface ArticleResponse {
  articles: Article[];
  total: number;
  totalPages: number;
}

export interface AuthorArticlesResponse {
  articles: Article[];
  author: {
    id: number;
    name: string;
    email: string;
    role: string;
  } | null;
  total: number;
}

class ArticleApiService {
  async getFeaturedArticles(): Promise<Article[]> {
    return apiService.get<Article[]>('/public/articles/featured');
  }

  async getArticlesByAuthor(authorId: number): Promise<AuthorArticlesResponse> {
    const response = await apiService.get<any>(
      `/public/users/${authorId}/articles`
    );
    return response.data;
  }

  async getArticleById(articleId: number): Promise<Article> {
    return apiService.get<Article>(`/public/articles/${articleId}`);
  }

  async getAllArticles(
    page: number = 1,
    limit: number = 10
  ): Promise<ArticleResponse> {
    return apiService.get<ArticleResponse>(
      `/public/articles?page=${page}&limit=${limit}`
    );
  }
}

export const articleApi = new ArticleApiService();
