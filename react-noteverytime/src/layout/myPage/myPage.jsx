import React, {useState} from 'react';
import { useCallback } from 'react';
import { useEffect } from 'react';
import { AuthSemesterBox } from '../../components/authSemesterBox/authSemesterBox';
import { AuthSemesterModal } from '../../components/authSemesterModal/authSemesterModal';
import { ProfileBox } from '../../components/profileBox/profileBox';
import { getMyPageApi, loginApi } from '../../utils/api';
import './myPage.scss';

export const MyPage = () => {
  const [user, setUser] = useState({});
  const [lecturesBySemester, setLecturesBySemester] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);

  const getUser = useCallback(async () => {
    // TODO 임시 로그인
    const login = await loginApi({ accountId: "mcodnjs", password: "aaaa" });
    console.log('# 로그인 결과');
    console.log(login);

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
      // newLecturesBySemester.push({ semester, lectures: newLecturesBySemesterObj[semester] });
      // newLecturesBySemester.push({ semester, lectures: newLecturesBySemesterObj[semester] });
    });
    setLecturesBySemester(newLecturesBySemester);
  }, []);

  useEffect(() => {
    getUser();
  }, []);

  const handleOpenModalClick = useCallback(() => {
    setModalOpen(true);
  }, []);

  const handleCloseModalClick = useCallback(() => {
    setModalOpen(false);
  }, []);

  return (
    <div className='my-page-container'>
      <div className='part-title'>내 프로필</div>
      <ProfileBox user={user} setUser={setUser} />
      <div className='part-title'>
        인증한 수강 과목 리스트
        <button className='authenticate-button' onClick={handleOpenModalClick}>수강과목 인증</button>
      </div>
      <AuthSemesterBox lecturesBySemester={lecturesBySemester} />
      {isModalOpen ? (<AuthSemesterModal lecturesBySemester={lecturesBySemester} onClose={handleCloseModalClick} />) : (<></>)}
      
    </div>
  );
};