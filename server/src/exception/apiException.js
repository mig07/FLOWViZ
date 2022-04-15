class ApiException {
    
    constructor(statusCode, message) {
      this.statusCode = statusCode;
      this.message = message;
    }
  
    static badRequest(msg) {
      return new ApiException(400, msg);
    }

    static notFound(msg) {
      return new ApiException(404, msg);
    }
  
    static internal(msg) {
      return new ApiException(500, msg);
    }
  }
  
module.exports = ApiException;