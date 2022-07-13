const fetch = require("node-fetch");

module.exports = () => {
  function get(url, nextAction = () => {}) {
    return fetch(url)
      .then(nextAction)
      .catch((err) => {
        throw err;
      });
  }

  function post(
    url,
    body,
    auth,
    nextAction = () => {},
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
