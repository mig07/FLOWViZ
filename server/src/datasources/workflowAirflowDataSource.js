module.exports = (httpRequest, airflow) => {
  const airflowBase = "api/v1";
  const airflowDags = "dags";
  const airflowDagSources = "dagSources";

  function AirflowUriManager() {
    const baseUri = `http://${airflow.address}:${airflow.port}/${airflowBase}`;
    const dags = `${baseUri}/${airflowDags}`;
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
    this.postWorkflow = () => `${dags}/${airflow.dagGenerator}/dagRuns`;
    this.getWorkflowSourceCode = (fileToken) =>
      `${baseUri}/${airflowDagSources}/${fileToken}`;
  }

  const airflowUriManager = new AirflowUriManager();

  const auth = Buffer.from(`${airflow.username}:${airflow.password}`).toString(
    "base64"
  );

  const authHeader = `Basic ${auth}`;

  function getWorkflows() {
    return httpRequest
      .get(airflowUriManager.getWorkflows(), authHeader)
      .catch((err) => {
        throw err;
      });
  }

  function getWorkflow(workflowName) {
    return httpRequest
      .get(airflowUriManager.getWorkflow(workflowName), authHeader)
      .catch((err) => {
        throw err;
      });
  }

  function getWorkflowDagRuns(workflowName) {
    return httpRequest
      .get(airflowUriManager.getWorkflowDagRuns(workflowName), authHeader)
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
      .catch((err) => {
        throw err;
      });
  }

  function getWorkflowSourceCode(fileToken) {
    return httpRequest
      .get(airflowUriManager.getWorkflowSourceCode(fileToken), authHeader)
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
