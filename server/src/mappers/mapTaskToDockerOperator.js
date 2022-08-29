const DockerOperatorModule = require("../models/airflow/DockerOperator");
const Mounts = require("../models/airflow/Mounts");
const DockerOperator = DockerOperatorModule.DockerOperator;
const DockerOperatorParams = DockerOperatorModule.DockerOperatorParams;

function mapToTaskToDockerOperator(task) {
  const action = task.action;
  return new DockerOperator(
    (task_id = task.id),
    (operator_params = new DockerOperatorParams(
      (image = action.dockerImage),
      (api_version = action.dockerApiVersion),
      (mounts = action.dockerVolumes),
      (command = action.command),
      (auto_remove = action.dockerAutoRemove),
      (docker_url = action.dockerUrl),
      (network_mode = action.dockerNetworkMode)
    ).toJson())
  ).toJson();
}

module.exports = mapToTaskToDockerOperator;
