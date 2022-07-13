const Workflow = require("../schema/workflow/workflow");

module.exports = (httpRequest, airflow) => {
  function getWorkflows() {
    return Workflow.find({});
  }

  function getWorkflow(id) {
    return Workflow.findOne({ id: id });
  }

  function postWorkflow(workflow) {
    const uri = `http://${airflow.address}:${airflow.port}/${airflow.base}/${airflow.dagRunGenerator}`;
    return httpRequest.post(uri, workflow);
  }

  return {
    getWorkflows: getWorkflows,
    getWorkflow: getWorkflow,
    postWorkflow: postWorkflow,
  };
};
