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
      alert(err.response.data.message);
      navigate('/login');
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
        <button className='p3 lecture-result-back-button' onClick={handleClickBack}>
          뒤로
        </button>
        <div className='h5 lecture-result-title'>
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