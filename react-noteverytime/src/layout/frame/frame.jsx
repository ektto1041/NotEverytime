import React from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { Header } from "../../components/header/header.jsx";
import { Lecture } from "../lecture/lecture.jsx";
import { Login } from "../login/login.jsx";
import { Main } from "../main/main.jsx";
import { Post } from "../post/post.jsx";
import { Register } from "../register/register.jsx";
import "./frame.scss";

export const Frame = () => {
  const location = useLocation();

  return (
    <>
<<<<<<< HEAD
      {location.pathname == "/" || location.pathname.includes("/lecture") ? <Header /> : <></>}
=======
      {!(
        location.pathname.includes("/login") ||
        location.pathname.includes("/register")
      ) && <Header />}
>>>>>>> b0cd112 (fix: Fix head to reveal)
      <Routes>
        <Route path="/" element={<Main />}></Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
<<<<<<< HEAD
        <Route path="/lecture/:lectureId" element={<Lecture />} />
=======
        <Route path="/class/:classId" element={<Class />} />
        <Route path="/post" element={<Post />} />
>>>>>>> b0cd112 (fix: Fix head to reveal)
      </Routes>
    </>
  );
};
