import React from 'react';
import { useState } from 'react';
import { useCallback } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { authenticateLectureApi, getMyPageApi, updateAuthenticatedLectureApi } from '../../utils/api';
import { AuthSemesterBoxInModal } from '../authSemesterBoxInModal/authSemesterBoxInModal';
import './authSemesterModal.scss';

export const AuthSemesterModal = ({
  onClose,
}) => {
  const navigate = useNavigate();

  const [lectures, setLectures] = useState([]);
  const [lecturesBySemester, setLecturesBySemester] = useState({});
  const [semester, setSemester] = useState('');

  const authenticateLectures = useCallback(async () => {
    try {
      const response = await authenticateLectureApi();
      console.log('# 학교에서 넘어온 수강 과목들');
      console.log(response);

      setLectures(response.data);

      const newLecturesBySemesterObj = {};
      response.data.forEach(lecture => {
        if(!newLecturesBySemesterObj[lecture.lectureSemester]) newLecturesBySemesterObj[lecture.lectureSemester] = [];
        newLecturesBySemesterObj[lecture.lectureSemester].push(lecture);
      });
      const sortedSemesters = Object.keys(newLecturesBySemesterObj).sort();
  
      setLecturesBySemester(newLecturesBySemesterObj);
      setSemester(sortedSemesters[sortedSemesters.length - 1]);
    } catch(err) {
      console.log(err);
    }
  }, []);

  // 스크롤 금지 & 스크롤 금지 해제
  useEffect(() => {
    document.querySelector('body').classList.add(['scroll-hidden']);

    return () => {
      document.querySelector('body').classList.remove(['scroll-hidden']);
    }
  }, []);

  // 수강 인증
  useEffect(() => {
    authenticateLectures();
  }, []);

  // 수강 인증하기 버튼 클릭 시,
  const handleAuthenticateClick = useCallback(async () => {
    try {
      const response = await updateAuthenticatedLectureApi(lectures);
      console.log("# 모달에서 수강 인증하기 누른 결과");
      console.log(response);

      navigate(0);
    } catch(err) {
      alert(err.response.data);
    }
  }, [lectures]);

  return (
    <div className='auth-semester-modal-background' onClick={onClose}>
      <div className='auth-semester-modal-container' onClick={(e) => e.stopPropagation()}>
        <div className='auth-semester-modal-title'>
          수강 인증
          <div className='auth-semester-modal-cancel-button' onClick={onClose} />
        </div>
        <div className='auth-semester-modal-body'>
          <div className='auth-semester-modal-select-box'>
            <select className='auth-semester-modal-select' value={semester} onChange={(e) => setSemester(e.target.value)}>
              {Array.from(Object.keys(lecturesBySemester))?.map(semester => (
                <option key={semester} value={semester}>{semester}학기</option>
              ))}
            </select>
          </div>
          <AuthSemesterBoxInModal lectures={lecturesBySemester[semester]} />
          <div className='auth-semester-modal-button-box'>
            <button className='auth-semester-modal-cancel-button' onClick={onClose}>취소</button>
            <button className='auth-semester-modal-submit-button' onClick={handleAuthenticateClick} >수강 인증하기</button>
          </div>
        </div>
      </div>
    </div>
  );
};