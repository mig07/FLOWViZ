/* Api exception custom object */
const ApiException = require("./exceptions/apiException");

/* HTTP requester utility class */
const httpRequest = require("./util/httpRequest")();

module.exports = (app, accessConfig, passport, production) => {
  // Library
  const toolDb = require("./datasources/toolDbDataSource.js")();
  const toolService = require("./services/toolService.js")(
    toolDb,
    ApiException
  );
  const toolController = require("./controllers/toolController.js")(
    toolService
  );

  // Workflow
  const workflowDb = require("./datasources/workflowDbDataSource.js")();
  const airflowDataSource =
    require("./datasources/workflowAirflowDataSource.js")(
      httpRequest,
      accessConfig.airflow
    );
  const workflowService = require("./services/workflowService.js")(
    workflowDb,
    airflowDataSource,
    toolDb
  );
  const workflowController = require("./controllers/workflowController")(
    workflowService
  );

  /* Express middleware config */
  const exceptionMiddleware = require("./middlewares/exceptionMiddleware")(
    production
  );

  /* Mongoose error middleware config */
  const mongooseErrorMiddleware = require("./middlewares/mongooseErrorMiddleware");

  /* Workflow validation middleware config */
  const workflowMiddleware = require("./middlewares/workflowValidationMiddleware");

  // API's endpoints
  require("./routes.js")(
    app,
    toolController,
    workflowController,
    exceptionMiddleware,
    workflowMiddleware,
    mongooseErrorMiddleware,
    passport
  );
};
