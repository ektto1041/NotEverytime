import React from 'react';
import { CATEGORIES } from '../../utils/constants';
import './categoryButtonBox.scss';

export const CategoryButtonBox = ({
  selectedCategoryId,
  setSelectedCategoryId,
}) => {
  return (
    <div className='category-button-box-container'>
      {CATEGORIES?.map((category, i) => i === 0 ? (<></>) : (
        <button
          className={`category-button ${i === selectedCategoryId ? 'selected' : ''}`}
          onClick={() => setSelectedCategoryId(i)}
        >{category}</button>
      ))}
    </div>
  );
};