const CustomError = require("./customError");

const globalErrorHandler = (err, req, res, next) => {
  if (err instanceof CustomError) {
    return res
      .status(err.status)
      .json({ code: err.errorCode, message: err.message });
  }
  console.log(err);
  return res.status(500).json(err);
};

module.exports = globalErrorHandler;
