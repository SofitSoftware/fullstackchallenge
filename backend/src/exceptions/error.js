module.exports = class ErrorsException extends Error {
  constructor(errors = [], code) {
    super();
    this.code = code
    this.errors = errors;
  }
}