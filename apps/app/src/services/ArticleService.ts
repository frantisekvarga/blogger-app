import { AxiosError } from 'axios';
import api from './Api';
import Article from '../types/ArticleType';

export const getArticleById = async (
  userId: number,
  articleId: number
): Promise<Article> => {
  try {
    const response = await api.get<Article>(`/public/users/${userId}/articles/${articleId}`);
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError;

    if (axiosError.response?.status === 404) {
      throw new Error('Article not found');
    }
    throw new Error(`Failed to fetch article`);
  }
};
