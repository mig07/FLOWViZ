const getOne = require("./serviceUtils");
const mapTaskToDockerOperator = require("../mappers/mapTaskToDockerOperator");
const mapTaskToSimpleHttpOperator = require("../mappers/mapTaskToSimpleHttpOperator");

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
    const workflow = await WorkflowDb.getDbWorkflow(username, workflowName)
      .then(async (dbWorkflow) => {
        const airflowWorkflow = await Airflow.getWorkflow(workflowName);
        const workflowSourceCode = await Airflow.getWorkflowSourceCode(
          airflowWorkflow.file_token
        );
        console.log(workflowSourceCode);
        return {
          dbWorkflow: dbWorkflow,
          airflow: airflowWorkflow,
          sourceCode: workflowSourceCode,
        };
      })
      .catch((err) => {
        throw err;
      });

    return workflow;
  }

  /**
   * Sends a workflow to Apache Airflow, while formatting parameters for a correct
   * workflow system execution
   */
  async function postWorkflow(username, workflow) {
    const id = workflow.id;
    const description = workflow.description;
    const executionOrder = getExecutionOrder(workflow);
    const airflowRequest = convertToAirflowWorkflow(workflow, executionOrder);

    const dbWorkflow = {
      dag_id: id,
      description: description,
      username: username,
      dag: airflowRequest,
    };

    // POST workflow to database
    return await WorkflowDb.postDbWorkflow(dbWorkflow)
      // Trigger Airflow to create DAG after workflow
      // was created into the database
      .then(() =>
        Airflow.triggerEtl({
          conf: { dag_id: workflow.id, username: username },
        })
      )
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
  const tasks = [];

  workflow.tasks.forEach((task) => {
    switch (task.type) {
      case "container":
        tasks.push(mapTaskToDockerOperator(task));
        break;
      case "local":
        tasks.push(mapTaskToBashOperator(task));
        break;
      case "api":
        tasks.push(mapTaskToSimpleHttpOperator(task));
        break;
    }
  });

  return {
    start_date: workflow.start_date,
    end_date: workflow.end_date,
    airflow_imports: getImportsFromTasks(tasks),
    tasks: tasks,
    execution_order: executionOrder,
  };
}

function getImportsFromTasks(tasks) {
  const importsMap = new Map();

  tasks.forEach((task) => {
    importsMap.set(task.operator_type, task.operator_import);
    Object.entries(task.operator_params).forEach(([key, val] = param) => {
      if (
        val.operator_import !== undefined &&
        val.operator_type !== undefined
      ) {
        importsMap.set(val.operator_type, val.operator_import);
      }
    });
  });

  const airflow_imports = [];

  importsMap.forEach((value, key) =>
    airflow_imports.push(`from ${value} import ${key}`)
  );

  return airflow_imports;
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
