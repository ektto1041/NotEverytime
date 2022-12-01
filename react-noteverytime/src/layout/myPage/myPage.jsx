import React, {useState} from 'react';
import { useCallback } from 'react';
import { useEffect } from 'react';
import { AuthSemesterBox } from '../../components/authSemesterBox/authSemesterBox';
import { ProfileBox } from '../../components/profileBox/profileBox';
import { getMyPageApi, loginApi } from '../../utils/api';
import { DUMMY } from '../../utils/constants';
import './myPage.scss';

export const MyPage = () => {
  const [user, setUser] = useState({});

  const getUser = useCallback(async () => {
    // TODO 임시 로그인
    const login = await loginApi({ accountId: "mcodnjs", password: "aaaa" });
    console.log('# 로그인 결과');
    console.log(login);

    // 마이페이지 정보 가져오기
    const response = await getMyPageApi();
    console.log('# 마이페이지 정보');
    console.log(response);

    setUser(response.data);
  }, []);

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div className='my-page-container'>
      <div className='part-title'>내 프로필</div>
      <ProfileBox user={user} setUser={setUser} />
      <div className='part-title'>
        인증한 수강 과목 리스트
        <button className='authenticate-button'>수강과목 인증</button>
      </div>
      <AuthSemesterBox semesters={user.semesters} />
    </div>
  );
};