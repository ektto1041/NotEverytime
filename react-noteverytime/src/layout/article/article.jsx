import React, { useEffect, useState } from "react";
import { Reply } from "../../components/reply/reply";
import { ReplyInput } from "../../components/replyInput/replyInput";
import { getArticle, deleteArticle, getComments } from "../../utils/api";
import { useNavigate, useParams } from "react-router-dom";
import { getCategoryString } from "../../utils/globalFunction";
import moment from "moment";
import "./article.scss";

export const Article = () => {
  const { articleId } = useParams();
  const [article, setArticle] = useState({});
  const [comments, setComments] = useState([]);
  const [reComments, setReComments] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const article = await getArticle(articleId);
        setArticle(article.data);
        const allComments = await getComments(articleId);
        const comments = [];
        const reComments = {};
        for (const comment of allComments.data) {
          if (comment.depth == 0) {
            comments.push(comment);
          } else {
            reComments[comment.groupId]
              ? reComments[comment.groupId].push(comment)
              : (reComments[comment.groupId] = [comment]);
          }
        }
        setComments(comments);
        setReComments(reComments);
      } catch (err) {
        alert(err.response.data.message);
        navigate("/login");
      }
    })();
  }, []);

  const onDeleteArticle = async () => {
    try {
      await deleteArticle(articleId);
      navigate(-1);
    } catch (err) {
      alert(err.response.data.message);
    }
  };

  return (
    <div className="article-container">
      <div className="article-top">
        <div className="writer">
          <img src={article.profileImage} alt="account" />
          <div className="writer-meta">
            <div className="p3 writer-name">
              {article.isAnonymous ? "익명" : article.username}
            </div>
            <div className="label2 writer-semester">
              {article.userLectureSemester} 학기 수강생
            </div>
          </div>
        </div>
        <div
          className="h6 category"
          onClick={() => {
            navigate(`/lecture/${article.lectureId}`, {
              state: article.category,
            });
          }}
        >
          {getCategoryString(article.category)}
        </div>
      </div>
      <div className="meta">
        <div className="title-bar">
          <div className="p3">{article.title}</div>
        </div>
      </div>
      <div className="content">
        <div className="text-container">
          <div
            className="p3"
            dangerouslySetInnerHTML={{ __html: article.content }}
          ></div>
        </div>
        <div className="photo-container">
          {article.isImage &&
            article.articleImages.map((image) => {
              return (
                <img
                  src={image.articleImageLink}
                  alt="article"
                  className="photo"
                />
              );
            })}
        </div>
        <div className="status-container">
          <div className="item-container">
            {/* <div className="item icon-thumbs">
              <img src="/images/item-icon_Thumb.svg" alt="thumb" />
              <div>3</div>
            </div> */}
            <div className="item icon-reply">
              <img src="/images/item-icon_Reply.svg" alt="reply" />
              <div className="p4">{comments.length}</div>
            </div>
            {article.isImage && (
              <div className="item icon-image">
                <img src="/images/item-icon_Image.svg" alt="icon" />
                <div className="p4">{article.articleImages.length}</div>
              </div>
            )}
          </div>

          <div className="date-container">
            <div className="p4 date">
              {moment(article.modifiedAt).format("YY.MM.DD HH:mm")}
            </div>
            <div className="p4 delete-article" onClick={onDeleteArticle}>
              삭제
            </div>
          </div>
        </div>
      </div>
      <div className="reply-section">
        <div className="h6 top">댓글</div>
        <div className="reply-container">
          {comments.map((comment) => {
            return (
              <>
                <Reply
                  articleId={article._id}
                  commentId={comment._id}
                  username={comment.username}
                  content={comment.content}
                  createdAt={comment.createdAt}
                  depth={comment.depth}
                  groupId={comment.groupId}
                  isDeleted={comment.isDeleted}
                  isAnonymous={comment.isAnonymous}
                  isIdentify={comment.isIdentify}
                  profileImage={comment.profileImage}
                  isWriter={comment.isWriter}
                />
                {reComments[comment._id] &&
                  reComments[comment._id].map((comment) => {
                    return (
                      <Reply
                        articleId={article._id}
                        commentId={comment._id}
                        username={comment.username}
                        content={comment.content}
                        createdAt={comment.createdAt}
                        depth={comment.depth}
                        groupId={comment.groupId}
                        isDeleted={comment.isDeleted}
                        isAnonymous={comment.isAnonymous}
                        isIdentify={comment.isIdentify}
                        profileImage={comment.profileImage}
                        isWriter={comment.isWriter}
                      />
                    );
                  })}
              </>
            );
          })}
        </div>
      </div>
      <ReplyInput
        articleId={article._id}
        groupId={false}
        font="p3"
        text="댓글을 입력해주세요"
        size="large"
      />
    </div>
  );
};
