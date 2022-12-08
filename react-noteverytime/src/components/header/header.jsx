import React, { useCallback } from "react";
import "./header.scss";
import "../../styles/fontStyle.scss";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export const Header = () => {
  const navigate = useNavigate();
  
  const [keyword, setKeyword] = useState('');

  const handleSearch = useCallback((e) => {
    e.preventDefault();

    navigate(`/search?keyword=${keyword}`);
  }, [keyword]);

  return (
    <header className="header">
      <div className="header-Container">
        <div className="header-centerContainer">
          <a href="/">
            <img src="/images/Logo.svg" height="32px" />
          </a>
        </div>

        <div className="header-centerContainer search-bar">
          <form className="p3" onSubmit={handleSearch} >
            <input className="p3" type="text" placeholder="커뮤니티 검색" value={keyword} onChange={(e) => setKeyword(e.target.value)}></input>
          </form>
        </div>
        <div className="header-centerContainer">
          <img src="/images/account-circle.svg" height="44px" />
        </div>
      </div>
    </header>
  );
};
