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
            <option value="2022-1">2022-1학기</option>
            <option value="2021-2">2021-2학기</option>
            <option value="2021-1">2021-1학기</option>
            <option value="2020-2">2020-2학기</option>
            <option value="2020-1">2020-1학기</option>
          </select>
        </div>
      </div>
      {userLectures.length === 0 ? (
        <div className="grid-EmptyBox">
          <div className="p2">현재 해당 학기에 인증된 과목이 없습니다.</div>
          <div className="grid-certify">
            <div className="h6">수강 인증하기</div>
            <div className="Icon_RightArrow"></div>
          </div>
        </div>
      ) : (
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
    )}
    </div>
  );
};
