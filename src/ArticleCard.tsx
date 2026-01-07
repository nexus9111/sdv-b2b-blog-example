import { getCoverUrl } from './api';
import './ArticleCard.css';
import type { Post } from './types';

interface ArticleCardProps {
  post: Post;
  index: number;
  onClick: () => void;
}

export function ArticleCard({ post, index, onClick }: ArticleCardProps) {
  const isEven = index % 2 === 0;
  const layoutClass = isEven ? 'layout-left' : 'layout-right';

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const stripHtml = (html: string) => {
    const div = document.createElement('div');
    div.innerHTML = html;
    return div.textContent || div.innerText || '';
  };

  return (
    <article className={`article-card ${layoutClass}`} onClick={onClick}>
      <div className="article-image">
        <img src={getCoverUrl(post.collectionId, post.id, post.cover)} alt={post.header} />
      </div>
      <div className="article-content">
        <div className="article-meta">
          <span className="article-author">{post.author}</span>
          <span className="article-date">{formatDate(post.created)}</span>
        </div>
        <h2 className="article-header">{post.header}</h2>
        <div className="article-body">
          {stripHtml(post.body)}
        </div>
      </div>
    </article>
  );
}
