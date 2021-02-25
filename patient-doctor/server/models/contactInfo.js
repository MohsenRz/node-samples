const mongoose = require('mongoose');

const ContactInfo = mongoose.model('ContactInfo', {
  phone: {
    type: String,
    trim: true,
    minlength: 11,
    maxlength: 11,
    default: null
  },
  address: {
    type: {
      state: String,
      city: String,
      street: String
    },
    default: null
  }
});

module.exports = { ContactInfo: ContactInfo.schema };