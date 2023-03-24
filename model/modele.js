const mongoose = require('mongoose');

const tacheSchema = new mongoose.Schema({
  tache: {
    type: String,
    required: true
  },
  prix: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Tache', tacheSchema);
