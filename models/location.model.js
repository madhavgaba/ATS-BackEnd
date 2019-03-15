const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema({
  location: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  pincode: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model('location', locationSchema);
