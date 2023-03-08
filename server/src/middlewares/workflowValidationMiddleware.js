const { validationResult } = require("express-validator");
const ApiException = require("../exceptions/apiException");

module.exports = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const errorMsgs = errors.array().map((err) => err.msg);
    next(ApiException.badRequest(errorMsgs));
    return;
  }

  next();
};
