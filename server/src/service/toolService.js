const getOne = require("./serviceUtils");

module.exports = (ToolDb, ApiException) => {
  /**
   * Returns a list of tools from the data source
   * @returns {A list of tools from MongoDB}
   */
  async function getTools(type) {
    return await ToolDb.getTools(type);
  }

  /**
   * Returns a specified tool from the data source
   * @param {The specified tool's name} toolName
   * @returns {A specified tool from the data source from MongoDB}
   */
  async function getTool(toolName) {
    return getOne(ToolDb.getTool, toolName, "tool");
  }

  /**
   * Sends a new tool to MongoDB
   * @param {The tool JSON structure} tool
   */
  async function addTool(tool) {
    const contract = {
      name: tool.name,
      description: tool.description,
      library: tool.library,
      api: tool.api,
    };

    return await ToolDb.addTool(contract);
  }

  return {
    getTools: getTools,
    getTool: getTool,
    addTool: addTool,
  };
};
