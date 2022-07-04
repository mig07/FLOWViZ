module.exports = (WorkflowDb, ApiException) => {
  async function getWorkflows() {
    return await WorkflowDb.getWorkflows();
  }

  async function getWorkflow(id) {
    return getOne(WorkflowDb.getWorkflow, id, "workflow");
  }

  async function postWorkflow(workflow) {
    const executionOrder = getExecutionOrder(workflow);
    console.log(executionOrder);
    return await WorkflowDb.postWorkflow(workflow);
  }

  function getExecutionOrder(workflow) {
    let res = [];
    workflow.forEach((step) => {
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

  return {
    getWorkflows: getWorkflows,
    getWorkflow: getWorkflow,
    postWorkflow: postWorkflow,
  };
};
