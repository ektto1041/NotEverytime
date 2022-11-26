import React from 'react';
import { useCallback } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { BoardButton } from '../../components/boardButton/boardButton';
import { PostItem } from '../../components/postItem/postItem';
import { getBoardByIdApi } from '../../utils/api';
import { DUMMY } from '../../utils/constants';
import './lecture.scss';

export const Lecture = () => {
  const params = useParams();

  const [lecture, setLecture] = useState(DUMMY.lectureList[0]);
  const [selectedBoardId, setSelectedBoardId] = useState(0);
  const [postList, setPostList] = useState(DUMMY.lectureList[0].boardList[0].postList);

  const getBoardById = useCallback(async () => {
    const response = await getBoardByIdApi('637a65caa487509eed65f74c');

    console.log(response);
  }, []);

  useEffect(() => {
    getBoardById();

    setLecture(DUMMY.lectureList[params.lectureId]);
    setSelectedBoardId(0);
  }, [params]);

  useEffect(() => {
    setPostList(lecture.boardList[selectedBoardId].postList);
  }, [lecture, selectedBoardId]);

  return (
    <div className='lecture-container'>
      <div className='info-box'>
        <div className='semester-box'>
          <div className='info-item'>
            <div className='info-title'>인증학기</div>
            <div className='info-content'>{`${lecture.lectureSemester}학기`}</div>
          </div>
        </div>
        <div className='detail-info'>
          <div className='lecture-name'>{lecture.lectureName}</div>
          <div className='info-item'>
            <div className='info-title'>과목코드</div>
            <div className='info-content'>{lecture.lectureCode}</div>
          </div>
          <div className='info-item'>
            <div className='info-title'>교수명</div>
            <div className='info-content'>{`${lecture.professor} 교수님`}</div>
          </div>
          <div className='info-item'>
            <div className='info-title'>수업시간</div>
            {lecture?.lectureTimes?.map(time => (
              <div key={time} className='info-content'>{time}</div>
            ))}
          </div>
        </div>
      </div>
      <div className='board'>
        <div className='board-menu'>
          <BoardButton boardId={0} selectedBoardId={selectedBoardId} setBoardId={setSelectedBoardId}>자유게시판</BoardButton>
          <BoardButton boardId={1} selectedBoardId={selectedBoardId} setBoardId={setSelectedBoardId}>선배의 팁 게시판</BoardButton>
          <button className='write-button' ><img src="/images/pen.svg" alt="pen" /></button>
          <BoardButton boardId={2} selectedBoardId={selectedBoardId} setBoardId={setSelectedBoardId}>과제 Q&A 게시판</BoardButton>
          <BoardButton boardId={3} selectedBoardId={selectedBoardId} setBoardId={setSelectedBoardId}>팀원 모집 게시판</BoardButton>
        </div>
        <div className='post-list'>
          {postList?.map(post => (
            <PostItem key={post._id} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
};