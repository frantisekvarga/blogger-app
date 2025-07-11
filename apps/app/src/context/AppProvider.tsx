import React from 'react';
import { ArticleProvider } from './ArticleContext';
import { AuthProvider } from './AuthContext';

interface AppProviderProps {
  children: React.ReactNode;
}


export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  return (
    <AuthProvider>
      <ArticleProvider>{children}</ArticleProvider>
    </AuthProvider>
  );
};
