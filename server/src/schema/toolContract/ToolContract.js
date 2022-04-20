const mongoose = require('mongoose');
const Schema = mongoose.Schema
const ObjectId = mongoose.ObjectId


const ToolContract = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    api: { type: ObjectId },
    library: { type: ObjectId }
})

module.exports = mongoose.model('ToolContract',ToolContract)