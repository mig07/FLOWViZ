const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const WorkflowStepSchema = require("./workflowStep");

const WorkflowSchema = new Schema([WorkflowStepSchema]);

module.exports = mongoose.model("Workflow", WorkflowSchema);
