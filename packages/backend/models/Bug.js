const mongoose = require('mongoose');

const BugSchema = new mongoose.Schema({
  key: {
    type: String,
    required: true,
    unique: true,
  },
  summary: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ['defect', 'enhancement'],
    required: true,
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high'],
    required: true,
  },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, },
  assignee: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, },
  project: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true, },
  created: {
    type: Date,
    default: Date.now,
    required: true,
  },
});

module.exports = mongoose.model('Bug', BugSchema);
