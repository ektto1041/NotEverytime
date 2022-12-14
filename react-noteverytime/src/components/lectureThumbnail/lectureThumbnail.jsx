import React, { useState, useEffect } from "react";
import "./lectureThumbnail.scss";
import { getArticles } from "../../utils/api";
import { Link, useNavigate } from "react-router-dom";
import moment from "moment";

export const LectureThumbnail = ({ lectureName, lectureId, semester }) => {
  const [articles, setArticles] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const articles = await getArticles(lectureId);
      setArticles(articles.data);
    })();
  }, [lectureId]);

  return (
    <div className="class-item-container">
      <div className="class-item-title">
        <Link className="link-lecture" to={`/lecture/${lectureId}`}>
          <div className="h6 title-name ">{lectureName}</div>
          <div className="Icon_RightArrow"></div>
        </Link>
      </div>
      <div className="semester-box"></div>
      <div className="class-item-preview-list">
        {articles?.length > 0 ? (
          articles.slice(0, 4).map((article) => (
            <div
              className="class-item-preview"
              onClick={() => {
                navigate(`/article/${article._id}`);
              }}
            >
              <div className="p4 preview-title">{article.title}</div>
              <div className="p4 preview-createdAt">
                {moment(article.createdAt).format("YY-MM-DD")}
              </div>
            </div>
          ))
        ) : (
          <div className="p4">등록된 게시글이 없습니다.</div>
        )}
      </div>
    </div>
  );
};
