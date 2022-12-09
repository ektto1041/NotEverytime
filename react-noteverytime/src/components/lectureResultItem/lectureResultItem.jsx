import React from 'react';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import './lectureResultItem.scss';

const Column = ({
  width,
  thead,
  data,
}) => {
  return (
    <div className='p3 lecture-result-item-column' style={{ width, }}>
      <div className='lecture-result-item-thead'>
        {thead}
      </div>
      {data?.map(item => (
        <div className='lecture-result-item-tbody'>
          {item}
        </div>
      ))}
    </div>
  );
};

const LectureResultItem = ({
  lecture,
}) => {
  const {
    lectureId,
    lectureName,
    lectureCode,
    lectureProfessor,
    lectureTime,
    lectureSemester,
  } = lecture;

  const navigate = useNavigate();

  const handleClick = useCallback(() => {
    navigate(`/lecture/${lectureId}`);
  }, [lectureId]);

  return (
    <div className='lecture-result-item-container' onClick={handleClick}>
      <div className='lecture-result-item-header'>
        <div className='h6 lecture-result-item-title'>
          {lectureName}
        </div>
      </div>
      <div className="semester-box"></div>
      <div className='lecture-result-item-body'>
        <Column width='28%' thead='과목코드' data={[lectureCode]} />
        <Column width='28%' thead='교수명' data={[lectureProfessor]} />
        <Column width='28%' thead='수업시간' data={lectureTime} />
        <Column width='16%' thead='수업 학기' data={lectureSemester} />
      </div>
    </div>
  );
};

export default LectureResultItem;