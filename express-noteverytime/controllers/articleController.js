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
          articleImageOrder: count
        });
        count = count + 1;
        articleImages.push(articleImage);
      }
      return res.status(200).send({article, articleImages});
    }
    return res.status(200).send(article);
  } catch (error) {
    return res.status(400).send(error.message);
  }
};

module.exports = {
  getArticle,
  editArticle,
};
