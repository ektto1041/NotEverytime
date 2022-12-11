export const getCategoryString = (category_id) => {
  switch (category_id) {
    case 1:
      return "자유게시판";
    case 2:
      return "선배의 팁 게시판";
    case 3:
      return "과제 Q&A 게시판";
    case 4:
      return "팀원 모집 게시판";
  }
};
