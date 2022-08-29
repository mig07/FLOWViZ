const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DockerVolume = new Schema(
  {
    source: { type: String, maxlength: 256 },
    target: { type: String, maxlength: 256 },
    _type: { type: String, enum: ["bind"] },
  },
  { _id: false }
);

const LibraryAccess = new Schema(
  {
    address: { type: String, maxlength: 60 },
    port: { type: String, maxlength: 5 },
    dockerUrl: { type: String, maxlength: 60 },
    dockerImage: { type: String, maxlength: 60 },
    dockerContainer: { type: String, maxlength: 60 },
    dockerVolumes: [DockerVolume],
    dockerAutoRemove: { type: Boolean },
    dockerNetworkMode: { type: String, enum: ["bridge", "None"] },
    dockerApiVersion: { type: String, enum: ["auto"] },
  },
  { _id: false }
);

const ApiAccess = new Schema(
  {
    url: { type: String, maxlength: 60 },
    apiKey: { type: String, maxlength: 60 },
  },
  { _id: false }
);

const Access = new Schema(
  {
    _type: {
      type: String,
      enum: ["local", "container", "api"],
      required: true,
    },
    api: ApiAccess,
    library: LibraryAccess,
  },
  { _id: false }
);

module.exports = Access;
