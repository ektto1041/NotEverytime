/** @format */

const Article = require("../models/article/article");
const ArticleImage = require("../models/article/articleImage");
const Comment = require("../models/article/comment");

const getArticle = async (req, res) => {
  if (!req.session.user) {
    return res.status(400).send("세션 없음");
  }
  const userId = req.session.user._id;
  const articleId = req.params.articleId;
  if (!articleId) {
    throw new Error("article id가 입력되지 않았습니다.");
  }
  try {
    let article = await Article.findOne({ _id: articleId }).populate("userId");
    article = article.toObject();
    let articleImage;
    if (article.isImage) {
      articleImage = await ArticleImage.find({
        articleId: article._id,
      }).select("articleImageLink articleImageOrder");
      article["articleImages"] = articleImage;
    }
    article["isIdentify"] = article.userId._id.equals(userId) ? true : false;
    article["username"] = article.isAnonymous
      ? "익명"
      : article["userId"].username;
    delete article["userId"];
    return res.status(200).send(article);
  } catch (error) {
    return res.status(400).send(error.message);
  }
};

const editArticle = async (req, res) => {
  if (!req.session.user) {
    return res.status(400).send("세션 없음");
  }
  const userId = req.session.user._id;
  const { lectureId, title, content, category, isImage, isAnonymous } =
    req.body;
  try {
    let article = await Article.create({
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

    let articleImages = [];
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
    return res.status(400).send(error.message);
  }
};

const editComment = async (req, res) => {
  if (!req.session.user) {
    return res.status(400).send("세션 없음");
  }
  const userId = req.session.user._id;
  const { articleId, groupId, content, isAnonymous } = req.body;
  console.log(articleId, groupId, content, isAnonymous); // DEBUG

  if (!articleId) {
    return res.status(400).send("게시글 id가 없습니다.");
  }
  try {
    const article = await Article.findById(articleId);
    if (!article) {
      throw new Error("해당하는 상위 게시글이 article db에 없습니다.");
    }

    let comment;
    let order = 0;

    if (groupId) {
      /* 대댓글인 경우 */
      order = await Comment.countDocuments({ groupId, depth: 1 }) + 1;
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
      order = await Comment.countDocuments({ articleId, depth: 0 }) + 1;
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
    return res.status(400).send(error.message);
  }

  return res.status(200).send(commentId);
};

const getComment = async (req, res) => {
  if (!req.session.user) {
    return res.status(400).send("세션 없음");
  }
  const userId = req.session.user._id;
};

module.exports = {
  getArticle,
  editArticle,
  getComment,
  editComment,
};
