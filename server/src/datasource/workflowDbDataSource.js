const Workflow = require("../schema/workflow/workflow");

module.exports = (workflowSystemConfig, fetch) => {
  function getWorkflows() {
    return Workflow.find({});
  }

  function getWorkflow(name) {
    return Workflow.findOne({ name: name });
  }

  function postWorkflow(workflow) {}

  return {
    getWorkflows: getWorkflows,
    getWorkflow: getWorkflow,
    postWorkflow: postWorkflow,
  };
};
