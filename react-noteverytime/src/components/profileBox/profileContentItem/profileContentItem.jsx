import React from 'react';
import './profileContentItem.scss';
import { InputContainer } from '../../globalComponents/globalComponent';

export const ProfileContentItem = ({
  label,
  value,
  inputValue,
  setInputValue,
}) => {
  return (
    <div className='profile-content-item-container'>
      <div className='p3 profile-content-item-title'>
        {label}
      </div>
      <div className='p3 profile-content-item-value'>
        {
          value ? value : <InputContainer
          type="text"
          placeholder="새 닉네임을 입력해주세요"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          />
        }
      </div>
    </div>
  );
};