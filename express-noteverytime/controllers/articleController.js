/** @format */

const Article = require("../models/article/article");
const ArticleImage = require("../models/article/articleImage");

const getArticle = async (req, res) => {
  const articleId = req.params.articleId;
  if (!articleId) {
    throw new Error("article id가 입력되지 않았습니다.");
  }
  try {
    const article = await Article.findOne({ _id: articleId });
    const articleImage = await ArticleImage.find({ articleId });
    return res.status(200).send({ article, articleImage });
  } catch (error) {
    return res.status(400).send(error.message);
  }
};

const editArticle = async (req, res) => {
  if (!req.session.user) {
    return res.status(400).send("세션 없음");
  }
  const user = req.session.user._id;
  const { lectureId, userId, title, content, category, isImage, isAnonymous } =
    req.body.value;
  const articleId = req.body.articleId || null;
  console.log(req.body.value);

  try {
    if (isImage) {
      const image = req.files;
      const path = image.map((img) => img.location);
    }
    if (articleId) {
      return res.status(200).send("업데이트해야할 article");
    } else {
      let article = await Article.create({
        lectureId,
        userId,
        title,
        content,
        category,
        isImage,
        isAnonymous,
        createdAt: new Date(),
        modifiedAt: new Date()
      });
    }
    return res.status(200).send(path);
  } catch (error) {
    return res.status(400).send(error.message);
  }
};

module.exports = {
  getArticle,
  editArticle,
};
