import React, {
  createContext,
  useCallback,
  useContext,
  useReducer,
} from 'react';
import { articleApi } from '../services/articleApi';
import { Article } from '../types';

interface ArticleState {
  articles: Article[];
  featuredArticles: Article[];
  currentArticle: Article | null;
  loading: {
    articles: boolean;
    featured: boolean;
    single: boolean;
    creating: boolean;
    updating: boolean;
    deleting: boolean;
  };
  error: string | null;
  filters: {
    authorId?: number;
    search?: string;
    featured?: boolean;
  };
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
  };
}

// Action types
type ArticleAction =
  | {
      type: 'SET_LOADING';
      payload: { key: keyof ArticleState['loading']; value: boolean };
    }
  | { type: 'SET_ARTICLES'; payload: Article[] }
  | { type: 'SET_FEATURED_ARTICLES'; payload: Article[] }
  | { type: 'SET_CURRENT_ARTICLE'; payload: Article | null }
  | { type: 'ADD_ARTICLE'; payload: Article }
  | { type: 'UPDATE_ARTICLE'; payload: Article }
  | { type: 'DELETE_ARTICLE'; payload: number }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SET_FILTERS'; payload: Partial<ArticleState['filters']> }
  | { type: 'SET_PAGINATION'; payload: Partial<ArticleState['pagination']> }
  | { type: 'CLEAR_ERROR' };

// Context interface
interface ArticleContextType {
  state: ArticleState;
  // Articles operations
  fetchArticles: (page?: number) => Promise<void>;
  fetchFeaturedArticles: () => Promise<void>;
  fetchArticleById: (id: number) => Promise<void>;
  fetchArticlesByAuthor: (authorId: number) => Promise<void>;
  createArticle: (article: Omit<Article, 'id'>) => Promise<void>;
  updateArticle: (id: number, article: Partial<Article>) => Promise<void>;
  deleteArticle: (id: number) => Promise<void>;
  // Filters and search
  setFilters: (filters: Partial<ArticleState['filters']>) => void;
  searchArticles: (query: string) => Promise<void>;
  // Utility
  clearError: () => void;
  clearCurrentArticle: () => void;
}

// Initial state
const initialState: ArticleState = {
  articles: [],
  featuredArticles: [],
  currentArticle: null,
  loading: {
    articles: false,
    featured: false,
    single: false,
    creating: false,
    updating: false,
    deleting: false,
  },
  error: null,
  filters: {},
  pagination: {
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    itemsPerPage: 10,
  },
};

// Reducer
const articleReducer = (
  state: ArticleState,
  action: ArticleAction
): ArticleState => {
  switch (action.type) {
    case 'SET_LOADING':
      return {
        ...state,
        loading: {
          ...state.loading,
          [action.payload.key]: action.payload.value,
        },
      };
    case 'SET_ARTICLES':
      return {
        ...state,
        articles: action.payload,
        loading: { ...state.loading, articles: false },
        error: null,
      };
    case 'SET_FEATURED_ARTICLES':
      return {
        ...state,
        featuredArticles: action.payload,
        loading: { ...state.loading, featured: false },
        error: null,
      };
    case 'SET_CURRENT_ARTICLE':
      return {
        ...state,
        currentArticle: action.payload,
        loading: { ...state.loading, single: false },
        error: null,
      };
    case 'ADD_ARTICLE':
      return {
        ...state,
        articles: [action.payload, ...state.articles],
        loading: { ...state.loading, creating: false },
        error: null,
      };
    case 'UPDATE_ARTICLE':
      return {
        ...state,
        articles: state.articles.map(article =>
          article.id === action.payload.id ? action.payload : article
        ),
        currentArticle:
          state.currentArticle?.id === action.payload.id
            ? action.payload
            : state.currentArticle,
        loading: { ...state.loading, updating: false },
        error: null,
      };
    case 'DELETE_ARTICLE':
      return {
        ...state,
        articles: state.articles.filter(
          article => article.id !== action.payload
        ),
        featuredArticles: state.featuredArticles.filter(
          article => article.id !== action.payload
        ),
        currentArticle:
          state.currentArticle?.id === action.payload
            ? null
            : state.currentArticle,
        loading: { ...state.loading, deleting: false },
        error: null,
      };
    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload,
        loading: {
          articles: false,
          featured: false,
          single: false,
          creating: false,
          updating: false,
          deleting: false,
        },
      };
    case 'SET_FILTERS':
      return {
        ...state,
        filters: { ...state.filters, ...action.payload },
      };
    case 'SET_PAGINATION':
      return {
        ...state,
        pagination: { ...state.pagination, ...action.payload },
      };
    case 'CLEAR_ERROR':
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

// Create context
const ArticleContext = createContext<ArticleContextType | undefined>(undefined);

// Provider component
export const ArticleProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(articleReducer, initialState);

  const fetchArticles = useCallback(
    async (page: number = 1) => {
      dispatch({
        type: 'SET_LOADING',
        payload: { key: 'articles', value: true },
      });

      try {
        const response = await articleApi.getAllArticles(
          page,
          state.pagination.itemsPerPage
        );

        dispatch({ type: 'SET_ARTICLES', payload: response.articles });
        dispatch({
          type: 'SET_PAGINATION',
          payload: {
            currentPage: page,
            totalPages: response.totalPages,
            totalItems: response.total,
          },
        });
      } catch (error) {
        dispatch({
          type: 'SET_ERROR',
          payload:
            error instanceof Error
              ? error.message
              : 'Chyba pri načítavaní článkov',
        });
      }
    },
    [state.pagination.itemsPerPage]
  );

  const fetchFeaturedArticles = useCallback(async () => {
    dispatch({
      type: 'SET_LOADING',
      payload: { key: 'featured', value: true },
    });

    try {
      const featured = await articleApi.getFeaturedArticles();
      dispatch({ type: 'SET_FEATURED_ARTICLES', payload: featured });
    } catch (error) {
      dispatch({
        type: 'SET_ERROR',
        payload:
          error instanceof Error
            ? error.message
            : 'Chyba pri načítavaní odporúčaných článkov',
      });
    }
  }, []);

  const fetchArticleById = useCallback(async (id: number) => {
    dispatch({ type: 'SET_LOADING', payload: { key: 'single', value: true } });

    try {
      const article = await articleApi.getArticleById(id);
      dispatch({ type: 'SET_CURRENT_ARTICLE', payload: article });
    } catch (error) {
      dispatch({
        type: 'SET_ERROR',
        payload:
          error instanceof Error
            ? error.message
            : 'Chyba pri načítavaní článku',
      });
    }
  }, []);

  const fetchArticlesByAuthor = useCallback(async (authorId: number) => {
    dispatch({
      type: 'SET_LOADING',
      payload: { key: 'articles', value: true },
    });

    try {
      const response = await articleApi.getArticlesByAuthor(authorId);
      dispatch({ type: 'SET_ARTICLES', payload: response.articles });
    } catch (error) {
      dispatch({
        type: 'SET_ERROR',
        payload:
          error instanceof Error
            ? error.message
            : 'Chyba pri načítavaní článkov autora',
      });
    }
  }, []);

  const createArticle = useCallback(
    async (articleData: Omit<Article, 'id'>) => {
      dispatch({
        type: 'SET_LOADING',
        payload: { key: 'creating', value: true },
      });

      try {
        // TODO: Implement when backend supports it
        throw new Error('Creating articles is not supported yet');
      } catch (error) {
        dispatch({
          type: 'SET_ERROR',
          payload:
            error instanceof Error ? error.message : 'Error creating article',
        });
        throw error;
      }
    },
    []
  );

  const updateArticle = useCallback(
    async (id: number, updates: Partial<Article>) => {
      dispatch({
        type: 'SET_LOADING',
        payload: { key: 'updating', value: true },
      });
      try {
        const updated = await articleApi.updateArticle(id, updates);
        dispatch({ type: 'UPDATE_ARTICLE', payload: updated });
      } catch (error) {
        dispatch({
          type: 'SET_ERROR',
          payload:
            error instanceof Error ? error.message : 'Error updating article',
        });
        throw error;
      }
    },
    []
  );

  const deleteArticle = useCallback(async (id: number) => {
    dispatch({
      type: 'SET_LOADING',
      payload: { key: 'deleting', value: true },
    });

    try {
      await articleApi.deleteArticle(id);
      dispatch({ type: 'DELETE_ARTICLE', payload: id });
    } catch (error) {
      dispatch({
        type: 'SET_ERROR',
        payload:
          error instanceof Error ? error.message : 'Chyba pri mazaní článku',
      });
      throw error;
    }
  }, []);

  const setFilters = useCallback(
    (filters: Partial<ArticleState['filters']>) => {
      dispatch({ type: 'SET_FILTERS', payload: filters });
    },
    []
  );

  const searchArticles = useCallback(async (query: string) => {
    dispatch({
      type: 'SET_LOADING',
      payload: { key: 'articles', value: true },
    });

    try {
      // TODO: Implement search when backend supports it
      throw new Error('Searching is not supported yet');
    } catch (error) {
      dispatch({
        type: 'SET_ERROR',
        payload:
          error instanceof Error ? error.message : 'Error searching articles',
      });
    }
  }, []);

  const clearError = useCallback(() => {
    dispatch({ type: 'CLEAR_ERROR' });
  }, []);

  const clearCurrentArticle = useCallback(() => {
    dispatch({ type: 'SET_CURRENT_ARTICLE', payload: null });
  }, []);

  return (
    <ArticleContext.Provider
      value={{
        state,
        fetchArticles,
        fetchFeaturedArticles,
        fetchArticleById,
        fetchArticlesByAuthor,
        createArticle,
        updateArticle,
        deleteArticle,
        setFilters,
        searchArticles,
        clearError,
        clearCurrentArticle,
      }}>
      {children}
    </ArticleContext.Provider>
  );
};

// Custom hook
export const useArticles = (): ArticleContextType => {
  const context = useContext(ArticleContext);
  if (!context) {
    throw new Error('useArticles must be used within an ArticleProvider');
  }
  return context;
};
