const DockerOperatorModule = require("../schema/airflow/DockerOperator");
const DockerOperator = DockerOperatorModule.DockerOperator;
const DockerOperatorParams = DockerOperatorModule.DockerOperatorParams;

function mapWorkflowReqToAirflowWorkflow(workflow, executionOrder) {
  return {
    dagId: workflow.name,
    tasks: workflow.tasks.map((step) => {
      return new DockerOperator(
        (id = step.id),
        (operator_params = new DockerOperatorParams(
          (image = step.action.image),
          (api_version = step.action.api_version),
          (mounts = step.action.mounts),
          (command = step.action.command),
          (auto_remove = step.action.auto_remove),
          (docker_url = step.action.docker_url),
          (network_mode = step.action.network_mode)
        ).toJson())
      ).toJson();
    }),
    execution_order: executionOrder,
  };
}

module.exports = mapWorkflowReqToAirflowWorkflow;
