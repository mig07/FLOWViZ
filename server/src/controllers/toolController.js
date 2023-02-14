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
    const tool = req.body;

    service
      .addTool(tool)
      .then((data) => onSuccess(res, data, 201))
      .catch((err) => next(err));
  }

  function updateTool(req, res, next) {
    const updatedTool = req.body;
    const toolName = req.params.name;

    service
      .updateTool(toolName, updatedTool)
      .then((data) => onSuccess(res, data))
      .catch((err) => next(err));
  }

  function deleteTool(req, res, next) {
    const toolName = req.params.name;

    service
      .deleteTool(toolName)
      .then((data) => onSuccess(res, data))
      .catch((err) => next(err));
  }

  return {
    getTools: getTools,
    getTool: getTool,
    addTool: addTool,
    updateTool: updateTool,
    deleteTool: deleteTool,
  };
};
