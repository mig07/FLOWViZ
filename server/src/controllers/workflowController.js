const onSuccess = require("./controllerUtils");
const ApiException = require("../exceptions/apiException");

module.exports = (workflowService) => {
  function getWorkflows(req, res, next) {
    const username = req.user.username;

    workflowService
      .getWorkflows(username)
      .then((data) => onSuccess(res, data))
      .catch((err) => next(err));
  }

  function getWorkflow(req, res, next) {
    const username = req.user.username;
    const workflowName = req.params.name;

    workflowService
      .getWorkflow(username, workflowName)
      .then((data) => onSuccess(res, data))
      .catch((err) => next(err));
  }

  function getWorkflowRun(req, res, next) {
    const username = req.user.username;
    const workflowName = req.params.name;
    const dagRunId = req.params.dagRunId;

    workflowService
      .getWorkflowRun(username, workflowName, dagRunId)
      .then((data) => onSuccess(res, data))
      .catch((err) => next(err));
  }

  function postWorkflow(req, res, next) {
    const username = req.user.username;
    const workflow = req.body;

    workflowService
      .postWorkflow(username, workflow)
      .then((data) => onSuccess(res, data, (code = 201)))
      .catch((err) => next(err));
  }

  return {
    getWorkflows: getWorkflows,
    getWorkflow: getWorkflow,
    getWorkflowRun: getWorkflowRun,
    postWorkflow: postWorkflow,
  };
};
