const mongoose = require('mongoose');
const emailSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  token: {
    type: String,
    required: true
  },
  isActive: {
    type: Boolean,
    default: true
  }
});
module.exports = mongoose.model('email', emailSchema);
