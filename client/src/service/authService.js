import Request from "./request";
import httpOptions from "./httpOptions";
import useFetch from "../hooks/useFetch";

class AuthService {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  register(body) {
    return useFetch(`${this.baseUrl}/register`, httpOptions.post(body));
  }

  login(body) {
    return useFetch(`${this.baseUrl}/login`, httpOptions.post(body));
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
