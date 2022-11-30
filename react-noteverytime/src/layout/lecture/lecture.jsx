import React from 'react';
import { useCallback } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { ArticleListItem } from '../../components/articleListItem/articleListItem';
import { getLectureByIdApi, getLectureByIdApiPaging, loginApi, searchArticles } from '../../utils/api';
import { DUMMY } from '../../utils/constants';
import './lecture.scss';
import { CategoryButtonBox } from '../../components/categoryButtonBox/categoryButtonBox';
import moment from 'moment';
import 'moment/locale/ko';

// TODO 페이지 사이즈 결정 필요
const PAGE_SIZE = Math.ceil(window.innerHeight / 150);
const OFFSET = 20;

const debounce = (callback, limit) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      callback.apply(this, args);
    }, limit);
  }
};

export const Lecture = () => {
  const params = useParams();

  const [lecture, setLecture] = useState({});                 // 강의에 대한 정보
  const [selectedCategoryId, setSelectedCategoryId] = useState(1);  // 선택한 카테고리
  const [articleList, setArticleList] = useState([]);         // 선택한 카테고리에 속한 글 리스트
  const [searchText, setSearchText] = useState('');           // 검색어

  const [page, setPage] = useState(1);                // 무한 스크롤에서 현재 페이지
  // 무한 스크롤에서 현재 데이터를 가져오고 있는 지 여부
  // true라면 데이터를 가져오지 않음
  const [isFetching, setFetching] = useState(false);
  const [hasNextPage, setNextPage] = useState(true);  // 무한 스크롤에서 다음 페이지가 존재하는 지 여부

  const getLectureById = useCallback(async (tab, page = 0, size = PAGE_SIZE,) => {
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
      setArticleList(newLecture.articles);
    } catch(err) {
      console.log(err);

      setLecture(DUMMY.lectureList[0]);
      setArticleList(DUMMY.lectureList[0].articles);
    }
  }, []);
  
  const getLectureByIdFirst = useCallback(async (tab) => {
    // TODO 임시 로그인
    const login = await loginApi({accountId: "mcodnjs", password: "aaaa"});

    console.log(login);

    // TODO 실제 데이터 추가
    try {
      const response = await getLectureByIdApiPaging('637f14045732f3b44bc163a2', tab, 1, OFFSET, 0);

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
      };
  
      console.log(
        response.data.articles.map(article => ({
          ...article,
          createAt: moment(article.createdAt),
          modifiedAt: moment(article.modifiedAt),
        }))
      );

      setLecture(newLecture);
      setArticleList(response.data.articles.map(article => ({
        ...article,
        createAt: moment(article.createdAt),
        modifiedAt: moment(article.modifiedAt),
      })));
      setNextPage(!response.data?.last);
    } catch(err) {
      console.log(err);

      setLecture(DUMMY.lectureList[0]);
      setArticleList(DUMMY.lectureList[0].articles);
      setNextPage(true);
    }
  }, []);

  const getLectureByIdPaging = useCallback(async (tab, page, size, offset) => {
    // TODO 임시 로그인
    const login = await loginApi({accountId: "mcodnjs", password: "aaaa"});

    console.log(login);

    // TODO 실제 데이터 추가
    try {
      const response = await getLectureByIdApiPaging('637f14045732f3b44bc163a2', tab, page, size, offset);

      console.log('# 강의/게시판 가져온 결과');
      console.log(response);
  
      console.log([...articleList, ...response.data.articles]);
      setArticleList([...articleList, ...response.data.articles.map(article => ({
        ...article,
        createAt: moment(article.createdAt),
        modifiedAt: moment(article.modifiedAt),
      }))]);
      setPage(page+1);
      setFetching(false);
      setNextPage(!response.data?.last);
    } catch(err) {
      console.log(err);

      setArticleList(DUMMY.lectureList[0].articles);
      setPage(page+1);
      setFetching(false);
      setNextPage(true);
    }
  }, [articleList]);

  // 무한 스크롤 이벤트 등록
  useEffect(() => {
    const handleScroll = debounce(() => {
      const { scrollTop, offsetHeight } = document.documentElement;
      if(window.innerHeight + scrollTop >= offsetHeight - 2) {
        console.log(window.innerHeight + scrollTop);
        console.log(offsetHeight);
        setFetching(true);
      }
    }, 100);

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    }
  }, []);

  // 무한 스크롤 시 데이터 가져오기
  useEffect(() => {
    console.log("scroll!")

    if(isFetching && hasNextPage) {
      getLectureByIdPaging(selectedCategoryId, page, PAGE_SIZE, OFFSET);

    } else if(!hasNextPage) setFetching(false);
  // eslint-disable-next-line
  }, [isFetching]);

  /**
   * 선택한 게시판이 바뀌면 articleList 가 변함
   */
  useEffect(() => {
    getLectureByIdFirst(selectedCategoryId);
  // eslint-disable-next-line
  }, [selectedCategoryId]);

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
            <>
              <ArticleListItem key={article.id} article={article} />
            <ArticleListItem key={article.id} article={article} />
            <ArticleListItem key={article.id} article={article} />
            <ArticleListItem key={article.id} article={article} />
            <ArticleListItem key={article.id} article={article} />
            <ArticleListItem key={article.id} article={article} />
            <ArticleListItem key={article.id} article={article} />
            <ArticleListItem key={article.id} article={article} />
            <ArticleListItem key={article.id} article={article} />
            <ArticleListItem key={article.id} article={article} />
            <ArticleListItem key={article.id} article={article} />
            <ArticleListItem key={article.id} article={article} />
            <ArticleListItem key={article.id} article={article} />
            </>
          ))}
        </div>
      </div>
    </div>
  );
};