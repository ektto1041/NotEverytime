import axios from "axios";

/**
 * Instance of axios
 * 각 API 의 설정을 공통으로 설정할 수 있음
 */
const ax = axios.create({
  // baseURL: process.env.REACT_APP_SERVER_URL,
  withCredentials: true,
  // headers: { 'key': 'value' },
});

export const registerUser = (userInfo) => ax.post("/join", userInfo);

export const getUserLecturesBySemester = (semester) =>
  ax.get(`/lecture/semesters/${semester}`);
/**
 * FOR TEST,
 * 유저 아이디를 통해 유저 정보를 가져오는 API 예시
 * Promise 를 반환하기 때문에 await로 받아야 함
 * @param userId 검색하려는 유저의 id
 * @returns Promise
 */
export const fetchUserById = (userId) => ax.get(`/user/${userId}`);

/**
 * 컴포넌트에서 위 함수를 사용하는 예시 (예시를 위해 api.js 에 작성함)
 * @param userId 검색하려는 유저의 id
 */
const fetchUserByIdInComponents = async (userId) => {
  const response = await fetchUserById(userId);
  //
  // setUser(response.data)
  // ...
};

/**
 * 로그인 API
 * @param {{accountId: String, password: String}} loginData 로그인에 필요한 데이터
 */
export const loginApi = (loginData) => ax.post("/login", loginData);

/**
 * 로그아웃 API
 */
export const logoutApi = () => ax.get('/logout');

/**
 * 마이페이지에 필요한 정보를 가져오는 API
 */
export const getMyPageApi = () => ax.get('/mypage');

/**
 * 프로필 이미지 수정 API
 * @param {FormData} formData profileIamge: File
 */
export const updateProfileImageApi = (formData) => ax.post('/mypage/profile/edit', formData, { headers: { "Content-Type": "multipart/form-data" }});

/**
 * username 변경 API
 * @param {String} username 변경하려는 username
 */
export const updateUsernameApi = (username) => ax.post(`/mypage/edit`, {username});

/**
 * 마이페이지에서 수강과목 인증을 누르면 호출되는 API
 * 목업데이터를 가져온다.
 */
export const authenticateLectureApi = () => ax.get('/authenticate/lecture');

/**
 * 가져온 목업데이터를 서버로 보내 db에 insert 하는 API
 */
export const updateAuthenticatedLectureApi = (lectures) => ax.post('/authenticate/lecture', lectures);

/**
 * 강의 검색 API
 * @param {String} keyword 검색어
 */
export const searchLecturesApi = (keyword) => ax.get(`/search?keyword=${keyword}`);

/**
 * 특정 강의의 정보를 가져오는 API
 * @param {String} lectureId 가져오려는 강의의 id
 */
export const getLectureApi = (lectureId) => ax.get(`/lecture/${lectureId}`);
export const getLectureByIdApi = (lectureId, tab) =>
  ax.get(`/lecture/${lectureId}/view?tab=${tab}`);

/**
 * 특정 게시판 글들을 가져오는 API with Paging
 * @param {String} lectureId 가져오려는 강의의 id
 * @param {String} keyword 검색어
 * @param {Number} tab 가져오려는 게시판 카테고리 id
 * @param {Number} size 가져오려는 글 수
 * @param {String} id 마지막으로 가져온 글의 아이디
 */
export const getArticlesApiPaging = (lectureId, keyword, tab, size, id) =>
  ax.get(
    `/lecture/${lectureId}/articles?${
      keyword ? `keyword=${keyword}&` : ""
    }tab=${tab}&${id ? `id=${id}&` : ""}size=${size}`
  );
export const getLectureByIdApiPaging = (lectureId, tab, page, size, offset) =>
  ax.get(
    `/lecture/${lectureId}/view?tab=${tab}&page=${page}&size=${size}&offset=${offset}`
  );

/**
 * 글 검색 API
 * @param {String} lectureId 검색을 하려는 대상 강의의 id
 * @param {String} keyword 검색어
 */
export const searchArticles = (lectureId, keyword) =>
  ax.get(`/lecture/${lectureId}/articles/search?keyword=${keyword}`);

export const getArticles = (lectureId) =>
  ax.get(`/lecture/${lectureId}/articles?tab=1`);

export const createPostApi = (formData) => ax.post('/articles/edit', formData);