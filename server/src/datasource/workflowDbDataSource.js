const Workflow = require("../schema/workflow/workflow");
const fetch = require("node-fetch");
require(`dotenv`).config();

const airflowUsername = process.env.AIRFLOW_USERNAME;
const airflowPassword = process.env.AIRFLOW_PASSWORD;

module.exports = (httpRequest, airflow) => {
  function getWorkflows() {
    return Workflow.find({});
  }

  function getWorkflow(id) {
    return Workflow.findOne({ id: id });
  }

  function postWorkflow(workflow) {
    const uri = `http://${airflow.address}:${airflow.port}/${airflow.base}/${airflow.dagRunGenerator}`;

    const auth = Buffer(`${airflowUsername}:${airflowPassword}`).toString(
      "base64"
    );

    return httpRequest.post(uri, workflow, `Basic ${auth}`);
  }

  return {
    getWorkflows: getWorkflows,
    getWorkflow: getWorkflow,
    postWorkflow: postWorkflow,
  };
};
