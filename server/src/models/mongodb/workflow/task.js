const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Task = new Schema(
  {
    task_id: {
      type: String,
      minlength: 3,
      maxlength: 30,
      required: true,
    },
    action: Object,
    children: [String],
  },
  { _id: false }
);

module.exports = Task;
