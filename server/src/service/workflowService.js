const getOne = require("./serviceUtils");
const mapWorkflowReqToAirflowWorkflow = require("../mappers/mapWorkflowReqToAirflowWorkflow");

module.exports = (WorkflowDb, Airflow) => {
  /**
   * Returns a list of workflows from the data source
   * @returns {A list of workflows from the data source}
   */
  async function getWorkflows(username) {
    return await WorkflowDb.getDbWorkflows(username);
  }

  /**
   * Returns a specified workflow from the data source
   * @param {The workflow name} name
   * @returns {The specified workflow}
   */
  async function getWorkflow(username, workflowName) {
    return WorkflowDb.getDbWorkflow(username, workflowName);
  }

  /**
   * Sends a workflow to Apache Airflow, while formatting parameters for a correct
   * workflow system execution
   * @param {The workflow JSON structure} id
   */
  async function postWorkflow(username, workflow) {
    const workflowName = workflow.name;
    const executionOrder = getExecutionOrder(workflow);
    const airflowRequest = convertToAirflowWorkflow(workflow, executionOrder);

    const dbWorkflow = {
      username: username,
      name: workflowName,
      dag: airflowRequest,
    };

    // POST workflow to database
    return await WorkflowDb.postDbWorkflow(dbWorkflow)
      // Trigger Airflow to create DAG after workflow
      // was created into the database
      .then(() => Airflow.createWorkflow(workflowName))
      .catch((err) => {
        throw err;
      });
  }

  return {
    getWorkflows: getWorkflows,
    getWorkflow: getWorkflow,
    postWorkflow: postWorkflow,
  };
};

function convertToAirflowWorkflow(workflow, executionOrder) {
  const type = workflow.type;

  switch (type) {
    case "container":
      // return {
      //   conf: mapWorkflowReqToAirflowWorkflow(workflow, executionOrder),
      // };
      return mapWorkflowReqToAirflowWorkflow(workflow, executionOrder);
    case "local":
      return {};
    case "api":
      return {};
  }
}

/**
 * Gets the execution order, already formatted for the Airflow syntax
 * @param {The workflow parameter} workflow
 * @returns {Workflow's execution order string, formatted to request Airflow}
 */
function getExecutionOrder(workflow) {
  let res = [];
  workflow.tasks.forEach((step) => {
    const children = step.children;
    const parents = step.parents;
    const startNode = !parents || parents.length === 0;
    const endNode = !children || children.length === 0;

    if (endNode) {
      return;
    } else if (startNode) {
      res.push(step.id);
    }

    if (!res.includes(children)) {
      res.push(children.length === 1 ? children[0] : children);
    }
  });

  return stringifyExecutionOrder(res);
}

/**
 * Gets a stringified version of the passed array, already formatted with
 * the Airflow syntax
 * @param {The ordered array representing the workflow's execution order} execOrder
 * @returns {A stringified version of the passed array, already formatted with
 * the Airflow syntax}
 */
function stringifyExecutionOrder(execOrder) {
  let res = "";
  const lastElemIdx = execOrder.length - 1;
  execOrder.forEach((step, index, execOrder) => {
    if (index === lastElemIdx) return;
    res += Array.isArray(step) ? `[${step}]` : step;
    if (index < lastElemIdx - 1) {
      res += " >> ";
    }
  });

  return res;
}
