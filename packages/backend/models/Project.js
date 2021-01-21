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
  projectMembers: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
      role: {
        type: String,
        enum: ['ADMIN', 'USER'],
        default: 'USER',
      },
    },
  ],
});

module.exports = mongoose.model('Project', ProjectSchema);
