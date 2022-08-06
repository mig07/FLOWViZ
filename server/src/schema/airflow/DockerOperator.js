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

  toJson() {
    return {
      image: this.image,
      api_version: this.api_version,
      mounts: this.mounts,
      command: this.command,
      auto_remove: this.auto_remove,
      docker_url: this.docker_url,
      network_mode: this.network_mode,
    };
  }
}

class DockerOperator {
  task_id;
  operator_import = "airflow.providers.docker.operators.docker";
  operator_type = "DockerOperator";
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
  DockerOperator,
  DockerOperatorParams,
};
