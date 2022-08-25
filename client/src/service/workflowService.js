import Request from "./request";
import httpOptions from "./httpOptions";

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

  postWorkflow(body, onError, onSuccess, loading) {
    return Request(
      this.baseUrl,
      httpOptions.postAuth(body),
      onError,
      onSuccess,
      loading
    );
  }
}

export default WorkflowService;
