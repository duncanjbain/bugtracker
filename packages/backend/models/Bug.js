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
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  project: { type: mongoose.Schema.Types.ObjectId, ref: 'Project' },
  labels: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Labels' }],
  created: {
    type: Date,
    default: Date.now,
    required: true,
  },
});

module.exports = mongoose.model('Bug', BugSchema);
