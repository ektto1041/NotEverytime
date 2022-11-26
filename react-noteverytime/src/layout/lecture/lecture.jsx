import React from 'react';
import { useCallback } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { BoardButton } from '../../components/boardButton/boardButton';
import { ArticleListItem } from '../../components/articleListItem/articleListItem';
import { getLectureByIdApi, loginApi } from '../../utils/api';
import { DUMMY } from '../../utils/constants';
import './lecture.scss';

export const Lecture = () => {
  const params = useParams();

  const [lecture, setLecture] = useState({});                 // 강의에 대한 정보
  const [selectedCategoryId, setSelectedCategoryId] = useState(0);  // 선택한 카테고리
  const [articleList, setArticleList] = useState([]);         // 선택한 카테고리에 속한 글 리스트

  const getLectureById = useCallback(async (tab) => {
    // TODO 임시 로그인
    const login = await loginApi({accountId: "mcodnjs", password: "aaaa"});

    console.log(login);

    // TODO 실제 데이터 추가
    try {
      const response = await getLectureByIdApi('637f14045732f3b44bc163a2', tab);

      console.log('# 강의/게시판 가져온 결과');
      console.log(response);

      const newLecture = {
        id: response.data.lecture._id,
        subjectId: response.data.lecture.lectureSubjectId,
        code: response.data.lecture_detail.lectureCode,
        name: response.data.lecture.lectureName,
        professor: response.data.lecture.lectureProfessor,
        semester: response.data.lecture_detail.lectureSemester,
        times: response.data.lecture_detail.lectureTime,
        articles: response.data.articles,
      };
  
      setLecture(newLecture);
      // setArticleList(response.data.articles?.filter(article => article.category === tab));
    } catch(err) {
      console.log(err);

      setLecture(DUMMY.lectureList[0]);
      // setArticleList(DUMMY.lectureList[0].articles?.filter(article => article.category === tab));
    }
  }, []);

  /**
   * 처음 페이지가 로딩되면 강의 정보와 해당 강의의 1 category 게시판 글들이 불러와짐
   */
  useEffect(() => {
    setSelectedCategoryId(1);
    getLectureById(1);
  }, [params]);

  /**
   * 선택한 게시판이 바뀌면 articleList 가 변함
   */
  useEffect(() => {
    setArticleList(lecture.articles?.filter(article => article.category === selectedCategoryId));
  }, [lecture, selectedCategoryId]);

  return (
    <div className='lecture-container'>
      <div className='info-box'>
        <div className='semester-box'>
          <div className='info-item'>
            <div className='info-title'>인증학기</div>
            <div className='info-content'>{`${lecture.semester}학기`}</div>
          </div>
        </div>
        <div className='detail-info'>
          <div className='lecture-name'>{lecture.name}</div>
          <div className='info-item'>
            <div className='info-title'>과목코드</div>
            <div className='info-content'>{lecture.code}</div>
          </div>
          <div className='info-item'>
            <div className='info-title'>교수명</div>
            <div className='info-content'>{`${lecture.professor} 교수님`}</div>
          </div>
          <div className='info-item'>
            <div className='info-title'>수업시간</div>
            {lecture.times?.map(time => (
              <div key={time} className='info-content'>{time}</div>
            ))}
          </div>
        </div>
      </div>
      <div className='board'>
        <div className='board-menu'>
          <BoardButton categoryId={1} selectedCategoryId={selectedCategoryId} setSelectedCategoryId={setSelectedCategoryId}>자유게시판</BoardButton>
          <BoardButton categoryId={2} selectedCategoryId={selectedCategoryId} setSelectedCategoryId={setSelectedCategoryId}>선배의 팁 게시판</BoardButton>
          <button className='write-button' ><img src="/images/pen.svg" alt="pen" /></button>
          <BoardButton categoryId={3} selectedCategoryId={selectedCategoryId} setSelectedCategoryId={setSelectedCategoryId}>과제 Q&A 게시판</BoardButton>
          <BoardButton categoryId={4} selectedCategoryId={selectedCategoryId} setSelectedCategoryId={setSelectedCategoryId}>팀원 모집 게시판</BoardButton>
        </div>
        <div className='article-list'>
          {articleList?.map(article => (
            <ArticleListItem key={article.id} article={article} />
          ))}
        </div>
      </div>
    </div>
  );
};