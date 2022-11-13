import React from 'react';
import { PostItem } from '../../components/postItem/postItem';
import './lecture.scss';

export const Lecture = () => {
  return (
    <div className='lecture-container'>
      <div className='info-box'>
        <div className='semester-box'>
          <div className='info-item'>
            <div className='info-title'>인증학기</div>
            <div className='info-content'>2022-2학기</div>
          </div>
        </div>
        <div className='detail-info'>
          <div className='lecture-name'>웹시스템설계</div>
          <div className='info-item'>
            <div className='info-title'>과목코드</div>
            <div className='info-content'>F065</div>
          </div>
          <div className='info-item'>
            <div className='info-title'>교수명</div>
            <div className='info-content'>오상윤 교수님</div>
          </div>
          <div className='info-item'>
            <div className='info-title'>수업시간</div>
            <div className='info-content'>월 12:00~13:30</div>
            <div className='info-content'>화 09:00~11:00</div>
            <div className='info-content'>수 12:00~13:30</div>
          </div>
        </div>
      </div>
      <div className='board'>
        <div className='board-menu'>
          <button className='board-button selected' >자유게시판</button>
          <button className='board-button' >선배의 팁 게시판</button>
          <button className='write-button' ><img src="/images/pen.svg" alt="pen" /></button>
          <button className='board-button' >과제 Q&A 게시판</button>
          <button className='board-button' >팀원 모집 게시판</button>
        </div>
        <div className='post-list'>
          <PostItem hasThunbnail={true} />
          <PostItem hasThunbnail={false} />
          <PostItem hasThunbnail={false} />
          <PostItem hasThunbnail={false} />
          <PostItem hasThunbnail={true} />
          <PostItem hasThunbnail={false} />
        </div>
      </div>
    </div>
  );
};