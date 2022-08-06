const ToolContract = require("../schema/mongodb/tool/ToolContract");

module.exports = () => {
  function getTools() {
    return ToolContract.find().select(
      "-_id -__v"
    );
  }

  function getTool(toolName) {
    return ToolContract.findOne({ name: toolName }).select("-_id -__v");
  }

  function addTool(tool) {
    return new ToolContract(tool).save();
  }

  function updateTool(toolName, updatedTool) {
    return new ToolContract.replaceOne({ name: toolName }, updatedTool);
  }

  return {
    getTools: getTools,
    getTool: getTool,
    addTool: addTool,
  };
};
