/** @format */

const Lecture = require("../models/lecture/lecture");
const LectureDetail = require("../models/lecture/lectureDetail");
const Article = require("../models/article/article");
const ArticleImage = require("../models/article/articleImage");
const Comment = require("../models/article/comment");
const UserLecture = require("../models/user/userLecture");

const { InputValidationError } = require("../errors/generalError");
const { NotFoundLecture } = require("../errors/notFoundError");

const getLecture = async (req, res, next) => {
  const userId = req.session.user._id;
  const { lectureId } = req.params;
  try {
    // 강의 정보
    const lecture = await Lecture.findById({ _id: lectureId });
    if (!lecture) {
      throw new NotFoundLecture("해당하는 강의 정보가 없습니다.", 404);
    }

    // 강의 세부 정보
    const lectureDetail = await getLectureDetail(lectureId);
    if (!lectureDetail) {
      throw new NotFoundLecture("해당하는 강의 세부 정보가 없습니다.", 404);
    }
    // 유저 강의 정보
    const userLectureDetail = await getUserLectureDetail(userId, lectureId);
    return res.status(200).send({ lecture, lectureDetail, userLectureDetail });
  } catch (error) {
    next(error);
  }
};

const getUserLectureDetail = async (userId, lectureId) => {
  const userLecture = await UserLecture.findOne({ userId })
    .populate("lectureDetailId")
    .sort({ lectureSemester: -1 });
  if (!userLecture) {
    return [];
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

const getUserLecture = async (req, res, next) => {
  const userId = req.session.user._id;
  const semester = req.params.semester || "";

  try {
    const userLecture = await UserLecture.findOne({ userId });
    if (!userLecture) {
      return res.status(200).send([]);
    }
    const lectures = [];
    for (let lectureDetail of userLecture.lectureDetailId) {
      let lecture = await LectureDetail.findById(lectureDetail).populate(
        "lectureId"
      );
      if (!lecture) {
        throw new NotFoundLecture("해당하는 강의 세부 정보가 없습니다.", 404);
      } else {
        lecture = lecture.toObject();
        lecture["lecture"] = lecture["lectureId"];
        delete lecture["lectureId"];
        lectures.push(lecture);
      }
    }
    if (semester) {
      return res
        .status(200)
        .send(
          lectures.filter((lecture) => lecture.lectureSemester === semester)
        );
    } else {
      return res.status(200).send(lectures);
    }
  } catch (error) {
    next(error);
  }
};

const getArticles = async (req, res, next) => {
  const lectureId = req.params.lectureId;
  const keyword = req.query.keyword || "";
  const tab = req.query.tab || 1;
  const lastLoadedId = req.query.id;
  const size = req.query.size || 10;
  const userId = req.session.user._id;

  try {
    let query;
    const searchQuery =
      keyword.length > 0 ? { $text: { $search: keyword } } : {};
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
    const articles = await Article.find(query)
      .sort({ _id: -1 })
      .limit(size)
      .populate("userId");

    const newArticles = []; // 게시글 익명/유저 네임/이미지링크 반환
    for (let article of articles) {
      article = article.toObject();
      if (article.isImage) {
        let articleImage = await ArticleImage.find({
          articleId: article._id,
        }).select("articleImageLink articleImageOrder");
        article["articleImages"] = articleImage;
      }
      let commentCount = await Comment.countDocuments({
        articleId: article._id,
      });
      article["commentCount"] = commentCount;
      article["isIdentify"] = article.userId._id.equals(userId) ? true : false;
      article["username"] = article.isAnonymous
        ? "익명"
        : article["userId"].username;
      delete article["userId"];
      newArticles.push(article);
    }
    // 리턴값이 오름차순 정렬이므로 내림차순으로 정렬 필요
    return res.status(200).send(newArticles.sort((a, b) => b - a));
  } catch (error) {
    next(error);
  }
};

const searchLecture = async (req, res, next) => {
  const keyword = req.query.keyword || null;
  if (!keyword) {
    throw new InputValidationError("강의 검색 키워드가 비어있습니다.", 400);
  }
  try {
    const lectures = await Lecture.find({ $text: { $search: keyword } }).sort({
      _id: -1,
    });
    if (lectures.length === 0) {
      return res.status(200).send("해당하는 강의가 없습니다.");
    }
    const searchLectures = [];
    for (let lecture of lectures) {
      const lectureId = lecture._id;
      const lectureDetails = await LectureDetail.find({ lectureId }).sort({
        lectureSemester: -1,
      });
      const lectureTime = lectureDetails[0].lectureTime;
      const lectureCode = lectureDetails[0].lectureCode;
      const lectureSemester = [];
      for (let lectureDetail of lectureDetails) {
        lectureSemester.push(lectureDetail.lectureSemester);
      }
      searchLectures.push({
        lecture,
        lectureTime,
        lectureCode,
        lectureSemester,
      });
    }
    return res.status(200).send(searchLectures);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getUserLecture,
  getLecture,
  getArticles,
  searchLecture,
};
