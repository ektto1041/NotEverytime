import React from 'react';
import { useState } from 'react';
import './profileBox.scss';
import { ProfileContentItem } from './profileContentItem/profileContentItem';

export const ProfileBox = ({
  user,
}) => {
  const { id, email, nickname } = user;

  return (
    <div className='profile-box-container'>
      <div className='profile-img-box'>
        <img src="/images/account-circle.svg" alt="account" />
        <div className='camera-img-box'>
          <img src="/images/Icon_Camera.svg" alt="camera" />
        </div>
      </div>
      <div className='profile-content'>
        <ProfileContentItem label={'아이디'} value={id} />
        <ProfileContentItem label={'이메일'} value={email} />
        <ProfileContentItem label={'비밀번호'} value={'********'} />
        <ProfileContentItem label={'닉네임'} value={nickname} />
        <button className='edit-nickname-button'>편집</button>
      </div>
    </div>
  );
};