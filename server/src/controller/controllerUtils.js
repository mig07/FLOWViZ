function onSuccess(res, data, code = 200) {
  res.statusCode = code;
  res.setHeader("content-type", "application/json");
  res.end(JSON.stringify(data));
}

module.exports = onSuccess;
