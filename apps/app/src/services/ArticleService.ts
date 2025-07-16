import type { ArticleDetailResponse } from '../types/ArticleType';
import { apiService } from './api';

export const getArticleById = async (
  userId: number,
  articleId: number
): Promise<ArticleDetailResponse> => {
  try {
    const response = await apiService.get<ArticleDetailResponse>(
      `/articles/public/users/${userId}/articles/${articleId}`
    );
    return response;
  } catch (error) {
    if (error instanceof Error && error.message.includes('404')) {
      throw new Error('Article not found');
    }
    throw new Error(`Failed to fetch article`);
  }
};

export const createArticle = async (
  userId: number,
  articleData: {
    title: string;
    perex: string;
    imageUrl: string;
    content: string;
    isPublished: boolean;
  }
): Promise<ArticleDetailResponse> => {
  try {
    const response = await apiService.post<ArticleDetailResponse>(
      `/articles/users/${userId}/articles`,
      articleData
    );
    return response;
  } catch (error) {
    throw new Error('Failed to create article');
  }
};
