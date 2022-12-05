/** @format */

const Lecture = require("../models/lecture/lecture");
const LectureDetail = require("../models/lecture/lectureDetail");
const Article = require("../models/article/article");
const User = require("../models/user/user");
const UserLecture = require("../models/user/userLecture");

const currentSemester = "2022-2";

const getBoard = async (req, res) => {
  const { lectureId } = req.params;
  const tab = req.query.tab || 1;
  try {
    const lecture = await getLecture(lectureId);
    const lectureDetail = await getLectureDetail(lectureId);
    const articles = await getArticles(lectureId, tab);
    return res.status(200).send({ lecture, lectureDetail, articles });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const getLecture = async (req, res) => {
  if (!req.session.user) {
    return res.status(400).send("세션 없음");
  }
  const userId = req.session.user._id;
  const { lectureId } = req.params;
  try {
    // 강의 정보
    const lecture = await Lecture.findById({ _id: lectureId });
    if (!lecture) {
      throw new Error("Lecture not found.");
    }

    // 강의 세부 정보
    let lectureDetail;
    lectureDetail = await getLectureDetail(lectureId);
    if (!lectureDetail) {
      throw new Error("개설된 강의 세부 정보가 없음");
    }
    if (lectureDetail.lectureSemester !== currentSemester) {
      lectureDetail = undefined;
    }

    // 유저 강의 정보
    let userLectureDetail;
    userLectureDetail = await getUserLectureDetail(userId, lectureId);
    return res.status(200).send({ lecture, lectureDetail, userLectureDetail });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const getUserLectureDetail = async (userId, lectureId) => {
  const userLecture = await UserLecture.findOne({ userId })
    .populate("lectureDetailId")
    .sort({ lectureSemester: -1 });
  if (!userLecture) {
    throw new Error("User's lecture not found.");
  }
  const lectures = userLecture.lectureDetailId;
  let userLectureDetail;
  lectures.map((lecture) => {
    lecture.lectureId.equals(lectureId) ? (userLectureDetail = lecture) : null;
  });
  return userLectureDetail;
};

const getLectureDetail = async (lectureId) => {
  return (
    (await LectureDetail.findOne({ lectureId }).sort({
      lectureSemester: -1,
    })) || undefined
  );
};

const getArticles = async (req, res) => {
  const lectureId = req.params.lectureId;
  const keyword = req.query.keyword || "";
  const tab = req.query.tab || 1;
  const lastLoadedId = req.query.id;
  const size = req.query.size || 5;

  try {
    let query;
    const searchQuery = keyword.length > 0 ? { $text: { $search: keyword } } : {};
    if (lastLoadedId) {
      query = Object.assign(
        {
          lectureId,
          category: tab,
          _id: { $lt: lastLoadedId },
        },
        searchQuery
      );
    } else {
      query = Object.assign(
        {
          lectureId,
          category: tab,
        },
        searchQuery
      );
    }
    const articles = await Article.find(query).sort({ _id: -1 }).limit(size);
    // 리턴값이 오름차순 정렬이므로 내림차순으로 정렬 필요
    return res.status(200).send(articles.sort((a, b) => b - a));
  } catch (error) {
    return res.status(400).send(error.message);
  }
};

const getArticle = async (req, res) => {
  const articleId = req.params.articleId;
  const article = await Article.findOne({ _id: articleId });
  return res.status(200).send(article);
};

const postEdit = async (req, res) => {
  // const articleId = req.params.articleId;
  // const article = await Article.findOne({ _id: articleId});
  return res.status(200).send("good");
};

module.exports = {
  getLecture,
  getArticles,
  getArticle,
  postEdit,
};
