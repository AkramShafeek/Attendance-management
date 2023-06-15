const Student = require('../models/Student');

// add filters later
const fetchStudents = async (req, res) => {
  const students = await Student.find();
  res.status(200).send(students);
}

const createStudent = async (req, res) => {
  console.log(req.body)
  if (!req.body)
    throw new Error("Empty request body");

  const studentExists = await Student.findOne({ usn: req.body.usn });
  if (studentExists)
    throw new Error('Student already exists');

  const newStudent = await Student.create(req.body);
  res.status(200).send(newStudent);
}

const editStudent = async (req, res) => {
  if (!req.body)
    throw new Error("Empty request body");

  if (req.body.password)
    delete req.body.password;

  const updatedStudent = await Student.findByIdAndUpdate(req.body._id, req.body, { new: true });

  if (!updatedStudent)
    throw new Error("User doesn't exist");

  res.status(200).send(updatedStudent);
}

const deleteStudent = async (req, res) => {
  if (!req.body || !req.body._id)
    throw new Error("Empty request body");

  const deletedStudent = await Student.findByIdAndDelete(req.body._id);
  res.status(200).send(deletedStudent);
}

module.exports = {
  fetchStudents,
  createStudent,
  editStudent,
  deleteStudent,
};