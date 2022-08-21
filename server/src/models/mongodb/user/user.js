const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    /* email: {
    type: String,
    minlength: 3,
    maxlength: 30,
    required: true,
    unique: true,
  }, */
    username: {
      type: String,
      minlength: 3,
      maxlength: 20,
      required: true,
      unique: true,
    },
    password: { type: String, minlength: 10, required: true },
  },
  { id: false }
);

module.exports = mongoose.model("User", UserSchema);
