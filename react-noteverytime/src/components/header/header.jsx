import React, { useCallback, useEffect, useState } from "react";
import "./header.scss";
import "../../styles/fontStyle.scss";
import { useNavigate } from "react-router-dom";
import { getMyPageApi } from "../../utils/api";

export const Header = () => {
  const navigate = useNavigate();

  const [keyword, setKeyword] = useState("");
  const [profileImage, setProfileImage] = useState("");

  const handleSearch = useCallback(
    (e) => {
      e.preventDefault();

      navigate(`/search?keyword=${keyword}`);
    },
    [keyword]
  );

  useEffect(() => {
    (async () => {
      const response = await getMyPageApi();
      setProfileImage(response.data.userResult.profileImage);
    })();
  }, []);

  return (
    <header className="header">
      <div className="header-Container">
        <div className="header-centerContainer">
          <a href="/">
            <img src="/images/Logo.svg" height="32px" />
          </a>
        </div>
        <div className="header-centerContainer search-bar">
          <form className="p3" onSubmit={handleSearch}>
            <input
              className="p3"
              type="text"
              placeholder="강의 검색"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            ></input>
          </form>
        </div>
        <div className="header-centerContainer">
          <div 
            className="profile-img-wrapper"
            onClick={() => {
                        navigate("/mypage");
                      }}>
            <img src={profileImage}/>
          </div>
        </div>
      </div>
    </header>
  );
};
