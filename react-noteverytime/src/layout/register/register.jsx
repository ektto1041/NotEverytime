import React from "react";
import { useState } from "react";
import "./register.scss";

export const Register = () => {
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const handleNameChange = (e) => {
    setName(e.target.value);
  };
  const handleIdChange = (e) => {
    setId(e.target.value);
  };
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const handlePasswordConfirmChange = (e) => {
    setPasswordConfirm(e.target.value);
  };

  return (
    <div className="register-container">
      <div className="wrapper">
        <h1 className="title">회원가입</h1>
        <div className="separator" />
        <div className="input-container">
          <p className="label">닉네임</p>
          <input
            className="input"
            type="text"
            placeholder="닉네임 입력"
            value={name}
            onChange={handleNameChange}
          />
        </div>
        <div className="input-container">
          <p className="label">아이디</p>
          <input
            className="input"
            type="text"
            placeholder="아이디 입력"
            value={id}
            onChange={handleIdChange}
          />
        </div>
        <div className="input-container">
          <p className="label">이메일</p>
          <input
            className="input"
            type="email"
            placeholder="이메일 입력"
            value={email}
            onChange={handleEmailChange}
          />
        </div>
        <div className="input-container">
          <p className="label">비밀번호</p>
          <input
            className="input"
            type="password"
            placeholder="비밀번호 입력"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <div className="input-container">
          <p className="label">비밀번호 확인</p>
          <input
            className="input"
            type="password"
            placeholder="비밀번호 재입력"
            value={passwordConfirm}
            onChange={handlePasswordConfirmChange}
          />
        </div>
        <button className="register-button">회원가입</button>
        <button className="cancle-button">취소</button>
      </div>
    </div>
  );
};
