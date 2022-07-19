const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Task = new Schema({
    id: {
        type: String,
        minlength: 3,
        maxlength: 30,
        required: true,
        unique: true,
    },
    action: {
        type: Object
    },
    parents: {
        type: Array
    },
    children: {
        type: Array
    }
})

const WorkflowStepSchema = new Schema({
    name: {
        type: String,
        minlength: 3,
        maxlength: 30,
        required: true,
        unique: true,
    },
    tasks: [Task],
});

module.exports = { WorkflowStepSchema }
