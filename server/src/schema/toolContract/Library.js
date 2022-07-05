const { Integer } = require("json-schema");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CommandSchema = new Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    minlength: 10,
    maxlength: 100,
  },
  invocation: [String],
  allowedValues: [String],
  allowedCommands: [String],
  allowedCommandSets: [String],
});

const CommandGroupSchema = new Schema({
  name: {
    type: String,
    minlength: 3,
    maxlength: 30,
    required: true,
    unique: true,
  },
  description: { type: String, minlength: 10, maxlength: 100 },
  invocation: [String],
  order: { type: Number, min: 0, max: 10, required: true, unique: true },
  allowedCommandRepetition: { type: Boolean, required: true },
  commands: [CommandSchema],
});

const LibrarySchema = new Schema({
  machineAddress: { type: String, minlength: 3, maxlength: 30, required: true },
  image: { type: String, minlength: 3, maxlength: 30, unique: true },
  name: {
    type: String,
    minlength: 3,
    maxlength: 30,
    required: true,
    unique: true,
  },
  commandGroups: [CommandGroupSchema],
});

module.exports = LibrarySchema;
