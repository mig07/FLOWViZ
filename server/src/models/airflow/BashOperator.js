class BashOperatorParams {
  bash_command;

  constructor(bash_command) {
    this.bash_command = bash_command;
  }

  toJson() {
    return {
      bash_command: this.bash_command,
    };
  }
}

class BashOperator {
  task_id;
  operator_import = "airflow.providers.docker.operators.bash";
  operator_type = "BashOperator";
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
  BashOperator,
  BashOperatorParams,
};
