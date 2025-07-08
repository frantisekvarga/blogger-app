import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { Layout } from './app/Layout';
import { ROUTES } from './constants';
import { HomePage } from './pages/HomePage';
import { ArticleDetailPage } from './pages/articles/ArticleDetailPage';
import { AuthorArticlesPage } from './pages/articles/AuthorArticlesPage';
import { LoginPage, RegisterPage } from './pages/auth';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path={ROUTES.HOME} element={<HomePage />} />
          <Route
            path={ROUTES.AUTHOR_ARTICLES}
            element={<AuthorArticlesPage />}
          />
          <Route path={ROUTES.ARTICLE_DETAIL} element={<ArticleDetailPage />} />
          <Route
            path={ROUTES.RECENT_ARTICLES}
            element={<div>Recent Articles Page - Coming Soon</div>}
          />
          <Route
            path={ROUTES.ABOUT}
            element={<div>About Page - Coming Soon</div>}
          />
          <Route path={ROUTES.LOGIN} element={<LoginPage />} />
          <Route path={ROUTES.SIGNUP} element={<RegisterPage />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
