const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Task = require("./task");

const WorkflowSchema = new Schema({
  name: {
    type: String,
    minlength: 3,
    maxlength: 30,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    minlength: 3,
    maxlength: 20,
    required: true,
  },
  tasks: [Task],
});

module.exports = mongoose.model("Workflow", WorkflowSchema);
