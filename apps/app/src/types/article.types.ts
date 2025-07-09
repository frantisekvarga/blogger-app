export interface Author {
  id: number;
  name: string;
}

export interface Article {
  id: number;
  title: string;
  content: string;
  image_url: string;
  user_id: number;
  published_at: string;
  author?: Author;
}
