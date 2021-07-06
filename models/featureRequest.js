const mongoose = require('mongoose')

const featureSchema = new mongoose.Schema ({
  username: {type: String, required: true},
  email: {type: String, required: true},
  title: {type: String, required: true},
  request: {type: String, required: true},
  status: {type: String, required: true, enum: ["pending", "approved", "denied", "in progress", "completed"], default: "pending"}
});

const Feature = mongoose.model('Feature', featureSchema);

module.exports = Feature;