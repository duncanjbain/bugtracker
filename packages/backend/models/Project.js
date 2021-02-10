const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
  projectKey: {
    type: String,
    required: true,
  },
  projectName: {
    type: String,
    required: true,
  },
  projectLead: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  projectBugs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Bug' }],
  projectMembers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
});

module.exports = mongoose.model('Project', ProjectSchema);
