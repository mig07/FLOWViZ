const fetch = require("node-fetch");

module.exports = () => {
  function get(url, auth) {
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: auth || "",
      },
    };

    return fetch(url, options);
  }

  function post(
    url,
    body,
    auth,
    headers = { "Content-Type": "application/json" }
  ) {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: auth || "",
      },
      body: JSON.stringify(body),
    };

    return fetch(url, options);
  }

  return {
    get: get,
    post: post,
  };
};
