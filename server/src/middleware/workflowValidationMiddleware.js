const { validationResult } = require("express-validator");
const ApiException = require("../exception/apiException");

module.exports = (req, res, next) => {
  const errors = [];
  workflow = req.body;
  workflow.forEach((step) => {
    errors.push(validationResult(step).array());
  });

  if (!errors || errors.length <= 0) {
    const errorMsgs = errors.array().map((err) => err.msg);
    next(ApiException.badRequest(errorMsgs));
    return;
  }

  next();
};
