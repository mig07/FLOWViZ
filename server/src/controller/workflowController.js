const onSuccess = require("./controllerUtils");
const ApiException = require("../exception/apiException");

module.exports = (workflowService) => {
  function getWorkflows(req, res, next) {
    workflowService
      .getWorkflows()
      .then((data) => onSuccess(res, data))
      .catch((err) => next(err));
  }

  function getWorkflow(req, res, next) {
    const name = req.params.name;

    workflowService
      .getWorkflow(name)
      .then((data) => onSuccess(res, data))
      .catch((err) => next(err));
  }

  function postWorkflow(req, res, next) {
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
