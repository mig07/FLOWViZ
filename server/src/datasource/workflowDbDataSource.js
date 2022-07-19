const DbWorkflow = require("../schema/mongodb/workflow/workflow");

module.exports = () => {

  function getDbWorkflows(username) {
    return DbWorkflow.find({username: username}).select("-_id");
  }

  function getDbWorkflow(username, name) {
    return DbWorkflow.find({username: username, name: name}).select("-_id");
  }

  function postDbWorkflow(workflow) {
    return new DbWorkflow(workflow).save();
  }

  return {
    getDbWorkflows: getDbWorkflows,
    getDbWorkflow: getDbWorkflow,
    postDbWorkflow: postDbWorkflow,
  };
};
