const Operator = require("./Operator");

var SimpleHttpOperatorParams = new Object({
  endpoint: String,
  data: Object,
  header: Object,
  response_check: Object,
});

var DockerOperator = new Operator({
  id,
  operator_import: "airflow.providers.http.operators.http",
  operator_type: "SimpleHttpOperator",
  operator_params: DockerOperatorParams,
});

module.exports = DockerOperator;
