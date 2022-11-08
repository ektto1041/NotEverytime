import React from "react";
import "./post_card.scss";

export const PostCard = () => {
  return (
    <div className="post-card">
      <div className="top">
        <h2 className="lecture-name">웹 시스템 설계</h2>
        {/* to-do : anchor to lecture */}
      </div>
      <div className="separator" />
      <ul className="post-list">
        <li className="post-preview">
          <p className="post-preview-title">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias
            facilis culpa libero sunt nesciunt excepturi, amet cum iure vitae.
            Laudantium suscipit autem nemo cupiditate recusandae quam debitis
            aliquam nulla consectetur!
          </p>
          <p className="post-preview-date">10-16</p>
        </li>
        <li className="post-preview">
          <p className="post-preview-title">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias
            facilis culpa libero sunt nesciunt excepturi, amet cum iure vitae.
            Laudantium suscipit autem nemo cupiditate recusandae quam debitis
            aliquam nulla consectetur!
          </p>
          <p className="post-preview-date">10-16</p>
        </li>
        <li className="post-preview">
          <p className="post-preview-title">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias
            facilis culpa libero sunt nesciunt excepturi, amet cum iure vitae.
            Laudantium suscipit autem nemo cupiditate recusandae quam debitis
            aliquam nulla consectetur!
          </p>
          <p className="post-preview-date">10-16</p>
        </li>
        <li className="post-preview">
          <p className="post-preview-title">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias
            facilis culpa libero sunt nesciunt excepturi, amet cum iure vitae.
            Laudantium suscipit autem nemo cupiditate recusandae quam debitis
            aliquam nulla consectetur!
          </p>
          <p className="post-preview-date">10-16</p>
        </li>
      </ul>
    </div>
  );
};
