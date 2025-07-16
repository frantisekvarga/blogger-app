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

  async getArticlesByAuthor(
    authorId: number,
    search?: string
  ): Promise<AuthorArticlesResponse> {
    const searchParam = search ? `?search=${encodeURIComponent(search)}` : '';
    const response = await apiService.get<any>(
      `/articles/users/${authorId}/articles${searchParam}`
    );
    return response.data;
  }

  async getArticleById(articleId: number): Promise<Article> {
    return apiService.get<Article>(`/articles/${articleId}`);
  }

  async getAllArticles(
    page: number = 1,
    limit: number = 10,
    search?: string
  ): Promise<ArticleResponse> {
    const searchParam = search ? `&search=${encodeURIComponent(search)}` : '';
    return apiService.get<ArticleResponse>(
      `/articles/get-all?page=${page}&limit=${limit}${searchParam}`
    );
  }

  async getAllArticlesForAdmin(
    page: number = 1,
    limit: number = 10,
    search?: string
  ): Promise<ArticleResponse> {
    const searchParam = search ? `&search=${encodeURIComponent(search)}` : '';
    return apiService.get<ArticleResponse>(
      `/articles/get-all?page=${page}&limit=${limit}${searchParam}`
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

  async getDrafts(
    page: number = 1,
    limit: number = 10
  ): Promise<ArticleResponse> {
    return apiService.get<ArticleResponse>(
      `/articles/drafts?page=${page}&limit=${limit}`
    );
  }

  async publishArticle(
    articleId: number
  ): Promise<{ success: boolean; message: string }> {
    return apiService.patch<{ success: boolean; message: string }>(
      `/articles/${articleId}/publish`,
      {}
    );
  }
}

export const articleApi = new ArticleApiService();
