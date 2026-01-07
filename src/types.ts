export interface Post {
  id: string;
  author: string;
  body: string;
  collectionId: string;
  collectionName: string;
  cover: string;
  created: string;
  header: string;
  updated: string;
}

export interface ApiResponse {
  items: Post[];
  page: number;
  perPage: number;
  totalItems: number;
  totalPages: number;
}
