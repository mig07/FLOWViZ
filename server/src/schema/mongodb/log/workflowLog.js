const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const WorkflowLogSchema = new Schema({
  username: {
    type: String,
    minlength: 3,
    maxlength: 20,
    required: true,
    unique: true,
  },
  text: {
    type: Object,
  },
});

module.exports = mongoose.model("WorkflowLog", WorkflowLogSchema);
