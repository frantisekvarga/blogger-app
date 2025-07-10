import ArticleForm from '../components/article/ArticleForm';
import Header from '../components/Header';

const CreateArticlePage = () => {
  return (
    <>
    <Header/>
    <div className="container mx-auto py-4">
      <h1>Create New Article</h1>
      <ArticleForm />
    </div>
    </>
    
  );
};

export default CreateArticlePage;
