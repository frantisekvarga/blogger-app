import React, { createContext, useContext, useEffect, useReducer } from 'react';
import { apiService } from '../services/api';
import { AuthState, LoginCredentials, RegisterData, User } from '../types';

// Action types
type AuthAction =
  | { type: 'AUTH_START' }
  | { type: 'AUTH_SUCCESS'; payload: User }
  | { type: 'AUTH_ERROR'; payload: string }
  | { type: 'LOGOUT' }
  | { type: 'CLEAR_ERROR' };

// Context interface
interface AuthContextType {
  state: AuthState;
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
  clearError: () => void;
}

// Initial state
const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

// Reducer
const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'AUTH_START':
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case 'AUTH_SUCCESS':
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      };
    case 'AUTH_ERROR':
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: action.payload,
      };
    case 'LOGOUT':
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
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
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Check for existing token on mount and fetch user
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      fetchUser(token);
    }
  }, []);

  // Helper: fetch user from /auth/me
  const fetchUser = async (token: string) => {
    try {
      const data = await apiService.get<{
        success: boolean;
        data: { user: User };
      }>('/auth/me', {
        headers: { Authorization: `Bearer ${token}` },
      });
      localStorage.setItem('userData', JSON.stringify(data.data.user));
      dispatch({ type: 'AUTH_SUCCESS', payload: data.data.user });
    } catch (error) {
      logout();
    }
  };

  const login = async (credentials: LoginCredentials) => {
    dispatch({ type: 'AUTH_START' });
    try {
      const data = await apiService.post<{
        success: boolean;
        data: { user: User; token: string };
      }>('/auth/login', credentials);
      localStorage.setItem('authToken', data.data.token);
      localStorage.setItem('userData', JSON.stringify(data.data.user));
      dispatch({ type: 'AUTH_SUCCESS', payload: data.data.user });
    } catch (error: any) {
      dispatch({
        type: 'AUTH_ERROR',
        payload: error.message || 'Chyba pri prihlasovaní',
      });
      throw error;
    }
  };

  const register = async (data: RegisterData) => {
    dispatch({ type: 'AUTH_START' });
    try {
      const resp = await apiService.post<{
        success: boolean;
        data: { user: User; token: string };
      }>('/auth/register', data);
      localStorage.setItem('authToken', resp.data.token);
      localStorage.setItem('userData', JSON.stringify(resp.data.user));
      dispatch({ type: 'AUTH_SUCCESS', payload: resp.data.user });
    } catch (error: any) {
      dispatch({
        type: 'AUTH_ERROR',
        payload: error.message || 'Chyba pri registrácii',
      });
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
    dispatch({ type: 'LOGOUT' });
  };

  const clearError = () => {
    dispatch({ type: 'CLEAR_ERROR' });
  };

  return (
    <AuthContext.Provider
      value={{
        state,
        login,
        register,
        logout,
        clearError,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
