const DockerOperatorModule = require("../schema/airflow/DockerOperator");
const Mounts = require("../schema/airflow/Mounts");
const DockerOperator = DockerOperatorModule.DockerOperator;
const DockerOperatorParams = DockerOperatorModule.DockerOperatorParams;

function mapToTaskToDockerOperator(task) {
  const action = task.action;
  return new DockerOperator(
    (id = task.id),
    (operator_params = new DockerOperatorParams(
      (image = action.image),
      (api_version = action.api_version),
      (mounts = action.mounts),
      (command = action.command),
      (auto_remove = action.auto_remove),
      (docker_url = action.docker_url),
      (network_mode = action.network_mode)
    ).toJson())
  ).toJson();
}

module.exports = mapToTaskToDockerOperator;
