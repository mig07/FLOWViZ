const getOne = require("./serviceUtils");
const mapStepToDockerOperator = require("../mappers/stepToDockerOperator");

module.exports = (WorkflowDb, ApiException) => {
  /**
   * Returns a list of workflows from the data source
   * @returns {A list of workflows from the data source}
   */
  async function getWorkflows() {
    return await WorkflowDb.getWorkflows();
  }

  /**
   * Returns a specified workflow from the data source
   * @param {The workflow ID} id
   * @returns {The specified workflow}
   */
  async function getWorkflow(id) {
    return getOne(WorkflowDb.getWorkflow, id, "workflow");
  }

  /**
   * Sends a workflow to Apache Airflow, while formatting parameters for a correct
   * workflow system execution
   * @param {The workflow JSON structure} id
   */
  async function postWorkflow(workflow) {
    const executionOrder = getExecutionOrder(workflow);
    const airflowRequest = convertToAirflowRequest(workflow);
    console.log(airflowRequest);
    //return await WorkflowDb.postWorkflow(workflow);
  }

  return {
    getWorkflows: getWorkflows,
    getWorkflow: getWorkflow,
    postWorkflow: postWorkflow,
  };
};

function convertToAirflowRequest(workflow) {
  return mapStepToDockerOperator(workflow);
  /* const type = workflow.type;

  switch (type) {
    case "container":
      break;
    case "":
      break;
    default:
      break;
  } */
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
