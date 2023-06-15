const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

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
    type: String,
    required: true,
  },
  timetable: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'timetables'
  },
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