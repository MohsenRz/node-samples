const request = require('supertest');
const expect = require('expect');

var { Patient } = require('../models/patient');
var { Doctor } = require('../models/doctor');
var { Appointment } = require('../models/appointment')
var app = require('../server').app;

describe('patient', () => {
  const patients = [{
    fullName: 'erlich backman', male: true, disease: 'flu', age: 31,
    contactInfo: { address: { state: 'california', city: 'palo alto', street: 'unknown' }, phone: '09011111111' }
  },
  {
    fullName: 'jian yang', male: true, disease: 'flu', age: 26,
    contactInfo: { address: { state: 'california', city: 'palo alto', street: 'unknown' }, phone: '09022222222' }
  }];

  beforeEach((done) => {
    Patient.deleteMany({}).then(() => Patient.insertMany(patients))
      .then(() => done())
      .catch((err) => done(err));
  });

  it('Get /patients', (done) => {
    request(app)
      .get('/patients')
      .expect('Content-Type', /json/)
      .expect(200)
      .expect((res) => {
        expect(res.body.patients.length).toBe(2)
      })
      .end(done);
  });

  it('Post /patients', (done) => {
    request(app)
      .post('/patients')
      .send({
        fullName: 'gilfoyl', male: true, disease: 'flu', age: 29,
        contactInfo: {
          address: { state: 'california', city: 'palo alto', street: 'unknown' }, phone: '09033333333'
        }
      })
      .expect('Content-Type', /json/)
      .expect(200)
      .expect((res) => {
        expect(res.body.patient)
          .toContain({
            fullName: 'gilfoyl', male: true, disease: 'flu', age: 29,
            contactInfo: { address: { state: 'california', city: 'palo alto', street: 'unknown' }, phone: '09033333333' }
          });
      })
      .end((error, response) => {
        if (error)
          return done(error);
        Patient.find()
          .then(patients => {
            expect(patients.length).toBe(3);
            done();
          })
          .catch(err => done(err));
      });
  });
});

describe('doctor', () => {
  const doctors = [{
    fullName: 'richard hendricks', male: true, specialty: 'mind', age: 26,
    clinicContactInfo: { address: { state: 'california', city: 'palo alto', street: 'unknown' }, phone: '09011111111' }
  },
  {
    fullName: 'jared dunn', male: true, specialty: 'heart', age: 30,
    clinicContactInfo: { address: { state: 'california', city: 'palo alto', street: 'unknown' }, phone: '09022222222' }
  }];

  beforeEach((done) => {
    Doctor.deleteMany({}).then(() => Doctor.insertMany(doctors))
      .then(() => done())
      .catch((err) => done(err));
  });

  it('Get /doctors', (done) => {
    request(app)
      .get('/doctors')
      .expect('Content-Type', /json/)
      .expect(200)
      .expect((res) => {
        expect(res.body.doctors.length).toBe(2)
      })
      .end(done);
  });

  it('Post /doctors', (done) => {
    request(app)
      .post('/doctors')
      .send({
        fullName: 'danish', male: true, specialty: 'dentist', age: 29,
        clinicContactInfo: {
          address: { state: 'california', city: 'palo alto', street: 'unknown' }, phone: '09033333333'
        }
      })
      .expect('Content-Type', /json/)
      .expect(200)
      .expect((res) => {
        expect(res.body.doctor)
          .toContain({
            fullName: 'danish', male: true, specialty: 'dentist', age: 29,
            clinicContactInfo: {
              address: { state: 'california', city: 'palo alto', street: 'unknown' }, phone: '09033333333'
            }
          });
      })
      .end((error, response) => {
        if (error)
          return done(error);
        Doctor.find()
          .then(doctors => {
            expect(doctors.length).toBe(3);
            done();
          })
          .catch(eDunnrr => done(err));
      });
  });
});

describe('appointment', () => {
  var doctorId, patientId;
  beforeEach((done) => {
    Doctor.findOne().then((doctor) => {
      doctorId = doctor._id;
      return Patient.findOne()
    })
      .then((patient) => {
        patientId = patient._id;
        done();
      })
      .catch((err) => done(err));
  });

  it('Post /appointment', (done) => {
    var appointment = new Appointment({ doctorId, patientId, date: new Date(), attended: false });
    appointment.save()
      .then(() => done())
      .catch((error) => done(error));
  });

  it('Get doctor/:id/appointments', (done) => {
    request(app)
      .get(`/doctors/${doctorId}/appointments`)
      .expect(200)
      .end(done);
  });
});
