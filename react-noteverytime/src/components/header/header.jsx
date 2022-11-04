import React from "react";
import "./header.scss";

export const Header = () => {
  return (
    <header className="header">
      <div className="logo">NotEverytime</div>
      <div className="search-bar">
        <input type="text" placeholder="커뮤니티 검색"></input>
      </div>
      <div className="profile">profile</div>
    </header>
  );
};
