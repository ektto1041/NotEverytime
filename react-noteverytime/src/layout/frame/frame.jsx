import React from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import {Header} from '../../components/header/header.jsx';
import { Login } from "../login/login.jsx";
import { Main } from "../main/main.jsx";
import "./frame.scss";

export const Frame = () => {
  const location = useLocation();

  return (
    <>
      {location.pathname !== "/login" ? (<Header />) : (<></>)}
      <Routes>
        <Route path="/" element={<Main />}></Route>
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
};
