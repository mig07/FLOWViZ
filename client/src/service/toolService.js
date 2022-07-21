import Request from "./request";
import httpOptions from "./httpOptions";

class ToolService {
  constructor(config) {
    this.baseUrl = `${config.appProtocol}://${config.address}:${config.port}/tool`;
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
      httpOptions.post(),
      onError,
      onSuccess,
      loading
    );
  }
}

export default ToolService;
