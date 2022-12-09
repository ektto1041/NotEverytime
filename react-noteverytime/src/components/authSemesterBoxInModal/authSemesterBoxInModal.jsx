import React from 'react';
import { AuthSemesterContentItem } from '../authSemesterList/authSemesterContentItem/authSemesterContentItem';
import './authSemesterBoxInModal.scss';

export const AuthSemesterBoxInModal = ({
  lectures,
}) => {
  return (
    <div className='auth-semester-box-in-modal-container'>
      <div className='auth-semester-list-in-modal-header'>
        <div className='p4 auth-semester-list-in-modal-header-item' style={{width: '10%'}}>#</div>
        <div className='p4 auth-semester-list-in-modal-header-item' style={{width: '20%'}}>과목코드</div>
        <div className='p4 auth-semester-list-in-modal-header-item' style={{width: '30%'}}>과목명</div>
        <div className='p4 auth-semester-list-in-modal-header-item' style={{width: '25%'}}>교수명</div>
        <div className='p4 auth-semester-list-in-modal-header-item' style={{width: '15%'}}>수업 시간</div>
      </div>
      <div className="semester-box"></div>
      <div className='auth-semester-list-in-modal-content'>
        {lectures?.map((lecture, i) => (
          <AuthSemesterContentItem key={`${lecture.lectureSubjectId}_${i}`}
            lecture={{
              lectureCode: lecture.lectureCode,
              lectureTime: lecture.lectureTime,
              lecture: {
                lectureName: lecture.lectureName,
                lectureProfessor: lecture.lectureProfessor,
              }
            }}
            idx={i}
          />
        ))}
      </div>
    </div>
  );
};