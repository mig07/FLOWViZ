import Request from "./request";
import httpOptions from "./httpOptions";

class ToolService {
  constructor(baseUrl) {
    this.baseUrl = `${baseUrl}/tool`;
  }

  getTools(onError, onSuccess, loading) {
    return Request(this.baseUrl, {}, onError, onSuccess, loading);
  }

  getTool(toolName, onError, onSuccess, loading) {
    return Request(
      `${this.baseUrl}/${toolName}`,
      {},
      onError,
      onSuccess,
      loading
    );
  }

  postTool(body, onError, onSuccess, loading) {
    return Request(
      this.baseUrl,
      httpOptions.post(body),
      onError,
      onSuccess,
      loading
    );
  }
}

export default ToolService;
