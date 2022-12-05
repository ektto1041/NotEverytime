import React from 'react';
import './articleListItem.scss';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';

export const ArticleListItem = ({
  article,
}) => {
  const {
    _id,
    title,
    content,
    createdAt,
    modifiedAt,
    userId,
    likeCount,
    isImage,
  } = article;

  const navigate = useNavigate();

  return (
    <div className='article-item-container' onClick={() => navigate(`/article/${_id}`)}>
      <div className={`article-info`}>
        <div className='article-title'>
          {title}
        </div>
        <div className='article-preview'>
          {/* {content.length > 70 ? content.substring(0, 70) + "..." : content} */}
          {content}
        </div>
        <div className='article-data'>
          <div className='article-created-at'>
            {modifiedAt && moment.isMoment(modifiedAt) ? modifiedAt.fromNow() : ''}
          </div>
          <div className='article-writer'>
            {userId}
          </div>
          <div className='article-icons'>
            <div className='comments'>
              <img src="/images/Icon_Thumb_up.svg" width='24px' height='24px' alt='comment' />
              3
            </div>
            <div className='images'>
              <img src="/images/Icon_Chat.svg" width='24px' height='24px' alt='image' />
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