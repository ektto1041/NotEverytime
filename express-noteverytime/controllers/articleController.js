const Article = require("../models/article/article");
const ArticleImage = require("../models/article/articleImage");

const getArticle = async (req, res) => {
  const articleId = req.params.articleId;
  if (!articleId) {
    throw new Error("article id가 입력되지 않았습니다.")
  }
  try {
    const article = await Article.findOne({ _id: articleId });
    const articleImage = await ArticleImage.find({articleId});
    return res.status(200).send({article, articleImage});
  } catch (error) {
    return res.status(400).send(error.message);
  }
};

module.exports = {
  getArticle,
};
