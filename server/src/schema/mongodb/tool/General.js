const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const General = new Schema({
  name: {
    type: String,
    minlength: 3,
    maxlength: 30,
    required: true,
    unique: true,
  },
  description: { type: String, minlength: 0, maxlength: 100 },
});

module.exports = General;
