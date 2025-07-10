import { AxiosError } from 'axios';
import api from './Api';
import type {ArticleDetailResponse}from '../types/ArticleType';

export const getArticleById = async (
  userId: number,
  articleId: number
): Promise<ArticleDetailResponse> => {
  try {
    const response = await api.get<ArticleDetailResponse>(`/public/users/${userId}/articles/${articleId}`);
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError;

    if (axiosError.response?.status === 404) {
      throw new Error('Article not found');
    }
    throw new Error(`Failed to fetch article`);
  }
};
