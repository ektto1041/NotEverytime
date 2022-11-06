import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {Header} from '../../components/header/header.jsx';
import { Main } from "../main/main.jsx";
import "./frame.scss";

export const Frame = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Main />}></Route>
      </Routes>
    </>
  );
};
