import Request from "./request";
import httpOptions from "./httpOptions";
import useFetch from "../hooks/useFetch";

class WorkflowService {
  constructor(baseUrl) {
    this.baseUrl = `${baseUrl}/workflow`;
  }

  getWorkflows(onError, onSuccess, loading) {
    return Request(
      this.baseUrl,
      httpOptions.getAuth(),
      onError,
      onSuccess,
      loading
    );
  }

  getWorkflow(workflowName, onError, onSuccess, loading) {
    return Request(
      `${this.baseUrl}/${workflowName}`,
      httpOptions.getAuth(),
      onError,
      onSuccess,
      loading
    );
  }

  getWorkflowRun(workflowName, runId, onError, onSuccess, loading) {
    return Request(
      `${this.baseUrl}/${workflowName}/${runId}`,
      httpOptions.getAuth(),
      onError,
      onSuccess,
      loading
    );
  }

  getWorkflowDagRunTaskInstance(
    workflowName,
    runId,
    taskId,
    onError,
    onSuccess,
    loading
  ) {
    return Request(
      `${this.baseUrl}/${workflowName}/${runId}/tasks/${taskId}`,
      httpOptions.getAuth(),
      onError,
      onSuccess,
      loading
    );
  }

  getWorkflowDagRunTaskInstanceLog(
    workflowName,
    runId,
    taskId,
    logNumber,
    onError,
    onSuccess,
    loading
  ) {
    return Request(
      `${this.baseUrl}/${workflowName}/${runId}/tasks/${taskId}/logs/${logNumber}`,
      httpOptions.getAuth(),
      onError,
      onSuccess,
      loading
    );
  }

  postWorkflow(body) {
    return useFetch(this.baseUrl, httpOptions.postAuth(body));
  }
}

export default WorkflowService;
