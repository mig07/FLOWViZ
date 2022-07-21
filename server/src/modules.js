/* Api exception custom object */
const ApiException = require("./exception/apiException");

/* HTTP requester utility class */
const httpRequest = require("./util/httpRequest")();

module.exports = (app, accessConfig, passport) => {
  // Library
  const toolDb = require("./datasource/toolDbDataSource.js")();
  const toolService = require("./service/toolService.js")(toolDb, ApiException);
  const toolController = require("./controller/toolController.js")(toolService);

  // Workflow
  const workflowDb = require("./datasource/workflowDbDataSource.js")();
  const airflowDataSource =
    require("./datasource/workflowAirflowDataSource.js")(
      httpRequest,
      accessConfig.airflow
    );
  const workflowService = require("./service/workflowService.js")(
    workflowDb,
    airflowDataSource,
    ApiException
  );
  const workflowController = require("./controller/workflowController")(
    workflowService
  );

  /* Express middleware config */
  const exceptionMiddleware = require("./middleware/exceptionMiddleware")(
    accessConfig.dev
  );
  const workflowMiddleware = require("./middleware/workflowValidationMiddleware");

  // API's endpoints
  require("./routes.js")(
    app,
    toolController,
    workflowController,
    exceptionMiddleware,
    workflowMiddleware,
    passport
  );
};
