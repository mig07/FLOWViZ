const Operator = require("./Operator");

class DockerOperatorParams {
  image;
  api_version;
  mounts;
  command;
  auto_remove;
  docker_url;
  network_mode;

  constructor(
    image,
    api_version,
    mounts,
    command,
    auto_remove,
    docker_url,
    network_mode
  ) {
    this.image = image;
    this.api_version = api_version;
    this.mounts = mounts;
    this.command = command;
    this.auto_remove = auto_remove;
    this.docker_url = docker_url;
    this.network_mode = network_mode;
  }
}

class DockerOperator {
  id;
  operator_import = "airflow.providers.docker.operators.docker";
  operator_type = "DockerOperator";
  operator_params;

  constructor(id, operator_params = DockerOperatorParams) {
    this.id = id;
    this.operator_params = operator_params;
  }
}

module.exports = {
  DockerOperator,
  DockerOperatorParams,
};
