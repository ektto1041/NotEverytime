import React, { useState, useEffect } from "react";
import "./lectureThumbnail.scss";
import { getArticles } from "../../utils/api";
import { Link, useNavigate } from "react-router-dom";
import moment from "moment";

export const LectureThumbnail = ({ lectureName, lectureId }) => {
  const [articles, setArticles] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const articles = await getArticles(lectureId);
      console.dir(articles);
      setArticles(articles.data);
    })();
  }, []);

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
        {articles.slice(0, 5).map((article) => (
          <div className="class-item-preview">
            <div
              className="p4 preview-title"
              onClick={() => {
                navigate(`/lecture/${article.lectureId}`);
              }}
            >
              {article.title}
            </div>
            <div className="p4 preview-createdAt">
              {moment(article.createdAt).format("YY-MM-DD")}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
