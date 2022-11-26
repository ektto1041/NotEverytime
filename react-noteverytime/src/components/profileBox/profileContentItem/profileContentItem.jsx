import React from 'react';
import './profileContentItem.scss';

export const ProfileContentItem = ({
  label,
  value,
}) => {
  return (
    <div className='profile-content-item-container'>
      <div className='profile-content-item-title'>
        {label}
      </div>
      <div className='profile-content-item-value'>
        {value}
      </div>
    </div>
  );
};