import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { createArticle } from '../../services/ArticleService';
import { uploadImage } from '../../services/FileService';
import { CreateArticleInput } from '../../types/ArticleType';
import ImageUploader from './ImageUploader';
import MarkdownEditor from './MarkdownEditor';

const BASE_URL = 'http://localhost:3333';

const ArticleForm = () => {
  const [title, setTitle] = useState('');
  const [perex, setPerex] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { state: authState } = useAuth();

  const userId = authState.user?.id;

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!title.trim()) newErrors.title = 'Title is required.';
    if (!perex.trim()) newErrors.perex = 'Perex is required.';
    if (!content.trim()) newErrors.content = 'Content is required.';

    if (image && !image.type.startsWith('image/')) {
      newErrors.image = 'Uploaded file must be an image.';
    }
    
    setErrors(newErrors);
    return !Object.keys(newErrors).length;
  };

  const handleSubmit = async (publish: boolean) => {
    if (!validate()) return;

    if (!userId) {
      toast.error('You must be logged in to create an article.');
      return;
    }

    setIsSubmitting(true);
    try {
      let finalImageUrl =
        'https://upload.wikimedia.org/wikipedia/commons/2/26/512pxIcon-sunset_photo_not_found.png';

      if (image) {
        const uploadedImagePath = await uploadImage(image);
        finalImageUrl = `${BASE_URL}${uploadedImagePath}`;
      }

      const article: CreateArticleInput = {
        title,
        perex,
        content,
        imageUrl: finalImageUrl,
        isPublished: publish,
      };

      await createArticle(userId, article);
      toast.success('Article created successfully!');
      navigate('/my-articles');
    } catch (error) {
      toast.error('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
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
          disabled={isSubmitting}
          className="btn btn-primary">
          {isSubmitting ? 'Creating...' : 'Publish Article'}
        </button>
        <button
          type="button"
          onClick={() => handleSubmit(false)}
          disabled={isSubmitting}
          className="btn btn-outline-secondary">
          {isSubmitting ? 'Saving...' : 'Save as Draft'}
        </button>
      </div>
    </form>
  );
};

export default ArticleForm;
