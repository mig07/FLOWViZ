const DockerOperatorModule = require("../schema/airflow/DockerOperator");
const DockerOperator = DockerOperatorModule.DockerOperator;
const DockerOperatorParams = DockerOperatorModule.DockerOperatorParams;

function mapToTaskToDockerOperator(task) {
  return new DockerOperator(
    (id = task.id),
    (operator_params = new DockerOperatorParams(
      (image = task.action.image),
      (api_version = task.action.api_version),
      (mounts = task.action.mounts),
      (command = task.action.command),
      (auto_remove = task.action.auto_remove),
      (docker_url = task.action.docker_url),
      (network_mode = task.action.network_mode)
    ).toJson())
  ).toJson();
}

module.exports = mapToTaskToDockerOperator;
