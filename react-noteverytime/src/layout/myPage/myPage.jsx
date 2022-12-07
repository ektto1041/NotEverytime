import React, {useState} from 'react';
import { useCallback } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthSemesterBox } from '../../components/authSemesterBox/authSemesterBox';
import { AuthSemesterModal } from '../../components/authSemesterModal/authSemesterModal';
import { ProfileBox } from '../../components/profileBox/profileBox';
import { getMyPageApi, loginApi, logoutApi } from '../../utils/api';
import './myPage.scss';

export const MyPage = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({});
  const [lecturesBySemester, setLecturesBySemester] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);

  const getUser = useCallback(async () => {
    try {
      // 마이페이지 정보 가져오기
      const response = await getMyPageApi();
      console.log('# 마이페이지 정보');
      console.log(response);

      setUser(response.data.userResult);
      const newLecturesBySemesterObj = {};
      response.data.lectures.forEach(lecture => {
        if(!newLecturesBySemesterObj[lecture.lectureSemester]) newLecturesBySemesterObj[lecture.lectureSemester] = [];
        newLecturesBySemesterObj[lecture.lectureSemester].push(lecture);
      });
      const sortedSemesters = Object.keys(newLecturesBySemesterObj).sort((a, b) => b - a);

      const newLecturesBySemester = [];
      sortedSemesters.forEach(semester => {
        newLecturesBySemester.push({ semester, lectures: newLecturesBySemesterObj[semester] });
      });
      setLecturesBySemester(newLecturesBySemester);
    } catch(err) {
      if(err.response.data === '세션 없음') {
        alert('로그인이 필요한 서비스입니다.');
        navigate('/login');
      } else {
        console.log(err);
      }
    }
  }, []);

  useEffect(() => {
    getUser();
  }, []);

  const handleClickLogout = useCallback(async () => {
    try {
      const response = await logoutApi();

      alert('로그아웃이 완료되었습니다.')

      navigate('/login');
    } catch(err) {
      console.log(err);
    }
  }, []);

  const handleClickOpenModal = useCallback(() => {
    setModalOpen(true);
  }, []);

  const handleClickCloseModal = useCallback(() => {
    setModalOpen(false);
  }, []);

  return (
    <div className='my-page-container'>
      <div className='part-title'>
        내 프로필
        <button className='part-title-button' onClick={handleClickLogout}>로그아웃</button>
      </div>
      <ProfileBox user={user} setUser={setUser} />
      <div className='part-title'>
        인증한 수강 과목 리스트
        <button className='part-title-button' onClick={handleClickOpenModal}>수강과목 인증</button>
      </div>
      <AuthSemesterBox lecturesBySemester={lecturesBySemester} />
      {isModalOpen ? (<AuthSemesterModal lecturesBySemester={lecturesBySemester} onClose={handleClickCloseModal} />) : (<></>)}
      
    </div>
  );
};