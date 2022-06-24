module.exports = (workflowDb, ApiException) => {
  async function getWorkflows() {
    return await workflowDb.getWorkflows();
  }

  async function getWorkflow(id) {
    return getOne(workflowDb.getWorkflow, id, "workflow");
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
