class ApiException {
  constructor(statusCode, message) {
    this.statusCode = statusCode;
    this.message = message;
  }

  static badRequest(msg) {
    return new ApiException(400, msg);
  }

  static unauthorized(msg) {
    return new ApiException(401, msg);
  }

  static notFound(msg) {
    return new ApiException(404, msg);
  }

  static conflict(msg) {
    return new ApiException(409, msg);
  }

  static internal(msg) {
    return new ApiException(500, msg);
  }
}

module.exports = ApiException;
