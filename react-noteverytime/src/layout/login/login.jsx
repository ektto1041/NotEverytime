import React from "react";
import { useState } from "react";
import "./login.scss";
import "../../styles/variables.scss";
import {
  InputContainer,
  FulledButton,
} from "../../components/globalComponents/globalComponent.jsx";
import { loginApi } from "../../utils/api";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleIdChange = (e) => {
    setId(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = async (e) => {
    const newLoginData = {
      accountId: id,
      password: password,
    };
    try {
      const login = await loginApi(newLoginData);
      navigate("/");
    } catch (err) {
      alert(err.response.data);
    }
  };

  return (
    <div className="login-Container">
      <div className="login-Box">
        <img className="logo" src="/images/Logo.svg" />

        <div className="">
          <InputContainer
            type="text"
            placeholder="아이디"
            value={id}
            onChange={handleIdChange}
          />
          <InputContainer
            type="password"
            placeholder="비밀번호"
            value={password}
            onChange={handlePasswordChange}
          />
          <FulledButton variant="yellow" text="로그인" onClick={handleLogin} />
        </div>
      </div>

      <div className="p3 register-Box">
        계정이 없으신가요?{" "}
        <a className="p3" href="/register">
          회원가입
        </a>
      </div>
    </div>
  );
};
