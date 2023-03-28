const mongoose = require('mongoose');

const schema = mongoose.Schema({
  tache: String,
  prix: Number,
  commission: String, 
  date: {
    type: Date,
    default: Date.now
  }

});

module.exports = mongoose.model('Achat', schema);

