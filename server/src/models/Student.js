const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const studentSchema = mongoose.Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  usn: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  class: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'classes',
    required: true
  },
  phone: [{
    type: String
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

studentSchema.pre('save', async function (next) {
  if (!this.isModified) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
})

studentSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
}

const Student = mongoose.model("students", studentSchema);

module.exports = Student;

/**
 * What all do you need in a student document?
 * firstname
 * lastname
 * usn
 * email
 * phone
 * dept
 * year
 * sem
 * section 
 * password
 * avatar
 */

const data = {
  "firstname": "Akram",
  "lastname": "Shafeek",
  "usn": "1BM21CS013",
  "email": "akram.cs21@bmsce.ac.in",
  "phone": ["8095825227","9886465074"],
  "dept": "CSE",
  "year": 2,
  "sem": 4,
  "section ": "A",
  "password": "1234"  
}