import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createComment } from "../../utils/api";
import "./replyInput.scss";

export const ReplyInput = ({ articleId, groupId }) => {
  const [content, setContent] = useState("");
  const [anonymous, setAnonymous] = useState(false);

  const navigate = useNavigate();

  const handleAnonymousChange = (e) => {
    setAnonymous(!anonymous);
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const addCommentHandler = async () => {
    const newComment = {
      articleId: articleId,
      groupId: groupId,
      content: content,
      isAnonymous: anonymous,
    };
    console.log(newComment);
    try {
      await createComment(newComment);
    } catch (err) {
      console.log(err);
    }
    // setContent("");
    navigate(0);
  };
  return (
    <div className="reply-input-container">
      <input
        type="text"
        className="reply-input"
        placeholder="답글을 입력해주세요"
        value={content}
        onChange={handleContentChange}
      ></input>
      <input
        type="checkbox"
        id="isAnnonymous"
        onChange={handleAnonymousChange}
      />
      <div style={{ whiteSpace: "nowrap", margin: "0 0.5em" }}>익명</div>
      <div className="reply-submit" onClick={addCommentHandler}>
        <img src="/images/Icon_Send.svg" alt="보내기" />
      </div>
    </div>
  );
};
