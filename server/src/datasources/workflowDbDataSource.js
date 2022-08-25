const Workflow = require("../models/mongodb/workflow/workflow");

module.exports = () => {
  function getDbWorkflows(username) {
    return Workflow.find({ username: username }).select("-_id -__v");
  }

  function getDbWorkflow(username, workflowName) {
    return Workflow.findOne({
      username: username,
      dag_id: workflowName,
    }).select("-_id -__v");
  }

  function postDbWorkflow(workflow) {
    return new Workflow(workflow).save();
  }

  return {
    getDbWorkflows: getDbWorkflows,
    getDbWorkflow: getDbWorkflow,
    postDbWorkflow: postDbWorkflow,
  };
};
