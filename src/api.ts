import type { ApiResponse } from "./types";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export async function fetchPosts(): Promise<ApiResponse> {
  const response = await fetch(`${BACKEND_URL}/api/collections/posts/records`);

  if (!response.ok) {
    throw new Error('Failed to fetch posts');
  }

  return response.json();
}

export function getCoverUrl(collectionId: string, recordId: string, filename: string): string {
  return `${BACKEND_URL}/api/files/${collectionId}/${recordId}/${filename}`;
}
