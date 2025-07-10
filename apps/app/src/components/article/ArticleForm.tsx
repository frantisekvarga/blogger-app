import { useState } from "react";
import MarkdownEditor from "./MarkdownEditor";
import ImageUploader from "./ImageUploader";

const ArticleForm = () => {
  const [title, setTitle] = useState("");
  const [perex, setPerex] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validate = () => {
  const newErrors: { [key: string]: string } = {};
  if (!title.trim()) newErrors.title = "Title is required.";
  if (!perex.trim()) newErrors.perex = "Perex is required.";
  if (!content.trim()) newErrors.content = "Content is required.";

  if (image && !image.type.startsWith("image/")) {
    newErrors.image = "Uploaded file must be an image.";
  }
   if (imagePreview === null) {
    newErrors.image = "Image is required";
  }
  setErrors(newErrors);
  return !Object.keys(newErrors).length;
};


  const handlePublish = () => {
    if (!validate()) return;
    console.log({ title, perex, content, image });
  };

  const handleSaveDraft = () => {
    if (!validate()) return;
    console.log(" draft", { title, perex, content, image });
  };

  return (
    <form className="container mt-3">
      <div className="mb-3">
        <label className="form-label fw-semibold">Article Title</label>
        <input
          type="text"
          placeholder="Title*"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            delete errors.title;
          }}
          className={`form-control ${errors.title ? "is-invalid" : ""}`}
        />
        {errors.title && <div className="text-danger small mt-1">{errors.title}</div>}
      </div>

      <div className="mb-3">
        <label className="form-label fw-semibold">Perex</label>
        <input
          type="text"
          placeholder="Perex*"
          value={perex}
          onChange={(e) => {
            setPerex(e.target.value);
            delete errors.perex;

          }}
          className={`form-control ${errors.perex ? "is-invalid" : ""}`}
          required
        />
        {errors.perex && <div className="text-danger small mt-1">{errors.perex}</div>}
      </div>

      <div className="mb-4">
        <label className="form-label fw-semibold">Featured image</label>
        <ImageUploader image={image} setImage={setImage} setImagePreview={setImagePreview} />
        {errors.image && !imagePreview && Object.keys(errors).includes("image") && <div className="text-danger small mt-1">{errors.image}</div>}
        {imagePreview && delete errors.image &&  (
          <div className="mt-3 d-flex align-items-start gap-3">
            <p className="m-0 pt-1 fw-semibold">Preview:</p>
            <img
              src={imagePreview}
              alt="Preview"
              className="img-fluid rounded border"
              style={{ maxHeight: "300px" }}
            />
          </div>
        )}
      </div>

      <div className="mb-4">
        <MarkdownEditor content={content} setContent={setContent} onChange ={ () => delete errors.content} />
        {errors.content && <div className="text-danger small mt-1">{errors.content}</div>}
      </div>

      <div className="d-flex gap-4">
        <button type="button" onClick={handlePublish} className="btn btn-primary">
          Publish Article
        </button>
        <button type="button" onClick={handleSaveDraft} className="btn btn-outline-secondary">
          Save as Draft
        </button>
      </div>
    </form>
  );
};

export default ArticleForm;
