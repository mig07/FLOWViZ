const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const LibraryAccess = new Schema({
  address: { type: String, maxlength: 60 },
  port: { type: String, maxlength: 5 },
  dockerDaemon: { type: String, maxlength: 60 },
  dockerImage: { type: String, maxlength: 60 },
  dockerContainer: { type: String, maxlength: 60 },
  dockerVolumes: [String],
});

const ApiAccess = new Schema({
  url: { type: String, maxlength: 60 },
  apiKey: { type: String, maxlength: 60 },
});

const Access = new Schema({
  _type: { type: String, maxlength: 30, required: true },
  api: ApiAccess,
  library: LibraryAccess,
});

module.exports = Access;
