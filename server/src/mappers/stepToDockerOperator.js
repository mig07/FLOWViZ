const DockerOperatorModule = require("../schema/airflow/DockerOperator");
const DockerOperator = DockerOperatorModule.DockerOperator;
const DockerOperatorParams = DockerOperatorModule.DockerOperatorParams;

function mapStepToDockerOperator(workflow) {
  return {
    dagId: workflow.name,
    tasks: workflow.tasks.map(
      (step) =>
        new DockerOperator({
          id: step.id,
          operator_params: new DockerOperatorParams({
            image: step.image,
            mounts: step.mounts,
            command: step.command,
            docker_url: step.docker_url,
          }),
        })
    ),
  };
}

module.exports = mapStepToDockerOperator;
