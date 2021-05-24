const mongoose = require('mongoose')

const formSchema = new mongoose.Schema ({
  username: {type: String, required: true},
  email: {type: String, required: true},
  requestType: {type: String, enum: ["featureRequest", "bugReport"], required: true},
  message: {type: String, required: true},
  completed : {type: Boolean, required: true, default: false},
}, {
  timestamps: true
});

const Form = mongoose.model('Form', formSchema);

module.exports = Form;