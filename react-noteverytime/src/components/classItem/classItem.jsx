import React from "react";
import "./classItem.scss";
import "../../styles/fontStyle.scss"

export const ClassItem = ({ className, previewList }) => {
  return (
    <div className="class-item-container">

      <div className='class-item-title'>
        <div className="h6">{className}</div>
        <div className='Icon_RightArrow'></div>
      </div>

      <div className='semester-box'></div>
      
      <div className="class-item-preview-list">
        {previewList.map((preview, idx) => (
          <div className="class-item-preview">
            <div className="p4">{preview.title}</div>
            <div className="p4">{preview.createdAt}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
