const BashOperatorModule = require("../schema/airflow/BashOperator");
const BashOperator = DockerOperatorModule.BashOperator;
const BashOperatorParams = DockerOperatorModule.BashOperatorParams;

function mapTaskToBashOperator(task) {
  //   return new BashOperator(
  //     (id = task.id),
  //     (operator_params = new BashOperatorParams(
  //       (image = task.action.image),
  //       (api_version = task.action.api_version),
  //       (mounts = task.action.mounts),
  //       (command = task.action.command),
  //       (auto_remove = task.action.auto_remove),
  //       (docker_url = task.action.docker_url),
  //       (network_mode = task.action.network_mode)
  //     ).toJson())
  //   ).toJson();
}

module.exports = mapTaskToBashOperator;
