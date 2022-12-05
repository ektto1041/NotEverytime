import React, { useEffect } from "react";
import { useState } from "react";
import { LectureThumbnail } from "../../components/lectureThumbnail/lectureThumbnail";
import { getUserLecturesBySemester } from "../../utils/api";
import "./main.scss";

export const Main = () => {
  const [semester, setSemester] = useState("2022-2"); // 학기 정보
  const [userLectures, setUserLectures] = useState([]);

  useEffect(() => {
    (async () => {
      const lectures = await getUserLecturesBySemester(semester);
      console.dir(lectures.data);
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
            <option value="2022-2">2022-2학기</option>
            <option value="2021-2">2021-2학기</option>
            <option value="2021-1">2021-1학기</option>
          </select>
        </div>
      </div>
      <div className="grid-box">
        {userLectures.map((userLecture) => {
          console.dir(userLecture);
          return (
            <LectureThumbnail
              lectureName={userLecture.lecture.lectureName}
              lectureId={userLecture.lecture._id}
            />
          );
        })}
      </div>
    </div>
  );
};
