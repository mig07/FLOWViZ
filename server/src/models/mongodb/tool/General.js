const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const General = new Schema(
  {
    name: {
      type: String,
      minlength: 3,
      maxlength: 30,
      required: true,
      unique: true,
    },
    description: { type: String, maxlength: 100 },
  },
  { _id: false }
);

module.exports = General;
