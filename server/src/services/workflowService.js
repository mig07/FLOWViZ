const mapTaskToDockerOperator = require("../mappers/mapTaskToDockerOperator");
const mapTaskToSimpleHttpOperator = require("../mappers/mapTaskToSimpleHttpOperator");
const ApiException = require("../exceptions/apiException");

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
   * @param {username}
   * @param {The workflow name} workflowName
   * @returns {The specified workflow}
   */
  async function getWorkflow(username, workflowName) {
    return getDbWorkflow(username, workflowName)
      .then(async (dbWorkflow) => {
        const airflowWorkflow = await getAirflowWorkflow(workflowName);

        if (!dbWorkflow) {
          throw ApiException.notFound(`Workflow ${workflowName} not found.`);
        }

        if (!airflowWorkflow) {
          throw ApiException.notFound(
            `Airflow does not have workflow ${workflow}. If you create the workflow recently, please reload this page in a minute.`
          );
        }

        const workflowRuns = await getWorkflowDagRuns(workflowName);
        const workflowSourceCode = await getWorkflowSourceCode(
          airflowWorkflow.file_token
        );
        return {
          dbWorkflow: dbWorkflow,
          airflow: {
            runs: workflowRuns,
            sourceCode: workflowSourceCode,
          },
        };
      })
      .catch((err) => {
        throw err;
      });
  }

  async function getDbWorkflow(username, workflowName) {
    return await WorkflowDb.getDbWorkflow(username, workflowName).catch(
      (err) => {
        throw err;
      }
    );
  }

  async function getWorkflowRun(username, workflowName, dagRunId) {
    return await getDbWorkflow(username, workflowName)
      .then((dbWorkflow) => {
        return Airflow.getWorkflowDagRun(workflowName, dagRunId)
          .then(async (data) => {
            const taskInstances = await Airflow.getWorkflowDagRunTaskInstances(
              workflowName,
              dagRunId
            )
              .then((taskInstances) =>
                taskInstances.task_instances.map(
                  (tInstance) => tInstance.task_id
                )
              )
              .catch((err) => {
                throw err;
              });

            return {
              executionDate: data.execution_date,
              state: data.state,
              taskInstances: taskInstances,
            };
          })
          .catch((err) => {
            throw err;
          });
      })
      .catch((err) => {
        throw err;
      });
  }

  async function getWorkflowRunTaskInstance(
    username,
    workflowName,
    dagRunId,
    taskInstanceId
  ) {
    return await getDbWorkflow(username, workflowName)
      .then((dbWorkflow) => {
        return Airflow.getWorkflowDagRunTaskInstance(
          workflowName,
          dagRunId,
          taskInstanceId
        ).catch((err) => {
          throw err;
        });
      })
      .catch((err) => {
        throw err;
      });
  }

  async function getWorkflowRunTaskInstanceLog(
    username,
    workflowName,
    dagRunId,
    taskInstanceId,
    logNumber
  ) {
    return await getDbWorkflow(username, workflowName)
      .then((dbWorkflow) => {
        return Airflow.getWorkflowDagRunTaskInstanceLog(
          workflowName,
          dagRunId,
          taskInstanceId,
          logNumber
        ).catch((err) => {
          throw err;
        });
      })
      .catch((err) => {
        throw err;
      });
  }

  /* Private methods - invoke them in methods where user authorization was
  already made */

  async function getAirflowWorkflow(workflowName) {
    return await Airflow.getWorkflow(workflowName)
      .then((workflow) => {
        if (!workflow) {
          throw ApiException.notFound(
            `The workflow ${workflowName} does not exist.`
          );
        }
        return workflow;
      })
      .catch((err) => {
        throw err;
      });
  }

  async function getWorkflowDagRuns(workflowName) {
    return await Airflow.getWorkflowDagRuns(workflowName)
      .then((data) => data.dag_runs)
      .catch((err) => {
        throw err;
      });
  }

  async function getWorkflowSourceCode(fileToken) {
    return await Airflow.getWorkflowSourceCode(fileToken).catch((err) => {
      throw err;
    });
  }

  /**
   * Sends a workflow to Apache Airflow, while formatting parameters for a
   * correct workflow system execution
   */
  async function postWorkflow(username, workflow) {
    const name = workflow.name;
    const description = workflow.description;
    const executionOrder = getExecutionOrder(workflow);
    const airflowRequest = convertToAirflowWorkflow(workflow, executionOrder);

    const dbWorkflow = {
      dag_id: name,
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
          conf: { dag_id: name, username: username },
        })
      )
      .catch((err) => {
        throw err;
      });
  }

  return {
    getWorkflows: getWorkflows,
    getWorkflow: getWorkflow,
    getWorkflowRun: getWorkflowRun,
    getWorkflowRunTaskInstance: getWorkflowRunTaskInstance,
    getWorkflowRunTaskInstanceLog: getWorkflowRunTaskInstanceLog,
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
    airflow_imports: supplyNonRedundantImportsFromTasks(tasks),
    tasks: tasks,
    execution_order: executionOrder,
  };
}

function supplyNonRedundantImportsFromTasks(tasks) {
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
  const taskMap = new Map();
  let res = "";
  workflow.tasks.forEach((task) => {
    const children = task.children;
    if (children.length > 0)
      taskMap.set(task.id, children.length === 1 ? children[0] : children);
  });

  let taskMapValues = [taskMap.keys().next().value];
  taskMap.forEach((value, key) => {
    if (!taskMapValues.includes(value)) {
      taskMapValues.push(value);
    }
  });

  taskMapValues.forEach((val, index) => {
    res += Array.isArray(val) ? `[${val}]` : val;
    if (index < taskMapValues.length - 1) res += " >> ";
  });

  return res;
}
