const mongoose = require('mongoose');
const Schema = mongoose.Schema

const ActionSchema = new Schema({
    toolName: { type: String, required: true },
})

const WorkflowStepSchema = new Schema({
    name: { type: String, required: true },
    action: ActionSchema,
    previousActions: [ActionSchema],
    nextActions: [ActionSchema],
})

module.exports = mongoose.model('WorkflowStep', WorkflowStepSchema)