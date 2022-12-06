import React from "react";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import "./register.scss";
import { registerUser } from "../../utils/api";
import { Button, InputContainer } from "../../components/globalComponents/globalComponent";

export const Register = () => {
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const navigate = useNavigate();

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

  const handleCancel = () => {
    navigate("/login")
  }

  const handleRegister = async () => {
    const newUser = {
      accountId: id,
      password: password,
      username: name,
      email: email,
    };
    try {
      await registerUser(newUser);
      setName("");
      setId("");
      setEmail("");
      setPassword("");
      setPasswordConfirm("");
    } catch (err) {
      switch (err.response.data) {
        case "please input username":
          alert("닉네임을 입력하세요");
          break;
        case "please input id":
          alert("id를 입력하세요");
          break;
        case "please input email":
          alert("email을 입력하세요");
          break;
        case "id already exists":
          alert("이미 존재하는 아이디입니다.");
          break;
        case "username already exists":
          alert("이미 존재하는 닉네임입니다.");
          break;
        case "email already exists":
          alert("이미 존재하는 이메일입니다.");
          break;
      }
      console.log(err.response.data);
    }
  };

  return (
    <div className="register-Container">
      <div className="register-Box">
        <div className="h3">회원가입</div>
        <div className="semester-box"></div>
        <div className="register-inputBox">
          <InputContainer
            label="아이디"
            type="text"
            placeholder="아이디 입력"
            value={id}
            onChange={handleIdChange}
          />
          <InputContainer
            label="이메일"
            type="email"
            placeholder="이메일 입력"
            value={email}
            onChange={handleEmailChange}
          />
          <InputContainer
            label="비밀번호"
            type="password"
            placeholder="비밀번호 입력"
            value={password}
            onChange={handlePasswordChange}
          />
          <InputContainer
            label="비밀번호 확인"
            type="password"
            placeholder="비밀번호 재입력"
            value={passwordConfirm}
            onChange={handlePasswordConfirmChange}
          />
          <InputContainer
            label="닉네임"
            type="text"
            placeholder="닉네임 입력"
            value={name}
            onChange={handleNameChange}
          />
        </div>
        <div className="resgiter-buttonBox">
          <Button size="full" text="회원가입" onClick={handleRegister}/>
          <Button color="grey" size="full" text="취소" onClick={handleCancel}/>
        </div>
      </div>
    </div>
  );
};