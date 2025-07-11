import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

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

       <ToastContainer 
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </QueryClientProvider>
  );
}

export default App;
