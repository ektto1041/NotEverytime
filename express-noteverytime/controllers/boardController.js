const Lecture = require("../models/lecture/lecture");
const LectureDetail = require("../models/lecture/lectureDetail");
const Board = require("../models/article/board");
const Article = require("../models/article/article");
const User = require("../models/user/user");
const UserLecture = require("../models/user/userLecture");

const getBoard = async (req, res) => {
  // boardId 통해서는 강의 정보와 게시글을 불러오고
  const { boardId } = req.params;
  const board = await Board.findById({ _id: boardId });
  if (!board) {
    return res.status(404).send("Board not found.");
  }
  const lectureId = board.lectureId;
  const lecture = await Lecture.findById({ _id: lectureId });
  const articles = await Article.find({boardId});
  
  // userId 통해서는 강의 세부 정보를 불러옴
  const user = await User.findOne({ accountId: "mcodnjs" });
  if (!user) {
    return res.status(404).send("User not found.");
  }
  const userLecture = await UserLecture.findOne({userId: user._id}).populate('lectureDetailId');
  if (!userLecture) {
    return res.status(404).send("User's lecture not found.");
  }
  const lectures = userLecture.lectureDetailId;
  let lectureDetail;
  lectures.map((lecture) => {
    lecture.lectureId.equals(lectureId) ? lectureDetail = lecture : ""
  });
  result = { lecture, lectureDetail, articles }
  return res.send(result);
};

module.exports = {
  getBoard,
};
