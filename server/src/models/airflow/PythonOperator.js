class PythonOperatorParams {
  python_callable;

  constructor(python_callable) {
    this.python_callable = python_callable;
  }

  toJson() {
    return {
      python_callable: this.python_callable,
    };
  }
}

class PythonOperator {
  task_id;
  operator_import = "";
  operator_type = "PythonOperator";
  operator_params;

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
  PythonOperator,
  PythonOperatorParams,
};
