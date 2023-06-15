const Faculty = require('../models/Faculty');

// add filters later
const fetchFaculties = async (req, res) => {
  const faculties = await Faculty.find();
  res.status(200).send(faculties);
}

const createFaculty = async (req, res) => {
  console.log(req.body)
  if (!req.body)
    throw new Error("Empty request body");

  const facultyExists = await Faculty.findOne({ email: req.body.email });
  if (facultyExists)
    throw new Error('Faculty already exists');

  const newFaculty = await Faculty.create(req.body);
  res.status(200).send(newFaculty);
}

const editFaculty = async (req, res) => {
  if (!req.body)
    throw new Error("Empty request body");

  if (req.body.password)
    delete req.body.password;

  const updatedFaculty = await Faculty.findByIdAndUpdate(req.body._id, req.body, { new: true });

  if (!updatedFaculty)
    throw new Error("User doesn't exist");

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