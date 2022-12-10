import React, { useEffect } from "react";
import { useState } from "react";
import { LectureThumbnail } from "../../components/lectureThumbnail/lectureThumbnail";
import { getUserLectures, getUserLecturesBySemester } from "../../utils/api";
import "./main.scss";
import { Link, useNavigate } from 'react-router-dom';

export const Main = () => {
  const navigate = useNavigate();

  const [semesterList, setSemesterList] = useState([]);
  const [semester, setSemester] = useState("수강 인증 필요"); // 학기 정보
  const [userLectures, setUserLectures] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const lectures = await getUserLectures();

        const semesters = new Set();
        for (const lecture of lectures.data)
          semesters.add(lecture.lectureSemester);

        semesters && setSemesterList(Array.from(semesters));
        semesters && setSemester(Array.from(semesters).slice(-1));
      } catch(err) {
        // 메인에서 발생하는 권한 에러는 경고 없이 로그인 페이지로 이동
        // alert(err.response.data.message);
        navigate('/login');
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const lectures = await getUserLecturesBySemester(semester);

      setUserLectures(lectures.data);
    })();
  }, [semester]);

  const handleSelectSemester = (e) => {
    setSemester(e.target.value);
  };

  return (
    <div className="main-Container">
      <div className="menu">
        <div className="h5 title">인증한 수강 과목 게시판</div>
        <div className="controll-box">
          <select
            className="p3 select-semester"
            value={semester}
            onChange={handleSelectSemester}
          >
            {semesterList.length == 0 ? (
              <option value={semester}>{semester}</option>
            ) : (
              semesterList.map((semester) => {
                return <option value={semester}>{semester} 학기</option>;
              })
            )}
          </select>
        </div>
      </div>
      {userLectures.length == 0 ? (
        <div className="grid-EmptyBox">
          <div className="p2">현재 해당 학기에 인증된 과목이 없습니다.</div>
          <Link className="Link" to="/mypage">
            <div className="grid-certify">
              <div className="h6">수강 인증하기</div>
              <div className="Icon_RightArrow"></div>
            </div>
          </Link>
          
        </div>
      ) : (
        <div className="grid-box">
          {userLectures &&
            userLectures.map((userLecture) => {
              //TODO: 여기서 article 때서 줘 응애
              return (
                <LectureThumbnail
                  lectureName={userLecture.lecture.lectureName}
                  lectureId={userLecture.lecture._id}
                  semester={semester}
                />
              );
            })}
        </div>
      )}
    </div>
  );
};
