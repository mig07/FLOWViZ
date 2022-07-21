import Request from "./request";
import httpOptions from "./httpOptions";

class AuthService {
  constructor(config) {
    this.baseUrl = `${config.appProtocol}://${config.address}:${config.port}`;
  }

  register(body, onError, onSuccess, loading) {
    return Request(
      `${this.baseUrl}/register`,
      httpOptions.post(body),
      onError,
      onSuccess,
      loading
    );
  }

  login(body, onError, onSuccess, loading) {
    return Request(
      `${this.baseUrl}/login`,
      httpOptions.post(body),
      onError,
      onSuccess,
      loading
    );
  }

  profile(onError, onSuccess, loading) {
    return Request(
      `${this.baseUrl}/profile`,
      httpOptions.getAuth(),
      onError,
      onSuccess,
      loading
    );
  }

  logout(onError, onSuccess, loading) {
    return Request(
      `${this.baseUrl}/logout`,
      httpOptions.post,
      onError,
      onSuccess,
      loading
    );
  }
}

export default AuthService;
