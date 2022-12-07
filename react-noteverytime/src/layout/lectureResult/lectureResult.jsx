import React from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import LectureResultItem from '../../components/lectureResultItem/lectureResultItem';
import './lectureResult.scss';

const LectureResult = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  console.log(searchParams.get('key'));

  return (
    <div className='lecture-result-container'>
      <div className='lecture-result-header'>
        <button className='lecture-result-back-button'>
          뒤로
        </button>
        <div className='lecture-result-title'>
          검색결과
        </div>
      </div>
      <div className='lecture-result-body'>
        <LectureResultItem />
        <LectureResultItem />
      </div>
    </div>
  )
};

export default LectureResult;