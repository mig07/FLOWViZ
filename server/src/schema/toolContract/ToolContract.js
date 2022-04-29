const mongoose = require('mongoose');
const Schema = mongoose.Schema

const SimpleToolContractSchema = require('./SimpleToolContract')
const ApiSchema = require('./Api')
const LibrarySchema = require('./Library')
const LibrarySchema2 = require('./Library2')

const ToolContractSchema = new Schema({
    name: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    api: ApiSchema,
    library: LibrarySchema2
})

module.exports = mongoose.model('ToolContract',ToolContractSchema)