import React from 'react';
import { useState } from 'react';
import { ClassItem } from '../../components/classItem/classItem';
import "./main.scss";

export const Main = () => {
  const [semester, setSemester] = useState("2022-2"); // 학기 정보

  // 학기 선택 Select 변경 이벤트
  const handleSelectSemester = (e) => {
    setSemester(e.target.value);
  };

  return (
    <div className='container'>
      <div className='menu'>
        <div className='title'>
          인증한 과목 커뮤니티
        </div>
        <div className='controll-box'>
          <button className='certify-semester-button'>
            수강학기 인증
          </button>
          <select className='select-semester' value={semester} onChange={handleSelectSemester}>
            <option value="2022-2">2022-2학기</option>
            <option value="2022-3">2022-3학기</option>
            <option value="2022-4">2022-4학기</option>
          </select>
        </div>
      </div>
      <div className='grid-box'>
        <ClassItem className="인공지능" previewList={[
          { title: "해야할 것 모음집(22-2) 개강하면서 생각해...", createdAt: '10-16' },
          { title: "해야할 것 모음집(22-2) 개강하면서 생각해...", createdAt: '10-16' },
          { title: "해야할 것 모음집(22-2) 개강하면서 생각해...", createdAt: '10-16' },
          { title: "해야할 것 모음집(22-2) 개강하면서 생각해...", createdAt: '10-16' },
        ]} />
        <ClassItem className="인공지능" previewList={[
          { title: "해야할 것 모음집(22-2) 개강하면서 생각해...", createdAt: '10-16' },
          { title: "해야할 것 모음집(22-2) 개강하면서 생각해...", createdAt: '10-16' },
          { title: "해야할 것 모음집(22-2) 개강하면서 생각해...", createdAt: '10-16' },
          { title: "해야할 것 모음집(22-2) 개강하면서 생각해...", createdAt: '10-16' },
        ]} />
        <ClassItem className="인공지능" previewList={[
          { title: "해야할 것 모음집(22-2) 개강하면서 생각해...", createdAt: '10-16' },
          { title: "해야할 것 모음집(22-2) 개강하면서 생각해...", createdAt: '10-16' },
          { title: "해야할 것 모음집(22-2) 개강하면서 생각해...", createdAt: '10-16' },
          { title: "해야할 것 모음집(22-2) 개강하면서 생각해...", createdAt: '10-16' },
        ]} />
        <ClassItem className="인공지능" previewList={[
          { title: "해야할 것 모음집(22-2) 개강하면서 생각해...", createdAt: '10-16' },
          { title: "해야할 것 모음집(22-2) 개강하면서 생각해...", createdAt: '10-16' },
          { title: "해야할 것 모음집(22-2) 개강하면서 생각해...", createdAt: '10-16' },
          { title: "해야할 것 모음집(22-2) 개강하면서 생각해...", createdAt: '10-16' },
        ]} />
        <ClassItem className="인공지능" previewList={[
          { title: "해야할 것 모음집(22-2) 개강하면서 생각해...", createdAt: '10-16' },
          { title: "해야할 것 모음집(22-2) 개강하면서 생각해...", createdAt: '10-16' },
          { title: "해야할 것 모음집(22-2) 개강하면서 생각해...", createdAt: '10-16' },
          { title: "해야할 것 모음집(22-2) 개강하면서 생각해...", createdAt: '10-16' },
        ]} />
        <ClassItem className="인공지능" previewList={[
          { title: "해야할 것 모음집(22-2) 개강하면서 생각해...", createdAt: '10-16' },
          { title: "해야할 것 모음집(22-2) 개강하면서 생각해...", createdAt: '10-16' },
          { title: "해야할 것 모음집(22-2) 개강하면서 생각해...", createdAt: '10-16' },
          { title: "해야할 것 모음집(22-2) 개강하면서 생각해...", createdAt: '10-16' },
        ]} />
      </div>
    </div>
  )
}