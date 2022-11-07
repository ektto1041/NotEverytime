import React from 'react';
import './login.scss';

export const Login = () => {
  return (
    <div className='login-container'>
      <div className='wrapper'>
        <div className='login-box'>
          <div className='logo'>
            NotEverytime
          </div>
          <input className='input' type="text" placeholder='이메일' />
          <input className='input' type="password" placeholder='비밀번호' />
          <button className='login-button'>login</button>
        </div>
        <div className='tip-box'>
          계정이 없으신가요? <a href='https://www.naver.com'>회원가입</a>
        </div>
      </div>
    </div>
  );
};