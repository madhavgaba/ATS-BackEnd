const mongoose = require('mongoose');

const loginSchema = mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  userId: {
    type: mongoose.Types.ObjectId
  },
  attempts: {
    type: Number
  },
  passwordExpiryDate: {
    type: Date
    // required: true
  },
  role: {
    type: String
  }
});

module.exports = mongoose.model('login', loginSchema);
