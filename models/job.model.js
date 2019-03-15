const mongoose = require('mongoose');

const jobSchema = mongoose.Schema({
  jobId: {
    type: Number
    // required: true
  },
  category: {
    type: String,
    required: true
  },
  designation: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  blockJobId: [
    {
      type: Number
    }
  ],
  lastDate: {
    type: String
    // required: true
  },
  isOpen: {
    type: Boolean,
    default: true
  },
  paySalary: {
    type: Number
  },
  location: {
    type: String
  },
  bondDetail: {
    type: String,
    default: 'No Bond Period'
  },
  experienceRequired: {
    year: {
      type: Number
    },
    month: {
      type: Number
    }
  },
  skillsRequired: [
    {
      skillName: {
        type: String
        // required: true
      }
    }
  ],
  isComplete: {
    type: Boolean,
    default: false
  }
});
module.exports = mongoose.model('jobs', jobSchema);
