import type { AxiosError } from 'axios';
import api from './Api';

type UploadImageResponse = {
  imageUrl: string;
};

export const uploadImage = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append('image', file);

  try {
    const response = await api.post<UploadImageResponse>(
      '/upload-image',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );

    return response.data.imageUrl;
  } catch (error) {
    const axiosError = error as AxiosError;
    console.error('Upload error:', axiosError);
    throw new Error('Failed to upload image');
  }
};
