import { AxiosError } from 'axios';
import api from './api'; 
import Article from '../types/ArticleType';

export const getArticleById = async (
  userId: number,
  articleId: number
): Promise<Article> => {
  try {
    const response = await api.get<Article>(
      `/public/users/${userId}/articles/${articleId}`
    );
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    throw new Error(
      `Failed to fetch article: ${axiosError.response?.status || 'No status'} - ${axiosError.message}`
    );
  }
};
