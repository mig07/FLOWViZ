class ApiException {
    
    constructor(statusCode, message) {
      this.statusCode = statusCode;
      this.message = message;
    }
  
    static badRequest(msg) {
      return new ApiError(400, msg);
    }
  
    static internal(msg) {
      return new ApiError(500, msg);
    }
  }
  
module.exports = ApiException;