import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import LectureResultItem from '../../components/lectureResultItem/lectureResultItem';
import { searchLecturesApi } from '../../utils/api';
import './lectureResult.scss';

const LectureResult = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const [lectures, setLectures] = useState([]);

  const searchLectures = async (keyword) => {
    // const data = [
    //   {
    //     lectureId: 'asdfasdfasdf',
    //     lectureName: '수학1',
    //     lectureCode: 'X253',
    //     lectureProfessor: '황성임 교수님',
    //     lectureTime: ['월 09:00 ~ 10:30', '화 09:00 ~ 10:30'],
    //     lectureSemester: ['2022-2학기', '2022-1학기', '2021-2학기', '2021-1학기'],
    //   },
    //   {
    //     lectureId: 'bvcbsdfbsdfb',
    //     lectureName: '수학2',
    //     lectureCode: 'X255',
    //     lectureProfessor: '박상연 교수님',
    //     lectureTime: ['수 09:00 ~ 10:30', '목 09:00 ~ 10:30'],
    //     lectureSemester: ['2022-2학기'],
    //   },
    // ];

    // setLectures(data);

    try {
      const response = await searchLecturesApi(keyword);

      const newLectures = response.data?.map(item => ({
        lectureId: item.lecture._id,
        lectureName: item.lecture.lectureName,
        lectureCode: item.lectureCode,
        lectureProfessor: item.lecture.lectureProfessor,
        lectureTime: item.lectureTime,
        lectureSemester: item.lectureSemester,
      }));

      setLectures(newLectures);
    } catch(err) {
      if(err.response.data === '세션 없음') {
        alert('로그인이 필요한 서비스입니다.');
        navigate('/login');
      } else {
        console.log(err);
      }
    }
  }

  useEffect(() => {
    const keyword = searchParams.get('keyword') || '';
    searchLectures(keyword);
  }, [searchParams]);

  // 뒤로가기
  const handleClickBack = () => {
    navigate(-1);
  };

  return (
    <div className='lecture-result-container'>
      <div className='lecture-result-header'>
        <button className='lecture-result-back-button' onClick={handleClickBack}>
          뒤로
        </button>
        <div className='lecture-result-title'>
          검색결과
        </div>
      </div>
      <div className='lecture-result-body'>
        {lectures?.map(lecture => (
          <LectureResultItem key={lecture.lectureId} lecture={lecture} />
        ))}
      </div>
    </div>
  )
};

export default LectureResult;