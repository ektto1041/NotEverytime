import React from 'react';
import './authSemesterContentItem.scss';

export const AuthSemesterContentItem = ({
  lecture,
  idx,
}) => {
  // const { _id, lectureCode, lectureName, professor, lectureTimes } = lecture;

  return (
    <div>
      <div className='auth-semester-content-item'>
        <div className='p4 auth-semester-content-column' style={{width: '10%'}}>{idx}</div>
        <div className='p4 auth-semester-content-column' style={{width: '15%'}}>{lecture.lectureCode}</div>
        <div className='p4 auth-semester-content-column' style={{width: '30%'}}>{lecture.lecture.lectureName}</div>
        <div className='p4 auth-semester-content-column' style={{width: '15%'}}>{lecture.lecture.lectureProfessor}</div>
        <div className='p4 auth-semester-content-column' style={{width: '30%'}}>
          {lecture.lectureTime?.map(time => (
            <div className='auth-semester-content-line' key={`${idx}_${time}`}>{time}</div>
          ))}
        </div>
      </div>
    </div>
    
  );
};