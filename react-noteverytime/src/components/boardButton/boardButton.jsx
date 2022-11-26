import React from 'react';
import './boardButton.scss';

export const BoardButton = ({
  categoryId,
  selectedCategoryId,
  setSelectedCategoryId,
  children,
}) => {
  return (
    <button
      className={`board-button ${categoryId === selectedCategoryId ? 'selected' : ''}`}
      onClick={() => setSelectedCategoryId(categoryId)}
    >{children}</button>
  );
};