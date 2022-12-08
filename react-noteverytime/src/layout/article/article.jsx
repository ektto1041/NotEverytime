import React, { useEffect, useState } from "react";
import { Reply } from "../../components/reply/reply";
import { ReplyInput } from "../../components/replyInput/replyInput";
import { getArticle } from "../../utils/api";
import { useParams } from "react-router-dom";
import { getCategoryString } from "../../utils/globalFunction";
import moment from "moment";
import "./article.scss";

export const Article = () => {
  const { articleId } = useParams();
  const [article, setArticle] = useState({});

  useEffect(() => {
    (async () => {
      const article = await getArticle(articleId);
      setArticle(article.data);
      console.dir(article);
    })();
  }, []);

  return (
    <div className="article-container">
      <div className="article-top">
        <div className="writer">
          <img src="/images/account-circle.svg" alt="account" />
          <div className="writer-meta">
            <div className="writer-name">
              {article.isAnonymous ? "익명" : article.username}
            </div>
            <div className="writer-semester">2022-2학기 수강생</div>
          </div>
        </div>
        <div className="category">{getCategoryString(article.category)}</div>
      </div>
      <div className="meta">
        <div className="title-bar">
          <div>{article.title}</div>
        </div>
      </div>
      <div className="content">
        <div className="text-container">
          <div dangerouslySetInnerHTML={{ __html: article.content }}></div>
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
              <div>3</div>
            </div>
            {article.isImage && (
              <div className="item icon-image">
                <img src="/images/item-icon_Image.svg" alt="icon" />
                <div>{article.articleImages.length}</div>
              </div>
            )}
          </div>
          <div className="date">
            {moment(article.modifiedAt).format("YY.MM.DD HH:MM")}
          </div>
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
