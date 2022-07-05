const { checkSchema } = require("express-validator");
const { workflowStep } = require("./schema/workflow/workflow");

module.exports = (
  app,
  toolController,
  workflowController,
  authController,
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
  app.get("/workflow", workflowController.getWorkflows);
  app.get("/workflow/:name", workflowController.getWorkflow);

  // POSTs
  app.post(
    "/workflow",
    checkSchema(workflowStep),
    workflowMiddleware,
    workflowController.postWorkflow
  );

  /* Auth Endpoints */

  // POSTs
  app.post("/register", authController.register);
  app.post("/login", authController.login);

  /* Express middleware error handler */
  app.use(exceptionMiddleware.interceptor);
};
