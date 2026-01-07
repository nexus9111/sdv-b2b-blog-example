import { useEffect, useState } from 'react';
import { fetchPosts } from './api';
import { ArticleCard } from './ArticleCard';
import { ArticleDetail } from './ArticleDetail';
import './Blog.css';
import type { Post } from './types';

export function Blog() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  useEffect(() => {
    async function loadPosts() {
      try {
        setLoading(true);
        const data = await fetchPosts();
        setPosts(data.items);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load posts');
      } finally {
        setLoading(false);
      }
    }

    loadPosts();
  }, []);

  if (loading) {
    return (
      <div className="blog-container">
        <div className="blog-status">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="blog-container">
        <div className="blog-status error">Error: {error}</div>
      </div>
    );
  }

  return (
    <>
      <div className="blog-container">
        <header className="blog-header">
          <h1 className="blog-title">Blog</h1>
          <div className="blog-subtitle">
            {posts.length} {posts.length === 1 ? 'article' : 'articles'}
          </div>
        </header>

        <main className="blog-main">
          {posts.map((post, index) => (
            <ArticleCard
              key={post.id}
              post={post}
              index={index}
              onClick={() => setSelectedPost(post)}
            />
          ))}
        </main>
      </div>

      {selectedPost && (
        <ArticleDetail
          post={selectedPost}
          onClose={() => setSelectedPost(null)}
        />
      )}
    </>
  );
}
