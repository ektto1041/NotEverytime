import React from "react";
import { ReplyInput } from "../replyInput/replyInput";
import moment from "moment";
import { deleteComment } from "../../utils/api";
import "./reply.scss";
import { useNavigate } from "react-router-dom";

export const Reply = ({
  articleId,
  commentId,
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
  const navigate = useNavigate();
  const onDeleteComment = async () => {
    try {
      await deleteComment(articleId, commentId);
      navigate(0);
    } catch (err) {
      alert(err.response.data);
    }
  };
  return (
    <div className={depth == 0 ? "reply" : "reply re-reply"}>
      <div className="reply-top">
        <div className="info">
          <img
            className="profile"
            src={
              isAnonymous || isDeleted
                ? "/images/account-circle.svg"
                : profileImage
            }
            alt="account"
          />
          <div
            className={isIdentify ? "p4 reply-writer blue" : "p4 reply-writer"}
          >
            {isDeleted ? "(삭제)" : isAnonymous ? "익명" : username}
          </div>
          <div className="label2 date">
            {!isDeleted && moment(createdAt).format("YY.MM.DD HH:mm")}
          </div>
        </div>
        {!isDeleted && (
          <div className="reply-button-container">
            {depth == 0 && <div className="p4 rereply-button">답글</div>}
            <div className="p4 remove-button" onClick={onDeleteComment}>
              삭제
            </div>
          </div>
        )}
      </div>
      <div className="p4 reply-content">
        {isDeleted ? "삭제된 댓글입니다." : content}
      </div>
      {depth == 0 && (
        <ReplyInput
          articleId={articleId}
          groupId={groupId}
          font="p4"
          text="답글을 입력해주세요"
          size="small"
        />
      )}
    </div>
  );
};
