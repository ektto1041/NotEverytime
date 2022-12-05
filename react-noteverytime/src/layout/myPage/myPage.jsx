import React, {useState} from 'react';
import { useEffect } from 'react';
import { AuthSemesterBox } from '../../components/authSemesterBox/authSemesterBox';
import { ProfileBox } from '../../components/profileBox/profileBox';
import { DUMMY } from '../../utils/constants';
import './myPage.scss';

export const MyPage = () => {
  const [user, setUser] = useState({});

  useEffect(() => {
    // TODO GET API

  }, []);

  return (
    <div className='my-page-container'>
      <div className='part-title'>내 프로필</div>
      <ProfileBox user={user} />
      <div className='part-title'>
        인증한 수강 과목 리스트
        <button className='authenticate-button'>수강과목 인증</button>
      </div>
      <AuthSemesterBox semesters={user.semesters} />
    </div>
  );
};