import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { Layout } from './app/Layout';
import { ProtectedRoute } from './components/common/ProtectedRoute';
import { ROUTES } from './constants';
import { AllArticlesPage } from './pages/admin/AllArticlesPage';
import { ArticleDetailPage } from './pages/articles/ArticleDetailPage';
import { AuthorArticlesPage } from './pages/articles/AuthorArticlesPage';
import CreateArticlePage from './pages/articles/CreateArticlePage';
import { DraftsPage } from './pages/articles/DraftsPage';
import { EditArticlePage } from './pages/articles/EditArticlePage';
import { MyArticlesPage } from './pages/articles/MyArticlesPage';
import { RecentPage } from './pages/articles/RecentPage';
import { LoginPage, RegisterPage } from './pages/auth';
import { ForgotPasswordPage } from './pages/auth/ForgotPasswordPage';
import { ResetPasswordPage } from './pages/auth/ResetPasswordPage';
import { AboutPage } from './pages/common/About';
import { HomePage } from './pages/common/HomePage';
import { UserProfilePage } from './pages/user/UserProfilePage';

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
          <Route path={ROUTES.RECENT_ARTICLES} element={<RecentPage />} />
          <Route path={ROUTES.ABOUT} element={<AboutPage />} />
          <Route path={ROUTES.LOGIN} element={<LoginPage />} />
          <Route path={ROUTES.SIGNUP} element={<RegisterPage />} />
          <Route path={ROUTES.FORGOT_PASSWORD} element={<ForgotPasswordPage />} />
          <Route path={ROUTES.RESET_PASSWORD} element={<ResetPasswordPage />} />
          <Route
            path={ROUTES.MY_ARTICLES}
            element={
              <ProtectedRoute>
                <MyArticlesPage />
              </ProtectedRoute>
            }
          />
          <Route
            path={ROUTES.EDIT_ARTICLE}
            element={
              <ProtectedRoute>
                <EditArticlePage />
              </ProtectedRoute>
            }
          />
          <Route
            path={ROUTES.ALL_ARTICLES}
            element={
              <ProtectedRoute adminOnly>
                <AllArticlesPage />
              </ProtectedRoute>
            }
          />
          <Route
            path={ROUTES.CREATE_ARTICLE}
            element={
              <ProtectedRoute>
                <CreateArticlePage />
              </ProtectedRoute>
            }
          />
          <Route
            path={ROUTES.DRAFTS}
            element={
              <ProtectedRoute>
                <DraftsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path={ROUTES.USER_PROFILE}
            element={
              <ProtectedRoute>
                <UserProfilePage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
