import Request from "./request";
import httpOptions from "./httpOptions";

class WorkflowService {
  constructor(config) {
    this.baseUrl = `${config.appProtocol}://${config.address}:${config.port}/workflow`;
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
      {},
      onError,
      onSuccess,
      loading
    );
  }

  postWorkflow(body, onError, onSuccess, loading) {
    return Request(
      this.baseUrl,
      httpOptions.post(body),
      onError,
      onSuccess,
      loading
    );
  }
}

export default WorkflowService;
