const { Schema, model } = require('mongoose');

const invitationSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    lastString,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
});

module.exports = model('Invitation', invitationSchema);
