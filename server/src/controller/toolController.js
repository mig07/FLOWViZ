const onSuccess = require("./controllerUtils");

module.exports = (service) => {
  function getTools(req, res, next) {
    const type = req.query.type;

    service
      .getTools(type)
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
    const tool = req.body;

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
