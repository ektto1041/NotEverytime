import React from 'react';
import { Link } from "react-router-dom";
import "./myContent.scss";

export const MyContent = ({text, link}) => { 
  return (
    <Link className="link-content" to={`/${link}`}>
      <div className="my-content">
        <div className="h6">{text}</div>
        <div className="Icon_RightArrow"></div>
      </div>
    </Link>
  );
}