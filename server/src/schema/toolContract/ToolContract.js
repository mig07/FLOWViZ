const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ApiSchema = require("./Api");
const LibrarySchema = require("./Library");

const ToolContractSchema = new Schema({
  name: {
    type: String,
    minlength: 3,
    maxlength: 30,
    required: true,
    unique: true,
  },
  description: { type: String, minlength: 10, maxlength: 100, required: true },
  api: ApiSchema,
  library: LibrarySchema,
});

module.exports = mongoose.model("ToolContract", ToolContractSchema);
