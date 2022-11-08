import React from "react";
import "./classItem.scss";

export const ClassItem = ({ className, previewList }) => {
  return (
    <div className="class-item-container">
      <div className="class-item-name">{className}</div>
      <div className="class-item-preview-list">
        {previewList.map((preview, idx) => (
          <div className="class-item-preview">
            <div className="preview-title">{preview.title}</div>
            <div className="preview-created-at">{preview.createdAt}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
