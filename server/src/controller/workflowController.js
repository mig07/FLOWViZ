module.exports = (workflowService) => {
  function getWorkflows(req, res, next) {
    workflowService
      .getWorkflows()
      .then((data) => {
        res.statusCode = 200;
        res.setHeader("content-type", "application/json");
        res.end(JSON.stringify(data));
      })
      .catch((err) => next(err));
  }

  function getWorkflow(req, res, next) {
    const workflowId = req.params.id;

    workflowService
      .getWorkflow(workflowId)
      .then((data) => {
        res.statusCode = 200;
        res.setHeader("content-type", "application/json");
        res.end(JSON.stringify(data));
      })
      .catch((err) => next(err));
  }

  function postWorkflow(req, res, next) {
    const workflow = req.body;

    workflowService
      .postWorkflow(workflow)
      .then((data) => {
        res.statusCode = 201;
        res.setHeader("content-type", "application/json");
        res.end(JSON.stringify(data));
      })
      .catch((err) => next(err));
  }

  return {
    getWorkflows: getWorkflows,
    getWorkflow: getWorkflow,
    postWorkflow: postWorkflow,
  };
};
