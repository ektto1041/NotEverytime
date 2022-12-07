import React from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { Header } from "../../components/header/header.jsx";
import { Article } from "../article/article.jsx";
import { Lecture } from "../lecture/lecture.jsx";
import LectureResult from "../lectureResult/lectureResult.jsx";
import { Login } from "../login/login.jsx";
import { Main } from "../main/main.jsx";
import { MyPage } from "../myPage/myPage.jsx";
import { Post } from "../post/post.jsx";
import { Register } from "../register/register.jsx";
import "./frame.scss";

export const Frame = () => {
  const location = useLocation();

  return (
    <>
      {!(
        location.pathname.includes("/login") ||
        location.pathname.includes("/register")
      ) && <Header />}
      <Routes>
        <Route path="/" element={<Main />}></Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/lecture/:lectureId" element={<Lecture />} />
        <Route path="/post" element={<Post />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/article/:articleID" element={<Article />} />
        <Route path="/search" element={<LectureResult />} />
      </Routes>
    </>
  );
};
