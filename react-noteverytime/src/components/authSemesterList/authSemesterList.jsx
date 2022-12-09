import React from 'react';
import { AuthSemesterContentItem } from './authSemesterContentItem/authSemesterContentItem';
import './authSemesterList.scss';

export const AuthSemesterList = ({
  lectureBySemester,
}) => {
  const {semester, lectures} = lectureBySemester;

  return (
    <div className='auth-semester-list-container'>
      <div className='h6 auth-semester-title'>
        {semester}학기
      </div>
      <div className='auth-semester-header'>
        <div className='p4 auth-semester-header-item' style={{width: '10%'}}>#</div>
        <div className='p4 auth-semester-header-item' style={{width: '20%'}}>과목코드</div>
        <div className='p4 auth-semester-header-item' style={{width: '30%'}}>과목명</div>
        <div className='p4 auth-semester-header-item' style={{width: '25%'}}>교수명</div>
        <div className='p4 auth-semester-header-item' style={{width: '15%'}}>수업 시간</div>
      </div>
      <div className="semester-box"></div>
      <div className='auth-semester-content'>
        {lectures?.map((lecture, i) => (
          <AuthSemesterContentItem key={lecture._id} lecture={lecture} idx={i} />
        ))}
      </div>
    </div>
  );
};