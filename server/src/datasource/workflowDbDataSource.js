const Workflow = require("../schema/workflow/workflow");

module.exports = (rabbitmq) => {
  function getWorkflows() {
    return Workflow.find({});
  }

  function getWorkflow(id) {
    return Workflow.findOne({ id: id });
  }

  function postWorkflow(workflow) {
    rabbitmq.connect("amqp://localhost", (err0, conn) => {
      if (err0) {
        throw err0;
      }

      conn.createChannel((err1, channel) => {
        if (err1) {
          throw err1;
        }

        var queue = "workflowRequests";
        var msg = workflow;

        channel.assertQueue(queue, {
          durable: false,
        });

        channel.sendToQueue(queue, Buffer.from(msg));
      });
    });
  }

  return {
    getWorkflows: getWorkflows,
    getWorkflow: getWorkflow,
    postWorkflow: postWorkflow,
  };
};
