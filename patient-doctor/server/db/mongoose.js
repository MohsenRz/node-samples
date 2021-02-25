const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost:27017/PatientApp', { useNewUrlParser: true, useFindAndModify: false });

module.exports = { mongoose };

