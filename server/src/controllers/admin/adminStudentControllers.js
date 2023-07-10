const Student = require('../../models/Student');
const Class = require('../../models/Class');
const Dept = require('../../models/Department');
// add filters later
const fetchStudents = async (req, res) => {
  const students = await Student.find()
    .select('-password')
    .populate('class')
    .sort('usn');
  await Dept.populate(students, { path: 'class.dept' });
  res.status(200).send(students);
}

const createStudent = async (req, res) => {
  console.log(req.body)

  const studentExists = await Student.findOne({ usn: req.body.usn });
  if (studentExists)
    throw new Error('Student already exists');

  const newStudent = await Student.create(req.body);
  res.status(200).send(newStudent);
}

const editStudent = async (req, res) => {

  if (req.body.password)
    delete req.body.password;

  const { dept, year, sem, section } = req.body;
  const existingClass = await Class.findOne({ $and: [{ dept, year, sem, section }] });
  if (!existingClass)
    throw new Error("Class doesn't exist");

  delete req.body.dept;
  delete req.body.year;
  delete req.body.sem;
  delete req.body.section;

  req.body.class = existingClass._id;

  const updatedStudent = await Student.findByIdAndUpdate(req.body._id, req.body, { new: true });
  const response = await Student.findById(updatedStudent._id).populate('class');
  await Dept.populate(response, { path: 'class.dept' });

  if (!updatedStudent)
    throw new Error("User doesn't exist");

  res.status(200).send(response);
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