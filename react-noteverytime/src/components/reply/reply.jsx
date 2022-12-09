import React from "react";
import { ReplyInput } from "../replyInput/replyInput";
import moment from "moment";
import "./reply.scss";

export const Reply = ({
  articleId,
  username,
  content,
  createdAt,
  depth,
  groupId,
  isDeleted,
  isAnonymous,
  isIdentify,
  profileImage,
}) => {
  return (
    <div className={depth == 0 ? "reply" : "reply re-reply"}>
      <div className="reply-top">
        <div className="info">
          <img
            className="profile"
            src={isAnonymous ? "/images/account-circle.svg" : profileImage}
            alt="account"
          />
          <div className={isIdentify ? "reply-writer blue" : "reply-writer"}>
            {isAnonymous ? "익명" : username}
          </div>
          <div className="date">
            {moment(createdAt).format("YY.MM.DD HH:mm")}
          </div>
        </div>
        {depth == 0 && <div className="rereply-button">답글</div>}
      </div>
      <div className="reply-content">{content}</div>
      {depth == 0 && <ReplyInput articleId={articleId} groupId={groupId} />}
    </div>
  );
};
