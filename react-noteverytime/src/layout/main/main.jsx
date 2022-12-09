import React, { useEffect } from "react";
import { useState } from "react";
import { LectureThumbnail } from "../../components/lectureThumbnail/lectureThumbnail";
import { getUserLectures, getUserLecturesBySemester } from "../../utils/api";
import "./main.scss";

export const Main = () => {
  const [semesterList, setSemesterList] = useState([]);
  const [semester, setSemester] = useState("수강 인증 필요"); // 학기 정보
  const [userLectures, setUserLectures] = useState([]);

  useEffect(() => {
    (async () => {
      const lectures = await getUserLectures();
      console.log(lectures);
      const semesters = new Set();
      for (const lecture of lectures.data)
        semesters.add(lecture.lectureSemester);
      console.log(semesters);
      semesters && setSemesterList(Array.from(semesters));
      semesters && setSemester(Array.from(semesters).slice(-1));
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const lectures = await getUserLecturesBySemester(semester);
      setUserLectures(lectures.data);
      console.log(lectures.data);
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
          <div className="grid-certify">
            <div className="h6">수강 인증하기</div>
            <div className="Icon_RightArrow"></div>
          </div>
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
