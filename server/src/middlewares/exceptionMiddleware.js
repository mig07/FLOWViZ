const ApiException = require("../exceptions/apiException");

module.exports = (production) => {
  function interceptor(err, req, res, next) {
    if (!production) {
      console.log(err);
    }

    if (err instanceof ApiException) {
      res.status(err.statusCode).json(err.message);
      return;
    }

    res.status(500).json("An internal error has occurred");
    next();
  }

  return {
    interceptor: interceptor,
  };
};
