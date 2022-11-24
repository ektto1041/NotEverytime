const Lecture = require("../models/lecture/lecture");
const LectureDetail = require("../models/lecture/lectureDetail");
const Article = require("../models/article/article");
const User = require("../models/user/user");
const UserLecture = require("../models/user/userLecture");

const getBoard = async (req, res) => {
  const { lectureId } = req.params;
  const { tab } = req.query;
  try {
    const lecture = await getLecture(lectureId);
    const lectureDetail = await getLectureDetail(lectureId);
    const articles = await getArticles(lectureId, tab);
    return res.status(200).send({lecture, lectureDetail, articles});
  } catch (error) {
    return res.status(400).send(error.message);
  }
}

const getLecture = async (lectureId) => {
  // lectureId 통해서는 강의 정보를 가져옴
  const lecture = await Lecture.findById({ _id: lectureId });
  if (!lecture) {
    throw new Error("Lecture not found.");
  }
  return lecture;
};

const getLectureDetail = async (lectureId) => {
  // userId 통해서는 강의 세부 정보를 불러옴
  const user = await User.findOne({ account_id: "mcodnjs" });
  if (!user) {
    throw new Error("User not found.");
  }
  const userLecture = await UserLecture.findOne({user_id: user._id}).populate('lectureDetailId');
  if (!userLecture) {
    throw new Error("User's lecture not found.");
  }
  const lectures = userLecture.lectureDetailId;
  let lectureDetail;
  lectures.map((lecture) => {
    lecture.lectureId.equals(lectureId) ? lectureDetail = lecture : ""
  });
  return lectureDetail
}

const getArticles = async (lectureId, tab) => {
  // lectureId와 tab을 통해서 게시글 가져옴
  const articles = await Article.find({lectureId, categort: tab});
  return articles;
}

module.exports = {
  getBoard,
};
