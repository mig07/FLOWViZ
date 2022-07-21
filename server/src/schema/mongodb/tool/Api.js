const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EndpointSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  path: { type: String, required: true },
  method: { type: String, required: true },
  headers: { type: Object, required: true },
  body: { type: Object },
});

const ApiSchema = new Schema({
  url: { type: String, required: true },
  apiKey: { type: String, required: true },
  endpoints: [EndpointSchema],
});

module.exports = ApiSchema;
