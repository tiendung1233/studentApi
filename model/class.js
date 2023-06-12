const mongoose = require('mongoose');

const classSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  teacher: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Class', classSchema);
