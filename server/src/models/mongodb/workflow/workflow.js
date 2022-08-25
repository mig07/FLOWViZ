const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Task = require("./task");

const AirflowDagSchema = new Schema({
  start_date: {
    type: String,
    minlength: 3,
    maxlength: 30,
    required: true,
  },
  end_date: {
    type: String,
    minlength: 3,
    maxlength: 30,
    required: true,
  },
  tasks: [Task],
});

const WorkflowSchema = new Schema({
  name: {
    type: String,
    minlength: 3,
    maxlength: 30,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    minlength: 3,
    maxlength: 50,
    required: true,
  },
  username: {
    type: String,
    minlength: 3,
    maxlength: 20,
    required: true,
  },
  dag: { type: Object, required: true }, // TODO
});

module.exports = mongoose.model("Workflow", WorkflowSchema);
