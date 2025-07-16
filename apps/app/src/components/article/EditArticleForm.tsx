import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useArticles } from '../../context';
import { uploadImage } from '../../services/FileService';
import { Article } from '../../types';
import ImageUploader from './ImageUploader';
import MarkdownEditor from './MarkdownEditor';

const BASE_URL = 'http://localhost:3333';

interface EditArticleFormProps {
  article: Article;
}

const EditArticleForm: React.FC<EditArticleFormProps> = ({ article }) => {
  const [title, setTitle] = useState(article.title || '');
  const [perex, setPerex] = useState(article.perex || '');
  const [content, setContent] = useState(article.content || '');
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(
    article.image_url || null
  );
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isUpdating, setIsUpdating] = useState(false);
  const navigate = useNavigate();
  const { updateArticle } = useArticles();

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!title.trim()) newErrors.title = 'Title is required.';
    if (!perex.trim()) newErrors.perex = 'Perex is required.';
    if (!content.trim()) newErrors.content = 'Content is required.';

    if (image && !image.type.startsWith('image/')) {
      newErrors.image = 'Uploaded file must be an image.';
    }
    if (!imagePreview) {
      newErrors.image = 'Image is required';
    }
    setErrors(newErrors);
    return !Object.keys(newErrors).length;
  };

  const handleSubmit = async (publish: boolean) => {
    if (!validate()) return;

    setIsUpdating(true);
    try {
      let finalImageUrl = article.image_url;

      if (image) {
        const uploadedImagePath = await uploadImage(image);
        finalImageUrl = `${BASE_URL}${uploadedImagePath}`;
      }

      const updates: Partial<Article> = {
        title,
        perex,
        content,
        image_url: finalImageUrl,
        isPublished: publish,
      };

      await updateArticle(article.id, updates);
      toast.success('Article updated successfully!');
      navigate('/my-articles');
    } catch (error) {
      toast.error('Something went wrong. Please try again.');
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <form className="container mt-3">
      <div className="mb-3">
        <label className="form-label fw-semibold">Article Title</label>
        <input
          type="text"
          placeholder="Title*"
          value={title}
          onChange={e => {
            setTitle(e.target.value);
            delete errors.title;
          }}
          className={`form-control ${errors.title ? 'is-invalid' : ''}`}
        />
        {errors.title && (
          <div className="text-danger small mt-1">{errors.title}</div>
        )}
      </div>

      <div className="mb-3">
        <label className="form-label fw-semibold">Perex</label>
        <input
          type="text"
          placeholder="Perex*"
          value={perex}
          onChange={e => {
            setPerex(e.target.value);
            delete errors.perex;
          }}
          className={`form-control ${errors.perex ? 'is-invalid' : ''}`}
          required
        />
        {errors.perex && (
          <div className="text-danger small mt-1">{errors.perex}</div>
        )}
      </div>

      <div className="mb-4">
        <label className="form-label fw-semibold">Featured image</label>
        <ImageUploader
          image={image}
          setImage={setImage}
          setImagePreview={setImagePreview}
        />
        {errors.image &&
          !imagePreview &&
          Object.keys(errors).includes('image') && (
            <div className="text-danger small mt-1">{errors.image}</div>
          )}
        {imagePreview && delete errors.image && (
          <div className="mt-3 d-flex align-items-start gap-3">
            <p className="m-0 pt-1 fw-semibold">Preview:</p>
            <img
              src={imagePreview}
              alt="Preview"
              className="img-fluid rounded border"
              style={{ maxHeight: '300px' }}
            />
          </div>
        )}
      </div>

      <div className="mb-4">
        <MarkdownEditor
          content={content}
          setContent={setContent}
          onChange={() => delete errors.content}
        />
        {errors.content && (
          <div className="text-danger small mt-1">{errors.content}</div>
        )}
      </div>

      <div className="d-flex gap-4">
        <button
          type="button"
          onClick={() => handleSubmit(true)}
          disabled={isUpdating}
          className="btn btn-primary">
          {isUpdating ? 'Updating...' : 'Publish Article'}
        </button>
        <button
          type="button"
          onClick={() => handleSubmit(false)}
          disabled={isUpdating}
          className="btn btn-outline-secondary">
          {isUpdating ? 'Saving...' : 'Save as Draft'}
        </button>
        <button
          type="button"
          onClick={() => navigate(-1)}
          disabled={isUpdating}
          className="btn btn-outline-danger">
          Cancel
        </button>
      </div>
    </form>
  );
};

export default EditArticleForm;
