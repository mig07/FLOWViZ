const ApiException = require("../exception/apiException");

function apiExceptionHandler(err, req, res, next) {
  console.log(err);

  if (err instanceof ApiException) {
    res.status(err.statusCode).json(err.message);
  }

  res.status(500).json("An internal error has occurred");
}

module.exports = apiExceptionHandler;
