export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

export interface Article {
  id: number;
  title: string;
  content: string;
  image_url: string;
  user_id: number;
  published_at: Date;
  
}

export interface CreateArticleRequest {
  title: string;
  content: string;
  image_url: string;
  user_id: number;
}

export interface UpdateArticleRequest {
  title?: string;
  content?: string;
  image_url?: string;
}
