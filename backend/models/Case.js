const { Schema, model } = require('mongoose');

const caseSchema = new Schema({
  caseNumber: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  createdBy: {
    type: String,
    required: true,
  },
  createdDate: {
    type: String,
    required: true,
    default: Date.now(),
  },
  finishedDate: {
    type: String,
  },
  assignedTo: {
    type: String,
  },
  status: {
    type: String,
    enum: ['new', 'inProgress', 'completed'],
    default: 'new',
    required: true,
  },
});

module.exports = model('Case', caseSchema);
