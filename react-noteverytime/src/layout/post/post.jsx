import React, { useRef, useState } from "react";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getCategoryAuthority, USER_STATUS } from "../../utils/constants";
import "./post.scss";
import SunEditor from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css';
import { useCallback } from "react";
import { createPostApi } from "../../utils/api";

const newId = (() => {
  let id = 0;
  return () => {
    return id++;
  };
})();

export const Post = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [lectureId, setLectureId] = useState('');
  const [userStatus, setUserStatus] = useState('');
  const [category, setCategory] = useState("1");
  const [title, setTitle] = useState('');
  const [isAnonymous, setAnonymous] = useState(false);
  const [images, setImages] = useState([]);

  const editorRef = useRef();
  const imageInputRef = useRef();

  const handleSelectCategory = useCallback((e) => {
    if(getCategoryAuthority(e.target.value, userStatus).write) {
      setCategory(e.target.value);
    } else {
      // TODO 올바른 피드백
      alert("접근 권한이 없습니다.");
    }
  }, [userStatus]);

  const handleAddImage = useCallback((e) => {
    // 이미지 최대 갯수
    if(images.length === 10) {
      alert('최대 10개의 이미지까지 등록할 수 있습니다.');
      return;
    } 
    const imageUrl = URL.createObjectURL(e.target.files[0]);
    setImages([...images, {id: newId(), preview: imageUrl, file: e.target.files[0]}]);
  }, [images]);

  const handleClickDeleteImage = useCallback((image) => {
    setImages(images.filter(img => img.id !== image.id));
  }, [images]);

  const handleClickPost = useCallback(async() => {
    const formData = new FormData();
    formData.append('lectureId', lectureId);
    formData.append('title', title);
    formData.append('content', editorRef.current.getContents());
    formData.append('category', category);
    formData.append('isImage', images.length > 0);
    formData.append('isAnonymous', isAnonymous);
    images.forEach(img => {
      formData.append('articleImage', img.file);
    })

    try {
      const response = await createPostApi(formData);

      navigate(`/lecture/${lectureId}`);
    } catch(err) {
      alert(err.response.data.message);
    }
  }, [lectureId, title, editorRef, category, images, isAnonymous]);

  useEffect(() => {
    if(!location.state) {
      alert('비정상적인 접근입니다.');
      navigate('/login');
    } else {
      setLectureId(location.state.lectureId);
      setUserStatus(USER_STATUS.getSymbol(location.state.userStatus));
    }
  }, [location]);

  return (
    <div className="post-container">
      <div className="top">
        <div className="logo">글 작성</div>
        <button className="post-button" onClick={handleClickPost}>글 작성하기</button>
      </div>
      <div className="meta">
        <select
          className="select-category"
          value={category}
          onChange={handleSelectCategory}
        >
          <option value="1">자유게시판</option>
          <option value="2">선배의 팁 게시판</option>
          <option value="3">과제 Q&A 게시판</option>
          <option value="4">팀원 모집 게시판</option>
        </select>
        <div className="title-bar">
          <input type="text" placeholder="제목을 입력해주세요" value={title} onChange={(e) => setTitle(e.target.value)}></input>
        </div>
        <div className="anonymous">
          <input type="checkbox" name="익명" checked={isAnonymous} value={isAnonymous} onChange={(e) => setAnonymous(e.target.checked)} />
          익명
        </div>
      </div>
      <div className="post-editor-box">
        <SunEditor
          className="post-editor"
          lang="ko"
          defaultValue={''}
          height="400px"
          getSunEditorInstance={(sunEditor) => {editorRef.current = sunEditor}}
          setOptions={{
            buttonList: [
              ['fontSize', 'align'],
              // ['paragraphStyle', 'blockquote'],
              ['bold', 'underline', 'italic', 'strike', 'subscript', 'superscript'],
              ['fontColor', 'hiliteColor', 'textStyle'],
              ['removeFormat'],
              ['outdent', 'indent'],
              // ['align', 'horizontalRule', 'list', 'lineHeight'],
            ]
          }}
        />
      </div>
      <div className="photo-container">
        <input type='file' style={{ display: 'none' }} ref={imageInputRef} value='' onChange={handleAddImage} />
        {images?.map((image, i) => (
          <div key={`${i}_image`} className="photo-item" onClick={() => handleClickDeleteImage(image)}>
            <img className="photo-item-image" src={image.preview} alt='photo-item'/>
            <div className="photo-item-delete-message" />
          </div>
        ))}
        <button className="photo-add" onClick={() => imageInputRef.current.click()}>사진 추가</button>
      </div>
    </div>
  );
};
