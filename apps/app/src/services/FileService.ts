import type { AxiosError } from 'axios';
import axios from 'axios';

type UploadImageResponse = {
  imageUrl: string;
};

export const uploadImage = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append('image', file);

  try {
    const response = await axios.post<UploadImageResponse>(
      '/api/articles/upload-image',
      formData
    );

    return response.data.imageUrl;
  } catch (error) {
    const axiosError = error as AxiosError;
    console.error('Upload error:', axiosError);
    throw new Error('Failed to upload image');
  }
};
