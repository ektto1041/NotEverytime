import React from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { Header } from "../../components/header/header.jsx";
import { Class } from "../class/class.jsx";
import { Login } from "../login/login.jsx";
import { Main } from "../main/main.jsx";
import { Register } from "../register/register.jsx";
import "./frame.scss";

export const Frame = () => {
  const location = useLocation();

  return (
    <>
      {location.pathname == "/" || location.pathname.includes("/class") ? <Header /> : <></>}
      <Routes>
        <Route path="/" element={<Main />}></Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/class/:classId" element={<Class />} />
      </Routes>
    </>
  );
};
