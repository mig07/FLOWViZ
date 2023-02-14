const { checkSchema } = require("express-validator");
const { workflowStep } = require("./models/airflow/workflow/workflow");
const ToolContract = require("./models/mongodb/tool/ToolContract");

module.exports = (
  app,
  toolController,
  workflowController,
  exceptionMiddleware,
  workflowMiddleware,
  mongooseErrorMiddleware,
  passport
) => {
  /* Library Endpoints */

  // GETs
  app.get("/tool", toolController.getTools);
  app.get("/tool/:name", toolController.getTool);

  // POSTs
  app.post("/tool", toolController.addTool);

  /* Workflow Endpoints */

  // GETs
  app.get(
    "/workflow",
    passport.authenticate("jwt", { session: false }),
    workflowController.getWorkflows
  );
  app.get(
    "/workflow/:name",
    passport.authenticate("jwt", { session: false }),
    workflowController.getWorkflow
  );

  app.get(
    "/workflow/:name/:dagRunId",
    passport.authenticate("jwt", { session: false }),
    workflowController.getWorkflowRun
  );

  app.get(
    "/workflow/:name/:dagRunId/tasks/:taskInstanceId",
    passport.authenticate("jwt", { session: false }),
    workflowController.getWorkflowRunTaskInstance
  );

  app.get(
    "/workflow/:name/:dagRunId/tasks/:taskInstanceId/logs/:logNumber",
    passport.authenticate("jwt", { session: false }),
    workflowController.getWorkflowRunTaskInstanceLog
  );

  // POSTs
  app.post(
    "/workflow",
    checkSchema(workflowStep),
    passport.authenticate("jwt", { session: false }),
    workflowMiddleware,
    workflowController.postWorkflow
  );

  // PUTs
  app.put("/tool/:name", toolController.updateTool);

  // DELETEs
  app.delete("/tool/:name", toolController.deleteTool);

  /* Mongoose specific error handler */
  app.use(mongooseErrorMiddleware);

  /* Main error handler */
  app.use(exceptionMiddleware.interceptor);
};
