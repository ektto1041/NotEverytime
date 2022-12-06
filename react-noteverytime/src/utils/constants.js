export const USER_STATUS = {
  none: Symbol(),
  prev: Symbol(),
  current: Symbol(),
  getStr: function(userStatus) {
    if(userStatus === this.none) return '미수강생';
    if(userStatus === this.prev) return '이전 학기 수강생';
    if(userStatus === this.current) return '현재 학기 수강생';
  },
  getSymbol: function(userStatusStr) {
    if(userStatusStr === '미수강생') return this.none;
    if(userStatusStr === '이전 학기 수강생') return this.prev;
    if(userStatusStr === '현재 학기 수강생') return this.current;
  }
};

export const getUserStatus = (lectureSemester, userSemester) => {
  return userSemester ? ( userSemester === lectureSemester ? USER_STATUS.current : USER_STATUS.prev ) : USER_STATUS.none;
};

export const CATEGORIES = [
  '0은 묵음',
  { name: '자유게시판', [USER_STATUS.none]: 0b11, [USER_STATUS.prev]: 0b11, [USER_STATUS.current]: 0b11 },
  { name: '선배의 팁 게시판', [USER_STATUS.none]: 0b01, [USER_STATUS.prev]: 0b11, [USER_STATUS.current]: 0b01},
  { name: '과제 Q&A 게시판', [USER_STATUS.none]: 0b00, [USER_STATUS.prev]: 0b01, [USER_STATUS.current]: 0b11},
  { name: '팀원 모집 게시판', [USER_STATUS.none]: 0b00, [USER_STATUS.prev]: 0b00, [USER_STATUS.current]: 0b11},
];

export const getCategoryAuthority = (categoryId, userStatus) => {
  const write = (CATEGORIES[categoryId][userStatus] & 0b10) === 0b10;
  const read = (CATEGORIES[categoryId][userStatus] & 0b01) === 0b01;
  return {write, read};
}