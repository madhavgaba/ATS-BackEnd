const mongoose = require('mongoose');

const candidateSchema = new mongoose.Schema({
  name: {
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
  },
  phoneNumber: {
    type: Number,
    required: true
  },
  experience: {
    type: Number,
    default: 0
  },
  previousEmployee: {
    type: String,
    required: true
  },
  education: {
    degree: {
      type: String,
      required: true
    },
    completionDate: {
      type: String,
      required: true
    },
    college: {
      type: String,
      required: true
    }
  },
  cgpa: {
    type: String,
    required: true
  },
  verified: {
    mobile: {
      type: Boolean,
      default: false
    },
    email: {
      type: Boolean,
      default: false
    }
  },
  resume: {
    type: String
  },
  video: {
    type: String
    // required: true
  },
  isActive: {
    type: Boolean,
    default: true
  },
  applied: {
    type: Array
  },
  residence: {
    address: {
      type: String
    },
    landmark: {
      type: String
    },
    pincode: {
      type: Number
    }
  }
});

module.exports = mongoose.model('candidate', candidateSchema);
