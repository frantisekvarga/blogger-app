
import React from "react";

interface Props {
  image: File | null;
  setImage: (file: File | null) => void;
  setImagePreview: (url: string | null) => void;
}

const ImageUploader: React.FC<Props> = ({ image, setImage, setImagePreview }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setImage(null);
      setImagePreview(null);
    }
  };

  return (
    <div className="image-uploader">
      <input type="file" accept="image/*"  className="form-control"  onChange={handleChange} />
    </div>
  );
};

export default ImageUploader;
