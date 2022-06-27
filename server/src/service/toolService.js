const ToolContract = require("../schema/toolContract/ToolContract");
const getOne = require("./serviceUtils");

module.exports = (ToolDb, ApiException) => {
  async function getTools() {
    return await ToolDb.getTools();
  }

  async function getTool(toolName) {
    return getOne(ToolDb.getTool, toolName, "tool");
  }

  async function addTool(tool) {
    const contract = new ToolContract({
      name: tool.name,
      description: tool.description,
      api: tool.api,
      library: tool.library,
    });

    return await ToolDb.addTool(contract);
  }

  return {
    getTools: getTools,
    getTool: getTool,
    addTool: addTool,
  };
};
