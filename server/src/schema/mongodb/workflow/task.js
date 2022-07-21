const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Task = new Schema({
  id: {
    type: String,
    minlength: 3,
    maxlength: 30,
    required: true,
  },
  action: Object,
  parents: [String],
  children: [String],
});

module.exports = Task;
