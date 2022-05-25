const mongoose = require('mongoose');
const Schema = mongoose.Schema

const ApiSchema = require('./Api')
const LibrarySchema = require('./Library')

const ToolContractSchema = new Schema({
    name: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    api: ApiSchema,
    library: LibrarySchema
})

module.exports = mongoose.model('ToolContract',ToolContractSchema)