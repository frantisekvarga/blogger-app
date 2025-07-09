import { Link } from 'react-router-dom';
import Header from '../Header';

const ArticleNotFound = () => {
    return (
        <>
            <Header />
            <main className="container my-5 pt-3">
                <h1 className="text-center">Článok nebol nájdený</h1>
                <p className="text-center text-muted">
                    Skontrolujte URL alebo sa vráťte späť na&nbsp;
                    <Link to="/articles" className="article-link">
                        zoznam článkov
                    </Link>
                </p>
            </main>
        </>
    );
};

export default ArticleNotFound;
