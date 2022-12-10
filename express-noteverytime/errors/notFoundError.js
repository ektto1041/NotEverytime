const CustomError = require("./customError");

class NotFoundLecture extends CustomError {
  constructor(message, status) {
    super();
    Error.captureStackTrace(this, this.constructor);
    this.name = this.constructor.name;
    this.errorCode = "NOT_FOUND_LECTURE";
    this.message = message || "Not Found Lecture";
    this.status = status || 404;
  }
}

class NotFoundUserLecture extends CustomError {
  constructor(message, status) {
    super();
    Error.captureStackTrace(this, this.constructor);
    this.name = this.constructor.name;
    this.errorCode = "NOT_FOUND_USER_LECTURE";
    this.message = message || "Not Found User Lecture";
    this.status = status || 404;
  }
}

class NotFoundArticle extends CustomError {
  constructor(message, status) {
    super();
    Error.captureStackTrace(this, this.constructor);
    this.name = this.constructor.name;
    this.errorCode = "NOT_FOUND_ARTICLE";
    this.message = message || "Not Found Article";
    this.status = status || 404;
  }
}

class NotFoundComment extends CustomError {
  constructor(message, status) {
    super();
    Error.captureStackTrace(this, this.constructor);
    this.name = this.constructor.name;
    this.errorCode = "NOT_FOUND_COMMENT";
    this.message = message || "Not Found Comment";
    this.status = status || 404;
  }
}

module.exports = {
  NotFoundLecture,
  NotFoundUserLecture,
  NotFoundArticle,
  NotFoundComment,
};
