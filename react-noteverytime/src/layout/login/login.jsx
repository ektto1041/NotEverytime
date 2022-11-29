import React from "react";
import { useState } from "react";
import "./login.scss";
import "../../styles/variables.scss"
import { InputContainer, FulledButton } from "../../components/globalComponents/globalComponent.jsx";

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
    <div className="login-Container">
      <div className="login-Box">
        <img className="logo" src="/images/Logo.svg"/>

        <div className="">
          <InputContainer
            type="text"
            placeholder="이메일"
            value={email}
            onChange={handleEmailChange}
          />
          <InputContainer
            type="password"
            placeholder="비밀번호"
            value={password}
            onChange={handlePasswordChange}
          />
          <FulledButton variant="yellow" text="로그인" />
        </div>
      </div>

      <div className="p3 register-Box">
        계정이 없으신가요? <a className="p3" href="/register">회원가입</a>
      </div>
    </div>
  );
};
