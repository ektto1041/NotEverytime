import React from "react";
import { ReplyInput } from "../replyInput/replyInput";
import moment from "moment";
import "./reply.scss";

export const Reply = ({
  username,
  content,
  createdAt,
  depth,
  groupId,
  isDeleted,
  isAnonymous,
  isIdentify,
}) => {
  //TODO: re-reply css
  return (
    <div className="reply">
      <div className="reply-top">
        <div className="info">
          <img
            className="profile"
            src="/images/account-circle.svg"
            alt="account"
          />
          <div className={isIdentify ? "reply-writer blue" : "reply-writer"}>
            {isAnonymous ? "익명" : username}
          </div>
          <div className="date">
            {moment(createdAt).format("YY.MM.DD HH:mm")}
          </div>
        </div>
        <div className="rereply-button">답글</div>
      </div>
      <div className="reply-content">{content}</div>
      <ReplyInput />
    </div>
  );
};
