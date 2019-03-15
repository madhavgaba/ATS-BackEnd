const mongoose = require('mongoose');

const applicationSchema = mongoose.Schema({
  jobId: mongoose.Types.ObjectId,
  candidateId: mongoose.Types.ObjectId,
  status: String
});

module.exports = mongoose.model('jobApplications', applicationSchema);
