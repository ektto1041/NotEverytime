import React from 'react';
import { CATEGORIES } from '../../utils/constants';
import './boardButton.scss';

export const BoardButton = ({
  categoryId,
  selectedCategoryId,
  setSelectedCategoryId,
  children,
}) => {
  return (
    <>
      {CATEGORIES?.map((category, i) => i === 0 ? (<></>) : (
        <button
          className={`category-button ${categoryId === selectedCategoryId ? 'selected' : ''}`}
          onClick={() => setSelectedCategoryId(categoryId)}
        >category</button>
      ))}
    </>
    
  );
};