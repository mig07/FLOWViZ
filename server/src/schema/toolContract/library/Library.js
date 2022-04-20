const mongoose = require('mongoose');
const Schema = mongoose.Schema

const Argument = require('./Argument')
const Option = require('./Option')

const Library = new Schema({
    command: { type: String, required: true },
    arguments: [Argument],
    options: [Option]
})

module.exports = mongoose.model(Library)