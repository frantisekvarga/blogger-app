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
    return apiService.get<Article[]>('/articles/featured');
  }

  async getArticlesByAuthor(authorId: number): Promise<AuthorArticlesResponse> {
    const response = await apiService.get<any>(
      `/articles/users/${authorId}/articles`
    );
    return response.data;
  }

  async getArticleById(articleId: number): Promise<Article> {
    return apiService.get<Article>(`/articles/${articleId}`);
  }

  async getAllArticles(
    page: number = 1,
    limit: number = 10
  ): Promise<ArticleResponse> {
    return apiService.get<ArticleResponse>(
      `/articles/get-all?page=${page}&limit=${limit}`
    );
  }

  async getAllArticlesForAdmin(
    page: number = 1,
    limit: number = 100
  ): Promise<ArticleResponse> {
    return apiService.get<ArticleResponse>(
      `/articles/get-all?page=${page}&limit=${limit}`
    );
  }

  async updateArticle(
    articleId: number,
    updates: Partial<Article>
  ): Promise<Article> {
    return apiService.patch<Article>(`/articles/${articleId}`, updates);
  }

  async deleteArticle(
    articleId: number
  ): Promise<{ success: boolean; message: string }> {
    return apiService.delete<{ success: boolean; message: string }>(
      `/articles/${articleId}`
    );
  }
}

export const articleApi = new ArticleApiService();
