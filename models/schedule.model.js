const mongoose = require('mongoose');

const scheduleSchema = mongoose.Schema({
  date: {
    type: Date,
    required: true
  },
  time: {
    type: String,
    required: true
  },
  candidateId: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: 'candidate'
  },
  interviewerId: {
    type: mongoose.Types.ObjectId,
    required: true
  },
  jobId: {
    type: mongoose.Types.ObjectId,
    required: true
  },
  remarks: {
    type: String,
    default: 'Interview Not Taken Yet'
  },
  status: {
    type: String,
    default: 'pending'
  }
});

module.exports = mongoose.model('schdules', scheduleSchema);
