import axios from 'axios';

/**
 * Instance of axios
 * 각 API 의 설정을 공통으로 설정할 수 있음
 */
const ax = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
  withCredentials: true,
  // headers: { 'key': 'value' },
});

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
}

export const getLectureByIdApi = (lectureId, tab) => ax.get(`/lecture/${lectureId}/view?tab=${tab}`);