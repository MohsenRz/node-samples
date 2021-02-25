const mongoose = require('mongoose');

const { ContactInfo } = require('./contactInfo');

const Doctor = mongoose.model('Doctor', {

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
  specialty: {
    type: String,
    minlength: 1,
    trim: true,
    required: true
  },
  age: {
    type: Number,
    min: 23,
    default: null
  },
  clinicContactInfo: ContactInfo
});

module.exports = { Doctor };
