/** @format */
const CustomError = require('./customError');

class InputValidationError extends CustomError {
  constructor(message, status) {
    super();
    Error.captureStackTrace(this, this.constructor);
    this.name = this.constructor.name;
    this.errorCode = "INVALID_REQUIRED_INPUT";
    this.message = message || "Invalid Input";
    this.status = status || 400;
  }
}

class ParamsValidationError extends CustomError {
  constructor(message, status) {
    super();
    Error.captureStackTrace(this, this.constructor);
    this.name = this.constructor.name;
    this.errorCode = "INVALID_REQUIRED_PARAM";
    this.message = message || "Invalid Params";
    this.status = status || 400;
  }
}

module.exports = {
  InputValidationError,
  ParamsValidationError,
};
