const newPost = (() => {
  let id = 0;
  return () => {
    const post = {
      _id: id,
      user: 'Park',
      title: `아주대 정말 최고입니다. ${id}`,
      content: Array.from({length: 10}, (v, i) => "웹시스템설계를 수강하게 되어 정말 다행입니다. ").join(),
      createdAt: "2022-11-13",
      modifiedAt: "2022-11-13",
      isImage: true,
    }

    id++;

    return post;
  }
})();

const newLecture = (() => {
  let id = 0;
  return () => {
    const lecture = {
      _id: id,
      lectureName: `강의 ${id}`,
      lectureSemester: '2022-2',
      lectureCode: `F00${id}`,
      professor: '부블레',
      lectureTimes: [
        '월 09:00 ~ 10:30',
        '수 09:00 ~ 10:30',
      ],
      boardList: [
        {   // index 0 board
          postList: [
            newPost(),
            newPost(),
            newPost(),
            newPost(),
            newPost(),
          ]
        },
        {   // index 1 board
          postList: [
            newPost(),
            newPost(),
            newPost(),
            newPost(),
            newPost(),
          ]
        },
        {   // index 2 board
          postList: [
            newPost(),
            newPost(),
            newPost(),
            newPost(),
            newPost(),
          ]
        },
        {   // index 3 board
          postList: [
            newPost(),
            newPost(),
            newPost(),
            newPost(),
            newPost(),
          ]
        }
      ],
    }

    id++;

    return lecture;
  }
})();

export const DUMMY = {
  lectureList: [
    newLecture(),
    newLecture(),
    newLecture(),
  ],
}