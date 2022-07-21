const ToolContract = require("../schema/mongodb/tool/ToolContract");

module.exports = () => {
  function getTools(type) {
    return ToolContract.find({ type: type }).select("-_id name description");
  }

  function getTool(toolName) {
    return ToolContract.findOne({ name: toolName }).select(
      "-_id name description api library"
    );
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
