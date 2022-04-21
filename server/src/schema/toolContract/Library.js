const mongoose = require('mongoose');
const Schema = mongoose.Schema

const ArgumentSchema = new Schema({
    name: { type: String, required: true },
    areOptionsAllowed: { type: Boolean, required: true },
    valueType: { type: Array }
})

const OptionSchema = new Schema({
    name: { type: String, required: true },
    arguments: { type: Array, required: true },
    valueType: { type: String, required: true }
})

const LibrarySchema = new Schema({
    machineAddress: { type: String, required: true },
    image: { type: String},
    name: { type: String, required: true },
    arguments: [ArgumentSchema],
    options: [OptionSchema]
})

module.exports = LibrarySchema