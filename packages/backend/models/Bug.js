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
    enum: ['Defect', 'Enhancement'],
    required: true,
  },
  priority: {
    type: String,
    enum: ['Low', 'Medium', 'High'],
    required: true,
    default: 'Medium',
  },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  assignedUser: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  project: { type: mongoose.Schema.Types.ObjectId, ref: 'Project' },
  created: {
    type: Date,
    default: Date.now,
    required: true,
  },
});

module.exports = mongoose.model('Bug', BugSchema);
