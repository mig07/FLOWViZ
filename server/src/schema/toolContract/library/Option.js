const mongoose = require('mongoose');
const Schema = mongoose.Schema

const Option = new Schema({
    name: { type: String, required: true },
    arguments: { type: Array, required: true },
    valueType: { type: String, required: true }
})

module.exports = mongoose.model(Option)