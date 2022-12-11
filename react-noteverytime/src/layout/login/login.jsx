import React from "react";
import { useState, useEffect } from "react";
import "./login.scss";
import {
  InputContainer,
  Button,
} from "../../components/globalComponents/globalComponent.jsx";
import { loginApi, getLogin } from "../../utils/api";
import { useNavigate } from "react-router-dom";
import { toast } from "material-react-toastify";

export const Login = () => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const isLogin = await getLogin();
      if (isLogin.data.isLoggedIn) {
        alert("이미 로그인된 상태입니다. 로그아웃을 진행하고 로그인해주세요");
        navigate(-1);
      }
    })();
  }, []);

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
      console.dir(err);
      toast.error(err.response.data.message);
      // alert(err.response.data.message);
    }
  };

  return (
    <div className="login-Container">
      <div className="login-Box">
        <img className="logo" src="/images/Logo.svg" />

        <div className="input-Box">
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
        </div>
        <Button color="" size="full" text="로그인" onClick={handleLogin} />
      </div>

      <div className="p3 login-registerBox">
        계정이 없으신가요?
        <a className="p3" href="/register">
          회원가입
        </a>
      </div>
    </div>
  );
};
