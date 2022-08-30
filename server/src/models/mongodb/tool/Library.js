const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CommandSchema = new Schema(
  {
    name: {
      type: String,
      maxlength: 30,
      required: true,
    },
    description: {
      type: String,
      maxlength: 300,
    },
    invocation: [String],
    allowedValues: [String],
    allowedCommands: [String],
    allowedCommandSets: [String],
  },
  { _id: false }
);

const CommandGroupSchema = new Schema(
  {
    name: {
      type: String,
      maxlength: 30,
    },
    description: { type: String, maxlength: 100 },
    invocation: [String],
    order: { type: Number, max: 10, required: true },
    allowCommandRep: { type: Boolean, required: true },
    commands: [CommandSchema],
  },
  { _id: false }
);

module.exports = CommandGroupSchema;
