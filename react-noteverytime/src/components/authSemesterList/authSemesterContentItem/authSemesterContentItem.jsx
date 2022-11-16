import React from 'react';
import './authSemesterContentItem.scss';

export const AuthSemesterContentItem = ({
  lecture,
}) => {
  const { _id, lectureCode, lectureName, professor, lectureTimes } = lecture;

  return (
    <div className='auth-semester-content-item'>
      <div className='auth-semester-content-column' style={{width: '10%'}}>{_id}</div>
      <div className='auth-semester-content-column' style={{width: '15%'}}>{lectureCode}</div>
      <div className='auth-semester-content-column' style={{width: '30%'}}>{lectureName}</div>
      <div className='auth-semester-content-column' style={{width: '15%'}}>{professor}</div>
      <div className='auth-semester-content-column' style={{width: '30%'}}>{lectureTimes?.join("\n")}</div>
    </div>
  );
};