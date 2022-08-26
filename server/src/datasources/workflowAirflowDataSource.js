require(`dotenv`).config();

const airflowUsername = process.env.AIRFLOW_USERNAME;
const airflowPassword = process.env.AIRFLOW_PASSWORD;

module.exports = (httpRequest, airflow) => {
  function AirflowUriManager() {
    const baseUri = `http://${airflow.address}:${airflow.port}/${airflow.base}`;
    const dags = `${baseUri}/${airflow.dags}`;
    this.getWorkflows = () => `${dags}`;
    this.getWorkflow = (name) => `${dags}/${name}`;
    this.getWorkflowDagRuns = (name) => `${dags}/${name}/dagRuns`;
    this.getWorkflowDagRun = (name, dagRunId) =>
      `${dags}/${name}/dagRuns/${dagRunId}`;
    this.getWorkflowDagRunTaskInstances = (name, dagRunId) =>
      `${dags}/${name}/dagRuns/${dagRunId}/taskInstances`;
    this.getWorkflowDagRunTaskInstance = (name, dagRunId, taskInstanceId) =>
      `${dags}/${name}/dagRuns/${dagRunId}/taskInstances/${taskInstanceId}`;
    this.getWorkflowDagRunTaskInstanceLog = (
      name,
      dagRunId,
      taskInstanceId,
      logNumber
    ) =>
      `${dags}/${name}/dagRuns/${dagRunId}/taskInstances/${taskInstanceId}/logs/${logNumber}`;
    this.postWorkflow = () => `${dags}/${airflow.dagRunGenerator}`;
    this.getWorkflowSourceCode = (fileToken) =>
      `${baseUri}/${airflow.dagSources}/${fileToken}`;
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

  function getWorkflowDagRuns(workflowName) {
    return httpRequest
      .get(airflowUriManager.getWorkflowDagRuns(workflowName), authHeader)
      .then((data) => data.json())
      .catch((err) => {
        throw err;
      });
  }

  function getWorkflowDagRun(workflowName, dagRunId) {
    return httpRequest
      .get(
        airflowUriManager.getWorkflowDagRun(workflowName, dagRunId),
        authHeader
      )
      .then((data) => data.json())
      .catch((err) => {
        throw err;
      });
  }

  function getWorkflowDagRunTaskInstances(workflowName, dagRunId) {
    return httpRequest
      .get(
        airflowUriManager.getWorkflowDagRunTaskInstances(
          workflowName,
          dagRunId
        ),
        authHeader
      )
      .then((data) => data.json())
      .catch((err) => {
        throw err;
      });
  }

  function getWorkflowDagRunTaskInstance(
    workflowName,
    dagRunId,
    taskInstanceId
  ) {
    return httpRequest
      .get(
        airflowUriManager.getWorkflowDagRunTaskInstance(
          workflowName,
          dagRunId,
          taskInstanceId
        ),
        authHeader
      )
      .then((data) => data.json())
      .catch((err) => {
        throw err;
      });
  }

  function getWorkflowDagRunTaskInstanceLog(
    workflowName,
    dagRunId,
    taskInstanceId,
    logNumber
  ) {
    return httpRequest
      .get(
        airflowUriManager.getWorkflowDagRunTaskInstanceLog(
          workflowName,
          dagRunId,
          taskInstanceId,
          logNumber
        ),
        authHeader
      )
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
    getWorkflowDagRuns: getWorkflowDagRuns,
    getWorkflowDagRun: getWorkflowDagRun,
    getWorkflowDagRunTaskInstances: getWorkflowDagRunTaskInstances,
    getWorkflowDagRunTaskInstance: getWorkflowDagRunTaskInstance,
    getWorkflowDagRunTaskInstanceLog: getWorkflowDagRunTaskInstanceLog,
    triggerEtl: triggerEtl,
  };
};
