/** @format */

const Article = require("../models/article/article");
const ArticleImage = require("../models/article/articleImage");
const Comment = require("../models/article/comment");
const UserLecture = require("../models/user/userLecture");

const { ParamsValidationError } = require("../errors/generalError");
const { UnauthorizedError } = require("../errors/authError");
const { NotFoundArticle, NotFoundComment } = require("../errors/notFoundError");

const getArticle = async (req, res, next) => {
  const userId = req.session.user._id;
  const articleId = req.params.articleId;
  try {
    if (!articleId) {
      throw new ParamsValidationError("URL parmaeter가 없습니다.", 400);
    }
    let article = await Article.findOne({ _id: articleId }).populate("userId");
    article = article.toObject();

    /* User의 과목 수강 학기 */
    const lectureId = article.lectureId;
    const userLectures = await UserLecture.findOne({
      userId: article.userId._id,
    }).populate("lectureDetailId");
    const userLectureDetails = userLectures.lectureDetailId.sort((a, b) =>
      sortLectureSemester(a, b)
    );
    for (const lectureDetail of userLectureDetails) {
      if (lectureDetail.lectureId.equals(lectureId)) {
        article["userLectureSemester"] = lectureDetail.lectureSemester;
        break;
      }
    }

    if (article.isImage) {
      const articleImage = await ArticleImage.find({
        articleId: article._id,
      }).select("articleImageLink articleImageOrder");
      article["articleImages"] = articleImage;
    }
    article["isIdentify"] = article.userId._id.equals(userId) ? true : false;
    article["username"] = article.isAnonymous
      ? "익명"
      : article["userId"].username;
    article["profileImage"] = article.isAnonymous
      ? process.env.DEFAULT_PROFILE_IMAGE
      : article.userId.profileImage;
    delete article["userId"];
    return res.status(200).send(article);
  } catch (error) {
    next(error);
  }
};

const sortLectureSemester = (a, b) => {
  if (a < b) return -1;
  if (a > b) return 1;
  if (a === b) return 0;
  else return -1;
};

const editArticle = async (req, res, next) => {
  try {
    const userId = req.session.user._id;
    const { lectureId, title, content, category, isImage, isAnonymous } =
      req.body;
    const article = await Article.create({
      lectureId,
      userId,
      title,
      content,
      category,
      isImage,
      isAnonymous,
      createdAt: new Date(),
      modifiedAt: new Date(),
    });

    const articleImages = [];
    if (article && isImage) {
      const image = req.files;
      const path = image.map((img) => img.location);
      let count = 0;
      for (let imagePath of path) {
        let articleImage = await ArticleImage.create({
          articleId: article._id,
          articleImageLink: imagePath,
          articleImageOrder: count,
        });
        count = count + 1;
        articleImages.push(articleImage);
      }
      return res.status(200).send({ article, articleImages });
    }
    return res.status(200).send(article);
  } catch (error) {
    next(error);
  }
};

const deleteArticle = async (req, res, next) => {
  try {
    const userId = req.session.user._id;
    const articleId = req.params.articleId;
    if (!articleId) {
      throw new ParamsValidationError("URL parmaeter가 없습니다.", 400);
    }
    const article = await Article.findById(articleId);
    if (!article) {
      throw new NotFoundArticle("해당하는 게시글 정보가 없습니다.", 404);
    }
    if (article.userId.equals(userId)) {
      const deleteArticle = await Article.deleteOne({ _id: articleId }).exec();
      const deleteComments = await Comment.deleteMany({ articleId });
      return res.status(200).send({ deleteArticle, deleteComments });
    } else {
      throw new UnauthorizedError("삭제 권한이 없습니다.", 401);
    }
  } catch (error) {
    next(error);
  }
};

const editComment = async (req, res, next) => {
  const userId = req.session.user._id;
  const { articleId, groupId, content, isAnonymous } = req.body;
  console.log(articleId, groupId, content, isAnonymous); // DEBUG

  if (!articleId) {
    throw new ParamsValidationError("URL parmaeter가 없습니다.", 400);
  }
  try {
    const article = await Article.findById(articleId);
    if (!article) {
      throw new NotFoundArticle("해당하는 게시글 정보가 없습니다.", 404);
    }

    let comment;
    let order = 0;

    if (groupId) {
      /* 대댓글인 경우 */
      order = (await Comment.countDocuments({ groupId, depth: 1 })) + 1;
      comment = await Comment.create({
        articleId,
        userId,
        groupId,
        content,
        isAnonymous,
        order,
        depth: 1,
        createdAt: new Date(),
        modifiedAt: new Date(),
      });
    } else {
      /* 댓글인 경우: create 후 얻은 commentId값을 본인의 groupId에 업데이트  */
      order = (await Comment.countDocuments({ articleId, depth: 0 })) + 1;
      comment = await Comment.create({
        articleId,
        userId,
        content,
        order,
        isAnonymous,
        createdAt: new Date(),
        modifiedAt: new Date(),
      });
      comment = await Comment.findByIdAndUpdate(
        comment._id,
        { $set: { groupId: comment._id } },
        { new: true }
      );
    }
    return res.status(200).send(comment);
  } catch (error) {
    next(error);
  }
};

const getComment = async (req, res, next) => {
  const userId = req.session.user._id;
  const articleId = req.params.articleId;
  if (!articleId) {
    throw new ParamsValidationError("URL parmaeter가 없습니다.", 400);
  }
  try {
    const article = await Article.findById(articleId);
    if (!article) {
      throw new NotFoundArticle("해당하는 게시글 정보가 없습니다.", 404);
    }
    const comments = await Comment.find({ articleId }).populate("userId");
    const lectureId = article.lectureId;
    const newComments = [];
    const users = new Set();
    let userIndex = 0;
    for (let comment of comments) {
      comment = comment.toObject();

      /* User의 과목 수강 학기 */
      const userLectures = await UserLecture.findOne({
        userId: comment.userId._id,
      }).populate("lectureDetailId");
      const userLectureDetails = userLectures.lectureDetailId.sort((a, b) =>
        sortLectureSemester(a, b)
      );
      for (const lectureDetail of userLectureDetails) {
        if (lectureDetail.lectureId.equals(lectureId)) {
          comment["userLectureSemester"] = lectureDetail.lectureSemester;
          break;
        }
      }

      if (comment.userId._id.equals(article.userId)) {
        comment["username"] = comment.isAnonymous
          ? "익명(글쓴이)"
          : `${comment["userId"].username}(글쓴이)`;
        comment["isWriter"] = true;
      } else {
        users.add(comment.userId._id.toString());
        userIndex = Array.from(users).indexOf(comment.userId._id.toString());
        comment["username"] = comment.isAnonymous
          ? `익명${userIndex + 1}`
          : comment["userId"].username;
      }
      comment["profileImage"] = comment.isAnonymous
        ? process.env.DEFAULT_PROFILE_IMAGE
        : comment.userId.profileImage;
      comment["isIdentify"] = comment.userId._id.equals(userId) ? true : false;
      delete comment["userId"];
      if (comment.isDeleted) {
        const { _id, articleId, groupId, depth, order, isDeleted } = comment;
        newComments.push({ _id, articleId, groupId, depth, order, isDeleted });
      } else {
        newComments.push(comment);
      }
    }
    return res.status(200).send(newComments);
  } catch (error) {
    next(error);
  }
};

const deleteComment = async (req, res, next) => {
  const userId = req.session.user._id;
  const { articleId, commentId } = req.params;

  if (!articleId) {
    throw new ParamsValidationError("URL parmaeter가 없습니다.", 400);
  }
  if (!commentId) {
    throw new ParamsValidationError("URL parmaeter가 없습니다.", 400);
  }

  try {
    const article = await Article.findById(articleId);
    if (!article) {
      throw new NotFoundArticle("해당하는 게시글 정보가 없습니다.", 404);
    }
    const comment = await Comment.findOne({ _id: commentId, articleId });
    if (!comment) {
      throw new NotFoundComment("해당하는 댓글 정보가 없습니다.", 404);
    }

    if (comment.userId.equals(userId)) {
      const deleteComment = await Comment.findByIdAndUpdate(
        comment._id,
        { $set: { isDeleted: true, modifiedAt: new Date() } },
        { new: true }
      );
      return res.status(200).send(deleteComment);
    } else {
      throw new UnauthorizedError("삭제 권한이 없습니다.", 401);
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getArticle,
  editArticle,
  deleteArticle,
  getComment,
  editComment,
  deleteComment,
};
