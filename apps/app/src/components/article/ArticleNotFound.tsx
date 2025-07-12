import { Link } from 'react-router-dom';

import Header from '../Header';

const ArticleNotFound = () => {
  return (
    <>
      <Header />
      <main className="container my-5 pt-3">
        <h1 className="text-center">Article Not Found</h1>
        <p className="text-center text-muted">
          Please check the URL or go back to the&nbsp;
          <Link to="/articles" className="article-link">
            articles list
          </Link>
        </p>
      </main>
    </>
  );
};

export default ArticleNotFound;
