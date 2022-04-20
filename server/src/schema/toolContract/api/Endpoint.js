const mongoose = require('mongoose');
const Schema = mongoose.Schema

const Endpoint = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    path: { type: String, required: true },
    method: { type: String, required: true },
    headers: { type: Object },
    body: { type: Object }
})

module.exports = mongoose.model(Endpoint)