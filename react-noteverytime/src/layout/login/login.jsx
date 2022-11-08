import React from "react";
import { useState } from "react";
import "./login.scss";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // email 변경 이벤트
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  // password 변경 이벤트
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  return (
    <div className="login-container">
      <div className="wrapper">
        <div className="login-box">
          <div className="logo">NotEverytimex</div>
          <input
            className="input"
            type="text"
            placeholder="이메일"
            value={email}
            onChange={handleEmailChange}
          />
          <input
            className="input"
            type="password"
            placeholder="비밀번호"
            value={password}
            onChange={handlePasswordChange}
          />
          <button className="login-button">login</button>
        </div>
        <div className="tip-box">
          계정이 없으신가요? <a href="https://www.naver.com">회원가입</a>
        </div>
      </div>
    </div>
  );
};
