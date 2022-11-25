const isSessionMiddleware = async (req, res, next) => {

  if (req.session.isLogined) {
    return next();
  } else {
    return res.status(400).send("인증되지 않은 사용자");
  }
}

module.exports = {
  isSessionMiddleware
};