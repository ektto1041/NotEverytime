import React from "react";
import { ReplyInput } from "../replyInput/replyInput";
import "./reply.scss";

export const Reply = () => {
  return (
    <div className="reply">
      <div className="reply-top">
        <div className="info">
          <img
            className="profile"
            src="/images/account-circle.svg"
            alt="account"
          />
          <div className="reply-writer">익명 1</div>
          <div className="date">22.11.11 23:00</div>
        </div>
        <div className="rereply-button">답글</div>
      </div>
      <div className="reply-content">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas, dicta
        modi natus rerum cumque dolores odio voluptate quam. Consequuntur cumque
        eveniet tempora numquam officia? Quo adipisci eum id libero ipsam!
      </div>
      <ReplyInput />
    </div>
  );
};
