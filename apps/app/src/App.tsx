import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ArticleDetailPage from './pages/ArticleDetailPage';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/user/:userId/article/:articleId" element={<ArticleDetailPage />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
