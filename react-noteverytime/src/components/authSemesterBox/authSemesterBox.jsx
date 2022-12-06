import React from 'react';
import { AuthSemesterList } from '../authSemesterList/authSemesterList';
import './authSemesterBox.scss';

export const AuthSemesterBox = ({
  lecturesBySemester,
}) => {
  return (
    <div className={`auth-semester-box-container`}>
      {lecturesBySemester?.map((lectureBySemester) => (
        <AuthSemesterList key={`${lectureBySemester.semester}`} lectureBySemester={lectureBySemester} />
      ))}
    </div>
  );
};