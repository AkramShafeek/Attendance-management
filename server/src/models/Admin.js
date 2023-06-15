const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const adminSchema = mongoose.Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
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
  password: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
    default: 'user-avatar.png',
  },
});

adminSchema.pre('save', async function (next) {
  if (!this.isModified) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = bcrypt.hash(this.password, salt);
})

adminSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
}

const Admin = mongoose.model("admins", adminSchema);

module.exports = Admin;

/**
 * What all do you need in a admin document?
 * firstname
 * lastname
 * email
 * phone
 * password
 * avatar
 */