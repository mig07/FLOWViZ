const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const General = require("./General");
const Access = require("./Access");
const ApiSchema = require("./Api");
const CommandGroupSchema = require("./Library");

const ToolContractSchema = new Schema({
  general: General,
  access: Access,
  library: [CommandGroupSchema],
  api: [ApiSchema],
});

module.exports = mongoose.model("ToolContract", ToolContractSchema);
