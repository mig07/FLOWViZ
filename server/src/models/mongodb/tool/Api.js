const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EndpointSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    path: { type: String, required: true },
    method: { type: String, required: true },
    headers: { type: Object, required: true },
    body: { type: Object },
  },
  { _id: false }
);

module.exports = EndpointSchema;
