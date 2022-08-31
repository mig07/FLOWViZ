const DockerOperatorModule = require("../models/airflow/DockerOperator");
const Mounts = require("../models/airflow/Mounts");
const DockerOperator = DockerOperatorModule.DockerOperator;
const DockerOperatorParams = DockerOperatorModule.DockerOperatorParams;

function mapToTaskToDockerOperator(task, tool) {
  const action = task.action;
  const access = tool.access.library;
  return new DockerOperator(
    (task_id = task.id),
    (operator_params = new DockerOperatorParams(
      (image = access.dockerImage),
      (api_version = access.dockerApiVersion),
      (mounts = access.dockerVolumes),
      (command = action.command),
      (auto_remove = access.dockerAutoRemove),
      (docker_url = access.dockerUrl),
      (network_mode = access.dockerNetworkMode)
    ).toJson())
  ).toJson();
}

module.exports = mapToTaskToDockerOperator;
