const getOne = require("./serviceUtils");

module.exports = (ToolDb, ApiException) => {
  /**
   * Returns a list of tools from the data source
   * @returns {A list of tools from MongoDB}
   */
  async function getTools() {
    return await ToolDb.getTools().then((tools) =>
      tools.map((tool) => {
        return {
          name: tool.general.name,
          description: tool.general.description,
        };
      })
    );
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
    return await ToolDb.addTool(tool);
  }

  /**
   * Updates an existing tool, provided the tool's name and the new tool's json
   * contract
   * @param {The specified tool's name} toolName
   * @param {The updated tool's JSON contract (sent inside the request body)} tool
   */
  async function updateTool(toolName, tool) {
    return await ToolDb.updateTool(toolName, tool);
  }

  /**
   * Deletes an existing tool, provided the tool's name
   * @param {The specified tool's name} toolName
   */
  async function deleteTool(toolName) {
    return await ToolDb.deleteTool(toolName);
  }

  return {
    getTools: getTools,
    getTool: getTool,
    addTool: addTool,
    updateTool: updateTool,
    deleteTool: deleteTool,
  };
};
