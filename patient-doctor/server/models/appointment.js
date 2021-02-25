const mongoose = require('mongoose');
const { ObjectID } = require('mongodb');

const Appointment = mongoose.model('appointment', {
  doctorId: {
    type: ObjectID,
    required: true
  },
  patientId: {
    type: ObjectID,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  attended: {
    type: Boolean,
    required: true
  }
});

module.exports = { Appointment };
