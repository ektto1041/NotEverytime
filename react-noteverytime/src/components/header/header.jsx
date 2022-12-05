import React from "react";
import "./header.scss";
import "../../styles/fontStyle.scss";
import { useNavigate } from "react-router-dom";

export const Header = () => {
  return (
    <header className="header">
      <div className="header-Container">
        <div className="header-centerContainer">
          <a href="/">
            <img src="/images/Logo.svg" height="32px" />
          </a>
        </div>

        <div className="header-centerContainer search-bar">
          <input className="p3" type="text" placeholder="커뮤니티 검색"></input>
        </div>
        <div className="header-centerContainer">
          <img src="/images/account-circle.svg" height="44px" />
        </div>
      </div>
    </header>
  );
};
