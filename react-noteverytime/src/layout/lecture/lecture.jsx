import React from 'react';
import { useCallback } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArticleListItem } from '../../components/articleListItem/articleListItem';
import { getArticlesApiPaging, getLectureApi, } from '../../utils/api';
import './lecture.scss';
import { CategoryButtonBox } from '../../components/categoryButtonBox/categoryButtonBox';
import moment from 'moment';
import 'moment/locale/ko';
import { CATEGORIES, getCategoryAuthority, getUserStatus, USER_STATUS } from '../../utils/constants';

// TODO 페이지 사이즈 결정 필요
const PAGE_SIZE = 5;

const debounce = (callback, limit) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      callback.apply(this, args);
    }, limit);
  }
};

/**
 * 1. lecture 정보 가져옴 - lecture가 아직 없으면 다른 useEffect 발생하지 않음
 * 2. lecture 가져오는 데 성공하면 need articles
 * 3. need articles 상태가 되면 키워드 없이 first api 호출
 * 4. 게시판 바꾸면 need articles -> 3.
 * 5. 검색 누르면 fixedKeyword 설정하고 직접 first api 호출
 * 6. 스크롤 시 fixedKeyword 참조해서 paging api 호출
 */

export const Lecture = () => {
  const {lectureId} = useParams();
  const navigate = useNavigate();

  const [lecture, setLecture] = useState({});                 // 강의에 대한 정보
  const hasLecture = Object.keys(lecture).length > 0;
  const userStatus = getUserStatus(lecture.semester, lecture.userSemester);
  const [selectedCategoryId, setSelectedCategoryId] = useState(1);  // 선택한 카테고리
  const [isNeedArticles, setNeedArticles] = useState(false);
  const [articleList, setArticleList] = useState([]);         // 선택한 카테고리에 속한 글 리스트
  const [keyword, setKeyword] = useState('');                 // 검색어 입력하는 input의 value
  const [fixedKeyword, setFixedKeyword] = useState('');       // 쿼리에 포함될 검색어

  const [cursor, setCursor] = useState('0');                // 무한 스크롤에서 현재 커서
  // 무한 스크롤에서 현재 데이터를 가져오고 있는 지 여부
  // true라면 데이터를 가져오지 않음
  const [isFetching, setFetching] = useState(false);
  const [hasNextPage, setNextPage] = useState(false);  // 무한 스크롤에서 다음 페이지가 존재하는 지 여부

  const getLecture = useCallback(async () => {
    try {
      const response = await getLectureApi(lectureId);
      console.log('# 강의 정보');
      console.log(response);

      const newLecture = {
        id: response.data.lecture._id,
        subjectId: response.data.lecture.lectureSubjectId,
        code: response.data.lectureDetail.lectureCode,
        name: response.data.lecture.lectureName,
        professor: response.data.lecture.lectureProfessor,
        semester: response.data.lectureDetail?.lectureSemester,
        // 유저의 학기가 null 이면 미수강생
        // userSemester: response.data.userLectureDetail?.lectureSemester,
        // userSemester: '20',
        times: response.data.lectureDetail.lectureTime,
      };

      setLecture(newLecture);
      setNeedArticles(true);
    } catch (err) {
      console.log(err);
    }
  }, [lectureId]);
  
  const getArticlesFirst = useCallback(async (keyword, tab) => {
    // TODO 실제 데이터 추가
    try {
      const response = await getArticlesApiPaging(lectureId, keyword, tab, PAGE_SIZE);

      console.log('# 강의/게시판 가져온 결과');
      console.log(response);

      setArticleList(response.data?.map(article => ({
        ...article,
        createAt: moment(article.createdAt),
        modifiedAt: moment(article.modifiedAt),
      })));
      setCursor(response.data[response.data.length-1]?._id);
      setNeedArticles(false);
      setNextPage(response.data.length > 0);
    } catch(err) {
      console.log(err);
    }
  }, [lectureId]);

  const getArticles = useCallback(async () => {
    try {
      const response = await getArticlesApiPaging(lectureId, fixedKeyword, selectedCategoryId, PAGE_SIZE, cursor);
      console.log('# 강의/게시판 가져온 결과');
      console.log(response);
  
      setArticleList([...articleList, ...response.data?.map(article => ({
        ...article,
        createAt: moment(article.createdAt),
        modifiedAt: moment(article.modifiedAt),
      }))]);
      setCursor(response.data[response.data.length-1]?._id);
      setFetching(false);
      setNextPage(response.data.length > 0);
    } catch(err) {
      console.log(err);
    }
  }, [lectureId, fixedKeyword, cursor, articleList]);

  // 무한 스크롤 이벤트 등록
  useEffect(() => {
    const handleScroll = debounce(() => {
      const { scrollTop, offsetHeight } = document.documentElement;
      if(window.innerHeight + scrollTop >= offsetHeight - 2) {
        setFetching(true);
      }
    }, 100);

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    }
  }, []);

  // 최초 페이지 접근 시 강의 정보
  useEffect(() => {
    getLecture();
  }, []);

  // 무한 스크롤 시 데이터 가져오기
  useEffect(() => {
    if(!hasLecture) return;
    if(isFetching && hasNextPage) {
      getArticles();
    } else if(!hasNextPage) setFetching(false);
    
  // eslint-disable-next-line
  }, [isFetching]);

  useEffect(() => {
    // 아직 강의 정보가 로딩되지 않았으면 실행되지 않음
    console.log('hasLecture:' + hasLecture);
    console.log('isNeedArticles: ' + isNeedArticles)
    if(!hasLecture) return;
    if(!isNeedArticles) return;
    getArticlesFirst('', selectedCategoryId);
  }, [isNeedArticles]);

  /**
   * 선택한 게시판이 바뀌면 articleList 가 변함
   */
  useEffect(() => {
    // 아직 강의 정보가 로딩되지 않았으면 실행되지 않음
    console.log('게시판 눌렀을 떄 hasLecture: ' + hasLecture);
    if(!hasLecture) return;

    // 검색어 초기화
    setKeyword('');
    setFixedKeyword('');

    // 게시글 가져오기
    setNeedArticles(true);
    console.log('setNeedArticles(true)')
  // eslint-disable-next-line
  }, [selectedCategoryId]);

  /**
   * 게시판 선택 시
   */
  const handleCategoryClick = useCallback((categoryId) => {
    if(getCategoryAuthority(categoryId, userStatus).read) {
        setSelectedCategoryId(categoryId);
    } else {
      // TODO 올바른 피드백
      alert("접근 권한이 없습니다.");
    }
  }, [userStatus]);

  /**
   * Article 검색
   */
  const handleSearchClick = useCallback(async (e) => {
    e.preventDefault();

    // 검색한 검색어를 저장 (페이징에 이용)
    setFixedKeyword(keyword);

    // 검색어를 이용해 최초 페이징 조회
    getArticlesFirst(keyword, selectedCategoryId);
  }, [keyword, getArticlesFirst, selectedCategoryId]);

  console.log('render');

  /**
   * 글쓰기 클릭 시
   */
  const handlePostClick = useCallback(() => {
    if(getCategoryAuthority(selectedCategoryId, userStatus).write) {
      navigate(`/post`);
    } else {
      // TODO 올바른 피드백
      alert("접근 권한이 없습니다.");
    }
  }, [selectedCategoryId, userStatus]);

  return (
    <div className='lecture-container'>
      <div className='info-box'>
        <div className='user-semester-box'>
          <div className='info-item'>
            <div className='info-title'>인증학기</div>
            <div className='info-content'>{USER_STATUS.getStr(userStatus)}</div>
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
        <CategoryButtonBox selectedCategoryId={selectedCategoryId} onCategoryClick={handleCategoryClick} />
      </div>
      <div className='board'>
        <div className='board-menu'>
          <form onSubmit={handleSearchClick}>
            <input type='text' placeholder='게시물 검색' value={keyword} onChange={(e) => setKeyword(e.target.value)} />
          </form>
          <button className='write-button' onClick={handlePostClick} ><img src="/images/pen.svg" alt="pen" /></button>
        </div>
        <div className='article-list'>
          {articleList?.map(article => (
            <>
              <ArticleListItem key={article._id} article={article} />
            </>
          ))}
        </div>
      </div>
    </div>
  );
};