const express = require('express');
const bodyParser = require('body-parser');
const { ObjectID } = require('mongodb');
const _ = require('lodash');

const mongoose = require('./db/mongoose');
const { Patient } = require('./models/patient');
const { Doctor } = require('./models/doctor');
const { Appointment } = require('./models/appointment');

var app = express();

app.use(bodyParser.json());

// PATIENT ROUTES

app.get('/patients', (request, response, next) => {
  // check to see if fullName is set as query parameter
  if (request.query.fullName)
    return next();
  // if no query parameter is set, get all patients 
  Patient.find()
    .then(patients => response.send({ patients }))
    .catch(err => response.status(400).send({ error: err.message }));
}, (request, response) => {
  // get patient by fullName
  var fullName = request.query.fullName;
  Patient.findOne({ fullName: fullName })
    .then(patient => Doctor.findById(patient.doctorId).then(doctor => response.send({ patient, doctor })))
    .catch(err => response.status(400).send({ error: err.message }));
});

app.get('/patients/:id', (request, response) => {
  var id = request.params.id;
  if (!ObjectID.isValid(id))
    return response.status(400).send({ response: 'id not valid' });
  Patient.findById(id)
    .then(patient => {
      if (patient && patient.doctorId)
        return Doctor.findById(patient.doctorId).then(doctor => response.send({ patient, doctor }))
      response.send({ patient, doctor: null });
    })
    .catch(err => response.status(400).send({ error: err.message }));
});

app.get('/patients/:id/appointments', (request, response) => {
  var patientId = request.params.id;
  if (!ObjectID.isValid(patientId))
    return response.status(400).send({ response: 'id not valid' });
  Appointment.find({ patientId })
    .then(appointment => response.send({ appointment }))
    .catch(err => response.status(400).send({ error: err.message }));
});


app.post('/patients', (request, response) => {
  var patient = new Patient(request.body);
  patient.save()
    .then(patient => response.send({ patient }))
    .catch(err => response.status(400).send({ error: err.message }));
});

app.delete('/patients/:id', (request, response) => {
  var id = request.params.id;
  if (!ObjectID.isValid(id))
    return response.status(400).send({ response: 'id not valid' });
  Patient.findByIdAndDelete(id)
    .then(patient => response.send({ patient }))
    .catch(err => response.status(400).send({ error: err.message }));
});

app.patch('/patients/:id', (request, response) => {
  var id = request.params.id;
  var body = _.pick(request.body, ['fullName', 'male', 'disease', 'age', 'contactInfo']);
  if (!ObjectID.isValid(id))
    return response.status(400).send({ response: 'id not valid' });
  Patient.findByIdAndUpdate(id, { $set: body }, { new: true })
    .then(patient => response.send({ patient }))
    .catch(err => response.status(400).send({ error: err.message }));
});

// DOCTORS ROUTES

app.get('/doctors', (request, response, next) => {
  // check to see if fullName is set as query parameter
  if (request.query.fullName)
    return next();
  // if no query parameter is set, get all doctors 
  Doctor.find()
    .then(doctors => response.send({ doctors }))
    .catch(err => response.status(400).send({ error: err.message }));
}, (request, response) => {
  // get doctor by fullName
  var fullName = request.query.fullName;
  Doctor.findOne({ fullName: fullName })
    .then(doctor => response.send({ doctor }))
    .catch(err => response.status(400).send({ error: err.message }));
});

app.get('/doctors/:id', (request, response) => {
  var id = request.params.id;
  if (!ObjectID.isValid(id))
    return response.status(400).send({ response: 'id not valid' });
  Doctor.findById(id)
    .then(doctor => response.send({ doctor }))
    .catch(err => response.status(400).send({ error: err.message }));
});

app.get('/doctors/:id/appointments', (request, response) => {
  var doctorId = request.params.id;
  if (!ObjectID.isValid(doctorId))
    return response.status(400).send({ response: 'id not valid' });
  Appointment.find({ doctorId })
    .then(appointment => response.send({ appointment }))
    .catch(err => response.status(400).send({ error: err.message }));
});

app.post('/doctors', (request, response) => {
  var doctor = new Doctor(request.body);
  doctor.save()
    .then(doctor => response.send({ doctor }))
    .catch(err => response.status(400).send({ error: err.message }));
});

app.delete('/doctors/:id', (request, response) => {
  var id = request.params.id;
  if (!ObjectID.isValid(id))
    return response.status(400).send({ response: 'id not valid' });
  Doctor.findByIdAndDelete(id)
    .then(doctor => response.send({ doctor }))
    .catch(err => response.status(400).send({ error: err.message }));
});

app.patch('/doctors/:id', (request, response) => {
  var id = request.params.id;
  var body = _.pick(request.body, ['fullName', 'male', 'specialty', 'age', 'contactInfo']);
  if (!ObjectID.isValid(id))
    return response.status(400).send({ response: 'id not valid' });
  Doctor.findByIdAndUpdate(id, { $set: body }, { new: true })
    .then(doctor => response.send({ doctor }))
    .catch(err => response.status(400).send({ error: err.message }));
});

// APOINTMENT ROUTES

app.post('/appointments', (request, response) => {
  var appointment = new Appointment(request.body);
  appointment.save()
    .then(appointment => response.send({ appointment }))
    .catch(err => response.status(400).send({ error: err.message }));
});

app.delete('/appointments/:id', (request, response) => {
  var id = request.params.id;
  if (!ObjectID.isValid(id))
    return response.status(400).send({ response: 'id not valid' });
  Appointment.findByIdAndDelete(id)
    .then(appointment => response.send({ appointment }))
    .catch(err => response.status(400).send({ error: err.message }));
});

app.listen(3000, () => console.log('Started on port 3000'));

module.exports.app = app;