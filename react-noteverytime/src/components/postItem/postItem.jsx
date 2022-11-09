import React from 'react';
import './postItem.scss';

export const PostItem = ({
  hasThunbnail
}) => {
  return (
    <div className='post-item-container'>
      <div className={`post-info ${hasThunbnail ? 'with-thumbnail' : ''}`}>
        <div className='post-title'>
          글 제목
        </div>
        <div className='post-preview'>
          어쩌고저쩌고어쩌고저쩌고어쩌고저쩌고어쩌고저쩌고어쩌고저쩌고어쩌고저쩌고어쩌고저쩌고어쩌고저쩌고어쩌고저쩌고어쩌고저쩌고어쩌고저쩌고
        </div>
        <div className='post-data'>
          <div className='post-created-at'>
            1분 전
          </div>
          <div className='post-writer'>
            2022-2학기 수강생
          </div>
          <div className='post-icons'>
            <div className='comments'>
              <img src="/images/comment.svg" alt='comment' />
              3
            </div>
            <div className='images'>
              <img src="/images/image_icon.svg" alt='comment' />
              2
            </div>
          </div>
        </div>
      </div>
      {hasThunbnail ? (
        <div className='thumbnail'>
          {/* mr 24, 124*124 */}
        </div>
      ) : (<></>)} 
    </div>
  );
};