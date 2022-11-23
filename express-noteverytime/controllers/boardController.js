const Lecture = require("../models/lecture/lecture");
const LectureDetail = require("../models/lecture/lectureDetail");
const Board = require("../models/article/board");
const Article = require("../models/article/article");
const User = require("../models/user/user");
const UserLecture = require("../models/user/userLecture");

const getBoard = async (req, res) => {
  // board_id를 통해서는 강의 정보와 게시글을 불러오고
  const { board_id } = req.params;
  const board = await Board.findById({ _id: board_id });
  if (!board) {
    return res.status(404).send("Board not found.");
  }
  const lecture_id = board.lecture_id;
  const lecture = await Lecture.findById({ _id: lecture_id });
  const articles = await Article.find({board_id});
  
  // user_id를 통해서는 강의 세부 정보를 불러옴
  const user = await User.findOne({ account_id: "mcodnjs" });
  if (!user) {
    return res.status(404).send("User not found.");
  }
  const user_lecture = await UserLecture.findOne({user_id: user._id}).populate('lecture_detail_id');
  if (!user_lecture) {
    return res.status(404).send("User's lecture not found.");
  }
  const lectures = user_lecture.lecture_detail_id;
  let lecture_detail;
  lectures.map((lecture) => {
    lecture.lecture_id.equals(lecture_id) ? lecture_detail = lecture : ""
  });
  result = { lecture, lecture_detail, articles }
  return res.send(result);
};

module.exports = {
  getBoard,
};
