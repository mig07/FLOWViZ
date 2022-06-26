const onSuccess = require("./controllerUtils");

module.exports = (service) => {
  function getTools(req, res, next) {
    service
      .getTools()
      .then((data) => onSuccess(res, data))
      .catch((err) => next(err));
  }

  function getTool(req, res, next) {
    const toolName = req.params.name;

    service
      .getTool(toolName)
      .then((data) => onSuccess(res, data))
      .catch((err) => next(err));
  }

  function addTool(req, res, next) {
    const body = req.body;

    if (!body) {
      next(ApiException.badRequest("The request has no body."));
    }

    const tool = body;

    service
      .addTool(tool)
      .then((data) => onSuccess(res, data, 201))
      .catch((err) => next(err));
  }

  return {
    getTools: getTools,
    getTool: getTool,
    addTool: addTool,
  };
};
