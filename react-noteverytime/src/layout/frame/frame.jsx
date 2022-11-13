import React from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { Header } from "../../components/header/header.jsx";
import { Lecture } from "../lecture/lecture.jsx";
import { Login } from "../login/login.jsx";
import { Main } from "../main/main.jsx";
import { Register } from "../register/register.jsx";
import "./frame.scss";

export const Frame = () => {
  const location = useLocation();

  return (
    <>
      {location.pathname == "/" || location.pathname.includes("/lecture") ? <Header /> : <></>}
      <Routes>
        <Route path="/" element={<Main />}></Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/lecture/:lectureId" element={<Lecture />} />
      </Routes>
    </>
  );
};