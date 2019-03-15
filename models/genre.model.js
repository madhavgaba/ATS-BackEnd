const mongoose = require('mongoose');

const genreSchema = mongoose.Schema({
  category: {
    type: String,
    required: true
  },
  designation: [
    {
      type: String
    }
  ]
});
module.exports = mongoose.model('genre', genreSchema);
