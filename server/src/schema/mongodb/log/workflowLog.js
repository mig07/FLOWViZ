const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const WorkflowLogSchema = new Schema({
    text: {
        type: Object
    }
});

module.exports = mongoose.model("WorkflowLog", WorkflowLogSchema);
