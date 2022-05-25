const { Integer } = require('json-schema');
const mongoose = require('mongoose');
const Schema = mongoose.Schema

const CommandSchema = new Schema({
    name: { type: String, required: true, unique: true },
    description: { type: String },
    invocation: [String],
    allowedValues: [String],
    allowedCommands: [String],
    allowedCommandSets: [String]
})

const CommandGroupSchema = new Schema({
    name: { type: String, required: true, unique: true },
    description: { type: String },
    invocation: [String],
    order: { type: Number, required: true, unique: true },
    allowedCommandRepetition: { type: Boolean, required: true },
    commands: [CommandSchema]
})

const LibrarySchema = new Schema({
    machineAddress: { type: String, required: true },
    image: { type: String, unique: true },
    name: { type: String, required: true, unique: true },
    commandGroups: [CommandGroupSchema]
})

module.exports = LibrarySchema