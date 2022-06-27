module.exports = (WorkflowDb, ApiException) => {
  async function getWorkflows() {
    return await WorkflowDb.getWorkflows();
  }

  async function getWorkflow(id) {
    return getOne(WorkflowDb.getWorkflow, id, "workflow");
  }

  async function postWorkflow(workflow) {
    return await WorkflowDb.postWorkflow(workflow);
  }

  return {
    getWorkflows: getWorkflows,
    getWorkflow: getWorkflow,
    postWorkflow: postWorkflow,
  };
};
