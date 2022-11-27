import React from "react";
import { Reply } from "../../components/reply/reply";
import { ReplyInput } from "../../components/replyInput/replyInput";
import "./article.scss";

export const Article = () => {
  return (
    <div className="article-container">
      <div className="article-top">
        <div className="writer">
          <img src="/images/account-circle.svg" alt="account" />
          <div className="writer-meta">
            <div className="writer-name">익명</div>
            <div className="writer-semester">2022-2학기 수강생</div>
          </div>
        </div>
        <div className="category">자유게시판</div>
      </div>
      <div className="meta">
        <div className="title-bar">
          <div>제목입니다.</div>
        </div>
      </div>
      <div className="content">
        <div className="text-container">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint
          perspiciatis pariatur officia consequatur neque suscipit minus? Optio
          reprehenderit, ex alias saepe quidem corrupti obcaecati nisi,
          molestiae natus necessitatibus assumenda facere!
        </div>
        <div className="photo-container">
          <img src="/data/images/test.jpg" alt="article" className="photo" />
          <img src="/data/images/test.jpg" alt="article" className="photo" />
          <img src="/data/images/test.jpg" alt="article" className="photo" />
        </div>
        <div className="status-container">
          <div className="item-container">
            <div className="item icon-thumbs">
              <img src="/images/item-icon_Thumb.svg" alt="thumb" />
              <div>3</div>
            </div>
            <div className="item icon-reply">
              <img src="/images/item-icon_Reply.svg" alt="reply" />
              <div>3</div>
            </div>
            <div className="item icon-image">
              <img src="/images/item-icon_Image.svg" alt="icon" />
              <div>3</div>
            </div>
          </div>
          <div className="date">22.11.11 23:30</div>
        </div>
      </div>
      <div className="reply-section">
        <h1 className="top">댓글</h1>
        <div className="reply-container">
          <Reply />
          <Reply />
        </div>
      </div>
      <ReplyInput />
    </div>
  );
};
