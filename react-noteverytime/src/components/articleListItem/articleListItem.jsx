import React from 'react';
import './articleListItem.scss';

export const ArticleListItem = ({
  article,
}) => {
  const {
    title,
    content,
    createdAt,
    userId,
    likeCount,
    isImage,
  } = article;

  return (
    <div className='article-item-container'>
      <div className={`article-info ${isImage ? 'with-thumbnail' : ''}`}>
        <div className='article-title'>
          {title}
        </div>
        <div className='article-preview'>
          {/* {content.length > 70 ? content.substring(0, 70) + "..." : content} */}
          {content}
        </div>
        <div className='article-data'>
          <div className='article-created-at'>
            {createdAt}
          </div>
          <div className='article-writer'>
            {userId}
          </div>
          <div className='article-icons'>
            <div className='comments'>
              <img src="/images/comment.svg" alt='comment' />
              3
            </div>
            <div className='images'>
              <img src="/images/image_icon.svg" alt='image' />
              {likeCount}
            </div>
          </div>
        </div>
      </div>
      {isImage ? (
        <div className='thumbnail'>
          {/* mr 24, 124*124 */}
        </div>
      ) : (<></>)} 
    </div>
  );
};