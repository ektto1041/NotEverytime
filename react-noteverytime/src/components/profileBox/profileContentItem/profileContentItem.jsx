import React from 'react';
import './profileContentItem.scss';

export const ProfileContentItem = ({
  label,
  value,
  inputValue,
  setInputValue,
}) => {
  return (
    <div className='profile-content-item-container'>
      <div className='profile-content-item-title'>
        {label}
      </div>
      <div className='profile-content-item-value'>
        {value ? value : <input type='text' value={inputValue} onChange={(e) => setInputValue(e.target.value)} />}
      </div>
    </div>
  );
};