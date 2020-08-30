const mongoose = require('mongoose');
const { Schema } = mongoose;

const logSchema = new Schema({
  container_id: {
    type: String,
    required: true
  },
  container_name: {
    type: String,
    require: true
  },
  source: {
    type: String,
    require: true
  },
  log: {
    type: String,
    require: true
  },
  time: {
    type: Date,
    require: true
  }
});

module.exports = mongoose.model('logs', logSchema);