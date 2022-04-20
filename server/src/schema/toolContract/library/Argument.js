const mongoose = require('mongoose');
const Schema = mongoose.Schema

const Argument = new Schema({
    name: { type: String, required: true },
    areOptionsAllowed: { type: Boolean, required: true },
    valueType: { type: Array }
})

module.exports = mongoose.model(Argument)