import React from 'react';
import { CATEGORIES } from '../../utils/constants';
import './categoryButtonBox.scss';

export const CategoryButtonBox = ({
  selectedCategoryId,
  onCategoryClick,
}) => {
  return (
    <div className='category-button-box-container'>
      {CATEGORIES?.map((category, i) => i === 0 ? (<React.Fragment key={category}></React.Fragment>) : (
        <div className={`${i === selectedCategoryId ? 'selected' : ''}`}>
          <button key={category.name}
          className={`p3 category-button ${i === selectedCategoryId ? 'selected' : ''}`}
          onClick={() => onCategoryClick(i)}
        >{category.name}</button>
        </div>
      ))}
    </div>
  );
};