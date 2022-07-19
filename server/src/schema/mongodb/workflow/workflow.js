const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const WorkflowStepSchema = require('./workflowStep')

const WorkflowSchema = new Schema({
    name: {
        type: String,
        minlength: 3,
        maxlength: 30,
        required: true,
        unique: true,
    },
    tasks: [WorkflowStepSchema]
});

module.exports = mongoose.model("Workflow", WorkflowSchema);
