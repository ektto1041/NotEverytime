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
    username,
    likeCount,
    isImage,
    articleImages,
  } = article;

  const navigate = useNavigate();

  return (
    <div className='article-item-container'>
      <div className='article-item-box' onClick={() => navigate(`/article/${_id}`)}>
        <div className={`article-info`}>
          <div className='p3 article-title'>
            {title}
          </div>
          <div className='p3 article-preview'>
            {/* {content.length > 70 ? content.substring(0, 70) + "..." : content} */}
            {content}
          </div>
          <div className='article-data'>
            <div className='p4 article-created-at'>
              {modifiedAt && moment.isMoment(modifiedAt) ? modifiedAt.fromNow() : ''}
            </div>
            <div className='p4 article-writer'>
              {username}
            </div>
            <div className='article-icons'>
              <div className='p4 comments'>
                <img src="/images/Icon_Thumb_up.svg" width='24px' height='24px' alt='comment' />
                3
              </div>
              <div className='p4 images'>
                <img src="/images/Icon_Chat.svg" width='24px' height='24px' alt='image' />
                {likeCount}
              </div>
            </div>
          </div>
        </div>
        {isImage ? (
        // <div className='thumbnail'>
        //   {/* mr 24, 124*124 */}
        // </div>
        <img className='thumbnail' src={articleImages[0]?.articleImageLink} alt="Thumbnail" />
      ) : (<></>)} 
      </div>
    </div>
  );
};