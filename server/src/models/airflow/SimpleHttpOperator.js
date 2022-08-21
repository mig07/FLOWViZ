class SimpleHttpOperatorParams {
  endpoint;
  data;
  header;
  response_check;

  constructor(endpoint, data, header, response_check) {
    this.endpoint = endpoint;
    this.data = data;
    this.header = header;
    this.response_check = response_check;
  }

  toJson() {
    return {
      endpoint: this.endpoint,
      data: this.data,
      header: this.header,
      response_check: this.response_check,
    };
  }
}

class SimpleHttpOperator {
  task_id;
  operator_import = "airflow.providers.http.operators.http";
  operator_type = "SimpleHttpOperator";
  operator_params = SimpleHttpOperatorParams;

  constructor(id, operator_params) {
    this.task_id = id;
    this.operator_params = operator_params;
  }

  toJson() {
    return {
      task_id: this.task_id,
      operator_import: this.operator_import,
      operator_type: this.operator_type,
      operator_params: this.operator_params,
    };
  }
}

module.exports = {
  SimpleHttpOperator,
  SimpleHttpOperatorParams,
};
