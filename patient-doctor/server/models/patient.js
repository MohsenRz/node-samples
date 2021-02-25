
const mongoose = require('mongoose');

const { ContactInfo } = require('./contactInfo');

const Patient = mongoose.model('Patient', {
  fullName: {
    type: String,
    minlength: 1,
    trim: true,
    required: true
  },
  male: {
    type: Boolean,
    default: true,
    required: true
  },
  disease: {
    type: String,
    minlength: 1,
    trim: true,
    required: true
  },
  age: {
    type: Number,
    min: 1
  },
  contactInfo: ContactInfo
});

module.exports = { Patient };
