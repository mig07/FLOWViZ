const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const WorkflowLogSchema = new Schema({
  dag_id: {
    type: String,
    minlength: 3,
    maxlength: 30,
    required: true,
  },
  username: {
    type: String,
    minlength: 3,
    maxlength: 20,
    required: true,
  },
  log: {
    type: Object,
  },
});

module.exports = mongoose.model("WorkflowLog", WorkflowLogSchema);
