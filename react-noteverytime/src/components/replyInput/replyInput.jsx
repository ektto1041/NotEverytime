import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createComment } from "../../utils/api";
import "./replyInput.scss";

export const ReplyInput = ({ articleId, groupId, font, text, size }) => {
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
    <div className={`p4 reply-input-container ${size}`}>
      <input
        type="text"
        className={`${font} reply-input`}
        placeholder={text}
        value={content}
        onChange={handleContentChange}
      ></input>
      <label className="checkbox">
        <input
          type="checkbox"
          id="isAnnonymous"
          onChange={handleAnonymousChange}
        />
        익명
      </label>
      <div className="reply-submit" onClick={addCommentHandler}>
        <img className={size} src="/images/Icon_Send.svg" alt="보내기" />
      </div>
    </div>
  );
};
