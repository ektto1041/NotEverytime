import React, { useState } from "react";
import "./post.scss";

export const Post = () => {
  const [category, setCategory] = useState("");

  const handleSelectCategory = (e) => {
    setCategory(e.target.value);
  };

  return (
    <div className="post-container">
      <div className="top">
        <div className="logo">글 작성</div>
        <button className="post-button">글 작성하기</button>
      </div>
      <div className="meta">
        <select
          className="select-category"
          value={category}
          onChange={handleSelectCategory}
        >
          <option value="free">자유게시판</option>
          <option value="tip">선배의 팁 게시판</option>
          <option value="qna">과제 Q&A 게시판</option>
          <option value="recruit">팀원 모집 게시판</option>
        </select>
        <div className="title-bar">
          <input type="text" placeholder="제목을 입력해주세요"></input>
        </div>
        <div className="anonymous">
          <input type="checkbox" name="익명" id="" />
          익명
        </div>
      </div>
      <textarea
        className="content"
        placeholder="내용을 입력해주세요"
      ></textarea>
      <div className="photo-container">
        <button className="photo-add">사진 추가</button>
      </div>
    </div>
  );
};
