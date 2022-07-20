const Workflow = require("../schema/mongodb/workflow/workflow");

module.exports = () => {
  function getDbWorkflows(username) {
    return Workflow.find({ username: username }).select("-_id");
  }

  function getDbWorkflow(username, workflowName) {
    return Workflow.findOne({ username: username, name: workflowName }).select(
      "-_id"
    );
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
