const mongoose = require('mongoose');

const interviewerSchema = mongoose.Schema({
  category: {
    type: String,
    required: true
  },
  designation: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});
module.exports = mongoose.model('interviewer', interviewerSchema);
