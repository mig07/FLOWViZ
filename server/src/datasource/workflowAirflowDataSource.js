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

  const auth = Buffer.from(`${airflowUsername}:${airflowPassword}`).toString(
    "base64"
  );

  const authHeader = `Basic ${auth}`;

  function triggerEtl(query) {
    return httpRequest
      .post(airflowUriManager.postWorkflow(), query, authHeader)
      .catch((err) => {
        throw err;
      });
  }

  return {
    triggerEtl: triggerEtl,
  };
};
