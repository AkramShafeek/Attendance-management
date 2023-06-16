const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const ClassAllotment = require('./ClassAllotment');

const facultySchema = mongoose.Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  empid: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: [{
    type: String
  }],
  dept: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'departments',
    required: true
  },
  timetable: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'timetables'
  },
  classAllotments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'classAllotments'
  }],
  password: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
    default: 'user-avatar.png',
  },
});

facultySchema.pre('save', async function (next) {
  console.log('pre fired');
  if (!this.isModified) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
})

facultySchema.pre('deleteOne', async function (next) {

  const referenceError = 'Faculty is referenced and cannot be deleted';

  // validate class allotment references
  const existingClassAllotment = await ClassAllotment.findOne({ dept: this._id });
  if (existingClassAllotment)
    throw new Error(referenceError);

})


facultySchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
}

const Faculty = mongoose.model("faculties", facultySchema);

module.exports = Faculty;

/**
 * What all do you need in a faculty document?
 * firstname
 * lastname
 * empid
 * email
 * phone
 * dept
 * timetable
 * password
 * avatar
 */
const data = {
  "firstname": "Selva",
  "lastname": "Kumar",
  "empid": "sks123",
  "email": "selvakumar.cse@bmsce.ac.in",
  "phone": "9873495367",
  "dept": "CSE",
  "password": "12345",
}