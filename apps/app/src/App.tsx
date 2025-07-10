import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import ArticleDetailPage from './pages/ArticleDetailPage';
import CreateArticlePage from './pages/CreateArticlePage';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route
            path="/user/:userId/article/:articleId"
            element={<ArticleDetailPage />}
             />
          <Route
            path="/create-article"
            element={<CreateArticlePage />} 
            />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
