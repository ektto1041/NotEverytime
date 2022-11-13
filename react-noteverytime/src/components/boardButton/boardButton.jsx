import React from 'react';
import './boardButton.scss';

export const BoardButton = ({
  boardId,
  selectedBoardId,
  setBoardId,
  children,
}) => {
  return (
    <button
      className={`board-button ${boardId === selectedBoardId ? 'selected' : ''}`}
      onClick={() => setBoardId(boardId)}
    >{children}</button>
  );
};