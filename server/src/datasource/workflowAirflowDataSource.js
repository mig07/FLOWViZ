require(`dotenv`).config();

const airflowUsername = process.env.AIRFLOW_USERNAME;
const airflowPassword = process.env.AIRFLOW_PASSWORD;

module.exports = (httpRequest, airflow) => {
  function AirflowUriManager() {
    const baseUri = `http://${airflow.address}:${airflow.port}/${airflow.base}`;
    this.getWorkflows = () => `${baseUri}`;
    this.getWorkflow = (name) => `${baseUri}/${name}`;
    this.postWorkflow = () => `${baseUri}/${airflow.dagRunGenerator}`;
    this.getWorkflowSourceCode = (fileToken) =>
      `http://${airflow.address}:${airflow.port}/api/v1/dagSources/${fileToken}`;
  }

  const airflowUriManager = new AirflowUriManager();

  const auth = Buffer.from(`${airflowUsername}:${airflowPassword}`).toString(
    "base64"
  );

  const authHeader = `Basic ${auth}`;

  function getWorkflows() {
    return httpRequest
      .get(airflowUriManager.getWorkflows(), authHeader)
      .then((data) => data.json())
      .catch((err) => {
        throw err;
      });
  }

  function getWorkflow(workflowName) {
    return httpRequest
      .get(airflowUriManager.getWorkflow(workflowName), authHeader)
      .then((data) => data.json())
      .catch((err) => {
        throw err;
      });
  }

  function getWorkflowSourceCode(fileToken) {
    return httpRequest
      .get(airflowUriManager.getWorkflowSourceCode(fileToken), authHeader)
      .then((data) => data.json())
      .catch((err) => {
        throw err;
      });
  }

  function triggerEtl(body) {
    return httpRequest
      .post(airflowUriManager.postWorkflow(), body, authHeader)
      .catch((err) => {
        throw err;
      });
  }

  return {
    getWorkflowSourceCode: getWorkflowSourceCode,
    getWorkflows: getWorkflows,
    getWorkflow: getWorkflow,
    triggerEtl: triggerEtl,
  };
};
