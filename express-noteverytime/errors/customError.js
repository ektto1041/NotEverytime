class CustomError extends Error {
  constructor(message, status) {
    super();
  }
}

module.exports = CustomError;