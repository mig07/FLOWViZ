const auth = JSON.parse(localStorage.getItem("auth"));

const normalHeader = { "Content-type": "application/json" };

const authHeader = {
  "Content-type": "application/json",
  Authorization: `Bearer ${auth.jwt}`,
};

const options = (method, headers, body) => {
  return {
    method: method,
    headers: headers,
    body: body,
  };
};

const get = (headers) => options("GET", headers || normalHeader);

const post = (body, headers) => options("POST", headers || normalHeader, body);

const getAuth = () => get(authHeader);

const postAuth = (body) => post(body, authHeader);

export default {
  get,
  post,
  getAuth,
  postAuth,
};
