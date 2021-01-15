const mongoose = require('mongoose');

const { Schema } = mongoose.Schema;

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
  },
  author: [{ type: Schema.Types.ObjectId, ref: 'User' }],
});

module.exports = mongoose.model('Bug', BugSchema);
