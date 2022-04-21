const mongoose = require('mongoose');
const Schema = mongoose.Schema

const SimpleToolContractSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true }
})

module.export = SimpleToolContractSchema
module.exports = mongoose.model('SimpleToolContract',SimpleToolContractSchema)