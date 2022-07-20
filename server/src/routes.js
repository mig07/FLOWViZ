const { checkSchema } = require("express-validator");
const { workflowStep } = require("./schema/workflow/workflow");

module.exports = (
  app,
  toolController,
  workflowController,
  exceptionMiddleware,
  workflowMiddleware,
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

  // POSTs
  app.post(
    "/workflow",
    checkSchema(workflowStep),
    passport.authenticate("jwt", { session: false }),
    workflowMiddleware,
    workflowController.postWorkflow
  );

  /* Express middleware error handler */
  app.use(exceptionMiddleware.interceptor);
};
