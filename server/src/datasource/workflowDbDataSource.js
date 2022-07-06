const Workflow = require("../schema/workflow/workflow");

module.exports = () => {
  function getWorkflows() {
    return Workflow.find({});
  }

  function getWorkflow(id) {
    return Workflow.findOne({ id: id });
  }

  function postWorkflow(workflow) {}

  return {
    getWorkflows: getWorkflows,
    getWorkflow: getWorkflow,
    postWorkflow: postWorkflow,
  };
};
