const { default: mongoose } = require("mongoose");
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
    next(ApiException.conflict("This model already exists."));
  }

  switch (err.constructor) {
    case mongoose.Error.ValidationError || mongoose.Error.ValidatorError:
      next(ApiException.badRequest("Document validation failed."));
      break;
    case mongoose.Error.DocumentNotFoundError:
      next(ApiException.notFound("The document does not exist."));
      break;
    case mongoose.Error.MissingSchemaError:
      next(
        ApiException.notFound("The schema of the passed model does not exist.")
      );
      break;
  }

  next();
};
