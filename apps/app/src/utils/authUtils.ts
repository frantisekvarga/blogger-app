import { User } from '../types';

export const decodeToken = (token: string): User | null => {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    const payload = JSON.parse(jsonPayload);

    return {
      id: payload.userId,
      name: payload.name,
      email: payload.email,
      role: payload.role,
      createdAt: payload.createdAt || new Date().toISOString(),
    };
  } catch (error) {
    console.error('Error decoding token:', error);
    return null;
  }
};

export const decodeTokenWithExp = (
  token: string
): (User & { exp?: number }) | null => {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    const payload = JSON.parse(jsonPayload);

    return {
      id: payload.userId,
      name: payload.name,
      email: payload.email,
      role: payload.role,
      createdAt: payload.createdAt || new Date().toISOString(),
      exp: payload.exp,
    };
  } catch (error) {
    console.error('Error decoding token:', error);
    return null;
  }
};

export const isTokenValid = (token: string): boolean => {
  try {
    const payload = decodeTokenWithExp(token);
    if (!payload) return false;

    if (payload.exp) {
      const currentTime = Math.floor(Date.now() / 1000);
      return payload.exp > currentTime;
    }

    return true;
  } catch (error) {
    return false;
  }
};

export const getStoredToken = (): string | null => {
  return localStorage.getItem('authToken');
};

export const storeToken = (token: string): void => {
  localStorage.setItem('authToken', token);
};

export const removeStoredToken = (): void => {
  localStorage.removeItem('authToken');
};

export const isAdmin = (user: User | null): boolean => {
  return user?.role === 'admin';
};

export const isAuthenticated = (user: User | null): boolean => {
  return user !== null;
};
