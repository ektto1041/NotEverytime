import React from 'react';
import './authSemesterContentItem.scss';

export const AuthSemesterContentItem = ({
  lecture,
  idx,
}) => {
  // const { _id, lectureCode, lectureName, professor, lectureTimes } = lecture;

  return (
    <div className='auth-semester-content-item'>
      <div className='auth-semester-content-column' style={{width: '10%'}}>{idx}</div>
      <div className='auth-semester-content-column' style={{width: '15%'}}>{lecture.lectureCode}</div>
      <div className='auth-semester-content-column' style={{width: '30%'}}>{lecture.lectureId.lectureName}</div>
      <div className='auth-semester-content-column' style={{width: '15%'}}>{lecture.lectureId.lectureProfessor}</div>
      <div className='auth-semester-content-column' style={{width: '30%'}}>
        {lecture.lectureTime?.map(time => (
          <div className='auth-semester-content-line' key={`${idx}_${time}`}>{time}</div>
        ))}
      </div>
    </div>
  );
};