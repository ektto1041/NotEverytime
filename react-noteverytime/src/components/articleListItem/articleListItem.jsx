import React from "react";
import "./articleListItem.scss";
import moment from "moment";
import { Link, useNavigate } from "react-router-dom";

export const ArticleListItem = ({ article }) => {
  const {
    _id,
    title,
    content,
    modifiedAt,
    username,
    isImage,
    articleImages,
    commentCount,
  } = article;

  return (
    <div className="article-item-container">
      <Link to={`/article/${_id}`}>
        <div className="article-item-box">
          <div className="article-info">
            <div className="p3 article-title">{title}</div>
            <div className="p3 article-preview">
              {/* {content.length > 70 ? content.substring(0, 70) + "..." : content} */}
              {content.replace(/<[^>]*>?/g, "")}
            </div>
            <div className="article-data">
              <div className="article-data-info">
                <div className="p4 article-created-at">
                  {modifiedAt && moment.isMoment(modifiedAt)
                    ? modifiedAt.fromNow()
                    : ""}
                </div>
                <div className="p4 article-writer">{username}</div>
              </div>
              
              <div className="article-icons">
                <div className="p4 comments">
                  <img
                    src="/images/Icon_Image.svg"
                    width="24px"
                    height="24px"
                    alt="comment"
                  />
                  {articleImages ? articleImages.length : 0}
                </div>
                <div className="p4 images">
                  <img
                    src="/images/Icon_Chat.svg"
                    width="24px"
                    height="24px"
                    alt="image"
                  />
                  {commentCount || 0}
                </div>
              </div>
            </div>
          </div>
          {isImage ? (
            // <div className='thumbnail'>
            //   {/* mr 24, 124*124 */}
            // </div>
            <img
              className="thumbnail"
              src={articleImages[0]?.articleImageLink}
              alt="Thumbnail"
            />
          ) : (
            <></>
          )}
        </div>
      </Link>
    </div>
  );
};
