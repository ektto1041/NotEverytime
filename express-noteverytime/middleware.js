const AWS = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");
const { UnauthorizedError } = require("./errors/authError");

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

const profileImageUploader = multerS3({
  s3: s3,
  bucket: process.env.AWS_S3_PROFILE_BUCKET,
  acl: "public-read-write",
  key: (req, file, callback) => {
    callback(null, `${Date.now()}_${file.originalname}`);
  },
});

const articleImageUploader = multerS3({
  s3: s3,
  bucket: process.env.AWS_S3_ARTICLE_BUCKET,
  acl: "public-read-write",
  key: (req, file, callback) => {
    callback(null, `${Date.now()}_${file.originalname}`);
  },
});

const profileUpload = multer({
  dest: "uploads/profile/",
  storage: profileImageUploader,
});

const articleUpload = multer({
  dest: "uploads/article/",
  storage: articleImageUploader,
});

const isSessionMiddleware = async (req, res, next) => {
  try {
    if (req.session.isLogined) {
      console.log("isLogined");
      return next();
    } else {
      console.log("isNotLogined");
      throw new UnauthorizedError("권한 없는 사용자입니다.", 401);
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  isSessionMiddleware,
  profileUpload,
  articleUpload,
};
