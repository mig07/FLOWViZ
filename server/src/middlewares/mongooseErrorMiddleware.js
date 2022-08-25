const { default: mongoose, MongooseError, Error } = require("mongoose");
const ApiException = require("../exceptions/apiException");

module.exports = (err, req, res, next) => {
  if (err instanceof ApiException) {
    next(err);
    return;
  }

  /*
  Mongoose does not provide other ways to handle errors.
  Even the type mongoose error is not exported to be used for reflection.
  */
  if (err.code && err.code === 11000) {
    next(ApiException.conflict("This model already exists"));
  }

  switch (err) {
    case err instanceof mongoose.Error.DocumentNotFoundError:
      next(ApiException.notFound("The document does not exist"));
      break;
    case err instanceof mongoose.Error.MissingSchemaError:
      next(
        ApiException.conflict("The model you trying to access does not exist")
      );
      break;
    case err instanceof mongoose.Error.ValidatorError:
      next(ApiException.conflict("Your document is not valid"));
      break;
  }

  next();
};
