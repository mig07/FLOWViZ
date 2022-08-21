const WorkflowLog = require("../schema/mongodb/log/workflowLog");

module.exports = () => {
  function getDbWorkflowLogs(username) {
    return WorkflowLog.find({ username: username }).select("-_id -__v");
  }

  function getDbWorkflowLog(username, workflowName) {
    return WorkflowLog.findOne({
      username: username,
      name: workflowName,
    }).select("-_id -__v");
  }

  return {
    getDbWorkflowLogs: getDbWorkflowLogs,
    getDbWorkflowLog: getDbWorkflowLog,
  };
};
