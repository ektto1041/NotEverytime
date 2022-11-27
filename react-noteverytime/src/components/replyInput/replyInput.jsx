import React from "react";
import "./replyInput.scss";

export const ReplyInput = () => {
  return (
    <div className="reply-input-container">
      <input
        type={"text"}
        className="reply-input"
        placeholder="답글을 입력해주세요"
      ></input>
      <input type="checkbox" id="isAnnonymous" />
      <div style={{ whiteSpace: "nowrap", margin: "0 0.5em" }}>익명</div>
      <div className="reply-submit">
        <img src="/images/Icon_Send.svg" alt="보내기" />
      </div>
    </div>
  );
};
