const onSuccess = require("./controllerUtils");
const { validationResult } = require("express-validator");
const ApiException = require("../exception/apiException");

module.exports = (workflowService) => {
  function getWorkflows(req, res, next) {
    workflowService
      .getWorkflows()
      .then((data) => onSuccess(res, data))
      .catch((err) => next(err));
  }

  function getWorkflow(req, res, next) {
    const workflowId = req.params.id;

    workflowService
      .getWorkflow(workflowId)
      .then((data) => onSuccess(res, data))
      .catch((err) => next(err));
  }

  function postWorkflow(req, res, next) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      next(ApiException.badRequest("Validation failed!"));
      return;
    }

    const workflow = req.body;

    workflowService
      .postWorkflow(workflow)
      .then((data) => onSuccess(res, data, (code = 201)))
      .catch((err) => next(err));
  }

  return {
    getWorkflows: getWorkflows,
    getWorkflow: getWorkflow,
    postWorkflow: postWorkflow,
  };
};
