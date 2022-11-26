const newArticle = (() => {
  let id = 0;
  return (lectureId, category = 1, isImage = false, isAnonymous = true) => {
    const article = {
      id: id,
      lectureId,
      userId: '637f14045732f3b44bc163a1',
      title: `제목 ${id}`,
      content: Array.from({length: 20}, i => `내용 ${id} `).join(''),
      category,
      likeCount: id,
      isImage,
      isAnonymous,
      createdAt: '2022-11-20T14:10:30.000Z',
      modifiedAt: '2022-11-20T14:10:30.000Z',
    };
    id++;
    return article;
  };
})();

const newLecture = (() => {
  let id = 0;
  return () => {
    const lecture = {
      id: id,
      subjectId: `SCE${id}`,
      code: `F065-${id}`,
      name: '웹시스템설계',
      professor: '오상윤',
      semester: '2022-2',
      times: [
        '월 09:00~10:30',
      ],
      articles: [
        newArticle(id),
        newArticle(id),
        newArticle(id, 1, true),
        newArticle(id),
      ],
    };
    id++;
    return lecture;
  }
})();

export const DUMMY = {
  lectureList: [
    newLecture(),
  ],
};