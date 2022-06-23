const process = require("../schema/process-schema.json");

module.exports = (workflowDb, ApiException) => {
  async function getWorkflows() {
    return await workflowDb.getWorkflows();
  }

  async function getWorkflow(id) {
    return await workflowDb.getWorkflow(id);
  }

  async function postWorkflow(workflow) {
    return await workflowDb.postWorkflow(workflow);
  }

  return {
    getWorkflows: getWorkflows,
    getWorkflow: getWorkflow,
    postWorkflow: postWorkflow,
  };
};
