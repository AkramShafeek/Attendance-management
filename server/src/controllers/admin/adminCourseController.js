const Course = require('../../models/Course');
const Dept = require('../../models/Department');

const fetchCourse = async (req, res) => {
  const courses = await Course.find().populate('dept');
  res.status(200).send(courses);
}

const createCourse = async (req, res) => {
  const existingDept = await Dept.findById(req.body.dept);
  if (!existingDept)
    throw new Error("Dept doesn't exist");

  const newCourse = await Course.create(req.body);

  const response = await Course.findById(newCourse._id).populate('dept');

  res.status(200).send(response);
}

const editCourse = async (req, res) => {
  if (!req.body._id)
    throw new Error("Course id not provided");

  const existingDept = await Dept.findById(req.body.dept);
  if (!existingDept)
    throw new Error("Dept doesn't exist");

  const id = req.body._id;
  const updatedDept = await Course.findByIdAndUpdate(id, req.body, { new: true });

  if (!updatedDept)
    throw new Error("Course doesn't exist");

  const response = await Course.findById(updatedDept._id).populate('dept');
  res.status(200).send(response);
}

const deleteCourse = async (req, res) => {
  if (!req.body._id)
    throw new Error("Course id not provided");

  const id = req.body._id;
  const course = await Course.deleteOne({ _id: id });

  if (!course)
    throw new Error("Course doesn't exist");

  res.status(200).send(course);
}

module.exports = {
  fetchCourse,
  createCourse,
  deleteCourse,
  editCourse
}