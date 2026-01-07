import { getCoverUrl } from './api';
import './ArticleDetail.css';
import type { Post } from './types';

interface ArticleDetailProps {
  post: Post;
  onClose: () => void;
}

export function ArticleDetail({ post, onClose }: ArticleDetailProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="article-detail-overlay" onClick={onClose}>
      <div className="article-detail-container" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>
          ×
        </button>

        <article className="article-detail">
          <div className="article-detail-image">
            <img src={getCoverUrl(post.collectionId, post.id, post.cover)} alt={post.header} />
          </div>

          <div className="article-detail-content">
            <div className="article-detail-meta">
              <span className="article-detail-author">{post.author}</span>
              <span className="article-detail-date">{formatDate(post.created)}</span>
            </div>

            <h1 className="article-detail-header">{post.header}</h1>

            <div
              className="article-detail-body"
              dangerouslySetInnerHTML={{ __html: post.body }}
            />
          </div>
        </article>
      </div>
    </div>
  );
}
