import React from 'react';
import { useEffect } from 'react';
import { useCallback } from 'react';
import { useState } from 'react';
import { updateUsernameApi } from '../../utils/api';
import './profileBox.scss';
import { ProfileContentItem } from './profileContentItem/profileContentItem';

export const ProfileBox = ({
  user,
  setUser,
}) => {
  const { accountId, profileImage, email, username } = user;

  const [isUsernameEdit, setUsernameEdit] = useState(false);
  const [inputUsername, setInputUsername] = useState(username);

  const handleEditUsernameClick = useCallback(async () => {
    if(!isUsernameEdit) setUsernameEdit(true);
    else {
      try {
        const response = await updateUsernameApi(inputUsername);
        console.log('# 닉네임 수정');
        console.log(response);

        setUser(response.data);
        setUsernameEdit(false);
      } catch (err) {
        console.log(err);
      }
    }
  }, [isUsernameEdit, inputUsername]);

  return (
    <div className='profile-box-container'>
      <div className='profile-img-box'>
        <div className='profile-img-wrapper'>
          <img src={profileImage} alt="account" width='100%' />
        </div>
        <div className='camera-img-box'>
          <img src="/images/Icon_Camera.svg" alt="camera" />
        </div>
      </div>
      <div className='profile-content'>
        <ProfileContentItem label={'아이디'} value={accountId} />
        <ProfileContentItem label={'이메일'} value={email} />
        <ProfileContentItem label={'비밀번호'} value={'********'} />
        <ProfileContentItem label={'닉네임'} value={isUsernameEdit ? '' : username} inputValue={inputUsername} setInputValue={setInputUsername} />
        <button className='edit-nickname-button' onClick={handleEditUsernameClick}>편집</button>
      </div>
    </div>
  );
};