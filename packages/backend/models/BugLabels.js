const mongoose = require('mongoose');

const BugLabelsSchema = new mongoose.Schema({
  labelName: {
    type: String,
    required: true,
  },
  labelDescription: {
    type: String,
    required: true,
  },
  bugsWithLabel: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Bug',
  },
});

module.exports = mongoose.model('BugLabels', BugLabelsSchema);
