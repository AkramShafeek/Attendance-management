const Faculty = require('../../models/Faculty');
const Dept = require('../../models/Department');

// add filters later
const fetchFaculties = async (req, res) => {
  const faculties = await Faculty.find().populate('dept');
  res.status(200).send(faculties);
}

const createFaculty = async (req, res) => {
  console.log(req.body)
  if (!req.body)
    throw new Error("Empty request body");

  const facultyExists = await Faculty.findOne({ $or: [{ empid: req.body.empid }, { email: req.body.email }] });
  if (facultyExists)
    throw new Error('Faculty already exists');

  const newFaculty = await Faculty.create(req.body);
  const response = await Faculty.findById(newFaculty._id).populate('dept');
  res.status(200).send(response);
}

const editFaculty = async (req, res) => {
  if (!req.body)
    throw new Error("Empty request body");

  if (req.body.password)
    delete req.body.password;

  const updatedFaculty = await Faculty.findByIdAndUpdate(req.body._id, req.body, { new: true });

  if (!updatedFaculty)
    throw new Error("User doesn't exist");

  await Dept.populate(updatedFaculty, { path: 'dept' });

  res.status(200).send(updatedFaculty);
}

const deleteFaculty = async (req, res) => {
  if (!req.body || !req.body._id)
    throw new Error("Empty request body");

  const deletedFaculty = await Faculty.findByIdAndDelete(req.body._id);
  res.status(200).send(deletedFaculty);
}

module.exports = {
  fetchFaculties,
  createFaculty,
  editFaculty,
  deleteFaculty,
};