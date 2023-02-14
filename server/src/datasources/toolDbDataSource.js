const ApiException = require("../exceptions/apiException");
const ToolContract = require("../models/mongodb/tool/ToolContract");

module.exports = () => {
  function getTools() {
    return ToolContract.find().select("-_id -__v");
  }

  function getTool(toolName) {
    return ToolContract.findOne({ "general.name": toolName }).select(
      "-_id -__v"
    );
  }

  function addTool(tool) {
    return new ToolContract(tool).save();
  }

  function updateTool(toolName, updatedTool) {
    return ToolContract.replaceOne({ "general.name": toolName }, updatedTool);
  }

  function deleteTool(toolName) {
    return ToolContract.deleteOne({ "general.name": toolName });
  }

  return {
    getTools: getTools,
    getTool: getTool,
    addTool: addTool,
    updateTool: updateTool,
    deleteTool: deleteTool,
  };
};
