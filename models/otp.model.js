const mongoose = require('mongoose');

const otpSchema = mongoose.Schema({
  userId: {
    type: mongoose.Types.ObjectId,
    required: true
  },
  role: {
    type: String,
    required: true
  },
  timestamp: {
    type: Date,
    required: true
  },
  valueOtp: {
    type: String,
    required: true
  },
  expiry: {
    type: String
    // required: tru  e
  }
});
module.exports = mongoose.model('otp', otpSchema);
