const mongoose = require('mongoose');
const Schema = mongoose.Schema

const Endpoint = require('./Endpoint')

const Api = new Schema({
    address: { type: String, required: true },
    endpoints: [endpoint]
})

module.exports = mongoose.model(Api)