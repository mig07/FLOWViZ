const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ApiSchema = require("./Api");
const CommandGroupSchema = require("./Library");

const ToolContractSchema = new Schema({
  name: {
    type: String,
    minlength: 3,
    maxlength: 30,
    required: true,
    unique: true,
  },
  description: { type: String, minlength: 0, maxlength: 100 },
  library: [CommandGroupSchema],
  api: [ApiSchema],
});

module.exports = mongoose.model("ToolContract", ToolContractSchema);
