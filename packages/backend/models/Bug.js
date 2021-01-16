const mongoose = require('mongoose');

const BugSchema = new mongoose.Schema({
  key: {
    type: String,
    required: true,
  },
  summary: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  priority: {
    type: String,
    required: true,
    default: 'Medium',
  },
  author: { type: String, required: true },
  project: { type: String, required: true },
  labels: [{ type: String, required: true }],
  created: {
    type: Date,
    default: Date.now,
    required: true,
  },
});

module.exports = mongoose.model('Bug', BugSchema);
