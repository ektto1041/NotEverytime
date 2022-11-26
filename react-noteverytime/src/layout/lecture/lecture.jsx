import React from 'react';
import { useCallback } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { ArticleListItem } from '../../components/articleListItem/articleListItem';
import { getLectureByIdApi, loginApi, searchArticles } from '../../utils/api';
import { DUMMY } from '../../utils/constants';
import './lecture.scss';
import { CategoryButtonBox } from '../../components/categoryButtonBox/categoryButtonBox';

// TODO 페이지 사이즈 결정 필요
const PAGE_SIZE = Math.ceil(window.innerHeight / 150);

export const Lecture = () => {
  const params = useParams();

  const [lecture, setLecture] = useState({});                 // 강의에 대한 정보
  const [selectedCategoryId, setSelectedCategoryId] = useState(0);  // 선택한 카테고리
  const [articleList, setArticleList] = useState([]);         // 선택한 카테고리에 속한 글 리스트
  const [searchText, setSearchText] = useState('');           // 검색어

  const getLectureById = useCallback(async (tab, page = 0, size = PAGE_SIZE) => {
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
        code: response.data.lectureDetail.lectureCode,
        name: response.data.lecture.lectureName,
        professor: response.data.lecture.lectureProfessor,
        semester: response.data.lectureDetail.lectureSemester,
        times: response.data.lectureDetail.lectureTime,
        articles: response.data.articles,
      };
  
      setLecture(newLecture);
    } catch(err) {
      console.log(err);

      setLecture(DUMMY.lectureList[0]);
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

  /**
   * Article 검색
   */
  const handleSearchClick = useCallback(async (e) => {
    e.preventDefault();

    const response = await searchArticles(lecture.id, searchText);

    console.log("# 글 검색 결과")
    console.log(response);

    // TODO 검색 처리
  }, [lecture, searchText]);

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
        <CategoryButtonBox selectedCategoryId={selectedCategoryId} setSelectedCategoryId={setSelectedCategoryId} />
      </div>
      <div className='board'>
        <div className='board-menu'>
          <form onSubmit={handleSearchClick}>
            <input type='text' placeholder='게시물 검색' value={searchText} onChange={(e) => setSearchText(e.target.value)} />
          </form>
          <button className='write-button' ><img src="/images/pen.svg" alt="pen" /></button>
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