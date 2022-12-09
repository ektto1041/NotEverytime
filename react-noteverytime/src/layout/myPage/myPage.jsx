import React, {useState} from 'react';
import { useCallback } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthSemesterBox } from '../../components/authSemesterBox/authSemesterBox';
import { AuthSemesterModal } from '../../components/authSemesterModal/authSemesterModal';
import { ProfileBox } from '../../components/profileBox/profileBox';
import { Button } from "../../components/globalComponents/globalComponent";
import { MyContent } from '../../components/myContent/myContent';
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
    <div className='myPage-container'>
      <div className="part-box">
        <div className='part-title'>
          <div className="h5">내 프로필</div>
          <Button size="small" text="로그아웃" onClick={handleClickLogout}/>
        </div>
        <ProfileBox user={user} setUser={setUser} />
      </div>

      <div className="part-box">
        <div className="part-title">
          <div className="h5">내가 작성한 콘텐츠</div>
        </div>
        <div className="my-contents-box">
          <MyContent text="내가 작성한 글" link="mypost"/>
          <div className="semester-box"></div>
          <MyContent text="내가 댓글단 글" link="myarticle"/>
        </div>
      </div>

      <div className="part-box">
        <div className='part-title'>
          <div className="h5">인증한 수강 과목 리스트</div>
          <Button size="small" text="수강과목 인증" onClick={handleClickOpenModal}/>
        </div>
        <AuthSemesterBox lecturesBySemester={lecturesBySemester} />
        {isModalOpen ? (<AuthSemesterModal lecturesBySemester={lecturesBySemester} onClose={handleClickCloseModal} />) : (<></>)}
      </div>
    </div>
  );
};