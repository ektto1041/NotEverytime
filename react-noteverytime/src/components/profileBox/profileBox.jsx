import React from 'react';
import { useEffect } from 'react';
import { useCallback } from 'react';
import { useState } from 'react';
import { updateProfileImageApi, updateUsernameApi } from '../../utils/api';
import './profileBox.scss';
import { ProfileContentItem } from './profileContentItem/profileContentItem';

export const ProfileBox = ({
  user,
  setUser,
}) => {
  const { accountId, profileImage, email, username } = user;

  const [isUsernameEdit, setUsernameEdit] = useState(false);
  const [inputUsername, setInputUsername] = useState(username);
  const [uploadImage, setUploadImage] = useState('');

  const handleProfileImageChange = useCallback(async (e) => {
    const formData = new FormData();
    formData.append('image', e.target.files[0]);

    const response = await updateProfileImageApi(formData);
    console.log(response);

  }, []);

  /**
   * 닉네임 편집을 눌렀을 때,
   * edit 모드가 아닐 때 -> input 이 보여지게 함
   * edit 모드일 때 -> 닉네임 수정 api 호출
   */
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
          <label htmlFor='photo'>
            <img src="/images/Icon_Camera.svg" alt="camera" />
          </label>
          <input
            type="file"
            id="photo"
            accept="image/*"
            onChange={handleProfileImageChange}
          />
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