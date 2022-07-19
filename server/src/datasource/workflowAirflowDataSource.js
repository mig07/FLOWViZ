require(`dotenv`).config();

const airflowUsername = process.env.AIRFLOW_USERNAME;
const airflowPassword = process.env.AIRFLOW_PASSWORD;

module.exports = (httpRequest, airflow) => {
  function AirflowUriManager() {
    const baseUri = `http://${airflow.address}:${airflow.port}/${airflow.base}`;
    this.getWorkflows = () => `${baseUri}`;
    this.getWorkflow = (name) => `${baseUri}/${name}`;
    this.postWorkflow = () => `${baseUri}/${airflow.dagRunGenerator}`;
  }

  const airflowUriManager = new AirflowUriManager();

  const auth = Buffer(`${airflowUsername}:${airflowPassword}`).toString(
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

  function getWorkflow(name) {
    return httpRequest
      .get(airflowUriManager.getWorkflow(name), authHeader)
      .then((data) => data.json())
      .catch((err) => {
        throw err;
      });
  }

  function postWorkflow(workflow) {
    return httpRequest
      .post(airflowUriManager.postWorkflow(), workflow, authHeader)
      .catch((err) => {
        throw err;
      });
  }

  return {
    getWorkflows: getWorkflows,
    getWorkflow: getWorkflow,
    postWorkflow: postWorkflow,
  };
};
