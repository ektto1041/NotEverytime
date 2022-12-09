import React from 'react';
import { AuthSemesterList } from '../authSemesterList/authSemesterList';
import './authSemesterBox.scss';

export const AuthSemesterBox = ({
  lecturesBySemester,
}) => {
  return (
    <div className={`auth-semester-box-container`}>
      {lecturesBySemester.length > 0
      ? lecturesBySemester?.map((lectureBySemester) => (
        <AuthSemesterList key={`${lectureBySemester.semester}`} lectureBySemester={lectureBySemester} />
      ))
      : <div className="h6">현재 인증된 수강 과목이 없습니다.</div>
      }
    </div>
  );
};