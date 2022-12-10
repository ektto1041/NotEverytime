const CustomError = require('./customError');

class UnauthenticatedError extends CustomError {
  constructor(message, status) {
    super();
    Error.captureStackTrace(this, this.constructor);
    this.name = this.constructor.name;
    this.errorCode = "UNAUTHENTICATED_USER"
    this.message = message || "Unauthorized Access";
    this.status = status || 402;
  }
}

class UnauthorizedError extends CustomError {
  constructor(message, status) {
    super();
    Error.captureStackTrace(this, this.constructor);
    this.name = this.constructor.name;
    this.errorCode = "UNAUTHORIZED_USER"
    this.message = message || "Unauthorized Access";
    this.status = status || 401;
  }
}

class DuplicatedAuthError extends CustomError {
  constructor(message, status) {
    super();
    Error.captureStackTrace(this, this.constructor);
    this.name = this.constructor.name;
    this.errorCode = "DUPLICATED_AUTH"
    this.message = message || "Duplicated Auth";
    this.status = status || 409;
  }
}

class DuplicatedAccountError extends CustomError {
  constructor(message, status) {
    super();
    Error.captureStackTrace(this, this.constructor);
    this.name = this.constructor.name;
    this.errorCode = "DUPLICATED_ACCOUNT"
    this.message = message || "Duplicated Account";
    this.status = status || 409;
  }
}

class InvalidLectureAuth extends CustomError {
  constructor(message, status) {
    super();
    Error.captureStackTrace(this, this.constructor);
    this.name = this.constructor.name;
    this.errorCode = "INVALID_LECTURE_AUTH"
    this.message = message || "Invalid Lecture Auth";
    this.status = status || 400;
  }
}

module.exports = {
  UnauthenticatedError,
  UnauthorizedError,
  DuplicatedAuthError,
  DuplicatedAccountError,
  InvalidLectureAuth
}