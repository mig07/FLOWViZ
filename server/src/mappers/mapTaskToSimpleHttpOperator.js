const SimpleHttpOperatorModule = require("../schema/airflow/SimpleHttpOperator");
// const SimpleHttpOperator = DockerOperatorModule.DockerOperator;
// const SimpleHttpOperatorParams = DockerOperatorModule.DockerOperatorParams;

function mapTaskToSimpleHttpOperator(task) {
  //   return new SimpleHttpOperator(
  //     (id = task.id),
  //     (operator_params = new SimpleHttpOperatorParams(
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

module.exports = mapTaskToSimpleHttpOperator;
