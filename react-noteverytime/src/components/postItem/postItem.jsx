import React from 'react';
import './postItem.scss';

export const PostItem = ({
  post,
}) => {
  const {
    title,
    content,
    createdAt,
    user,
    isImage,
  } = post;

  return (
    <div className='post-item-container'>
      <div className={`post-info ${isImage ? 'with-thumbnail' : ''}`}>
        <div className='post-title'>
          {title}
        </div>
        <div className='post-preview'>
          {/* {content.length > 70 ? content.substring(0, 70) + "..." : content} */}
          {content}
        </div>
        <div className='post-data'>
          <div className='post-created-at'>
            {createdAt}
          </div>
          <div className='post-writer'>
            {user}
          </div>
          <div className='post-icons'>
            <div className='comments'>
              <img src="/images/comment.svg" alt='comment' />
              3
            </div>
            <div className='images'>
              <img src="/images/image_icon.svg" alt='image' />
              2
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