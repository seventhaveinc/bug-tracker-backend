const mongoose = require('mongoose')

const bugSchema = new mongoose.Schema ({
  username: {type: String, required: true},
  email: {type: String, required: true},
  reproduce: {type: String, required: true},
  expectedOutcome: {type: String, required: true},
  actualOutcome: {type: String, required: true},
  status: {type: String, required: true, enum: ["reported", "in progress", "completed"], default: "reported"}
}, {
  timestamps: true
});

const Bug = mongoose.model('Bug', bugSchema);

module.exports = Bug;