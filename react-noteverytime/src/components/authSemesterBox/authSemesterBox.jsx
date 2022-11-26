import React from 'react';
import { AuthSemesterList } from '../authSemesterList/authSemesterList';
import './authSemesterBox.scss';

export const AuthSemesterBox = ({
  semesters,
}) => {
  return (
    <div className='auth-semester-box-container'>
      {semesters?.map(semester => (
        <AuthSemesterList key={semester.name} semester={semester} />
      ))}
    </div>
  );
};