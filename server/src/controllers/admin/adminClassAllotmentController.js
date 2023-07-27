const Student = require('../../models/Student');
const ClassAllotment = require('../../models/ClassAllotment');
const Class = require('../../models/Class');
const Dept = require('../../models/Department');
const Course = require('../../models/Course');
const Faculty = require('../../models/Faculty');
// add filters later
const fetchClassAllotments = async (req, res) => {
  const { _class, faculty } = req.query;
  const queryObject = {};
  if(_class)
    queryObject.class = _class;
  console.log(queryObject);
  const classAllotments = await ClassAllotment.find(queryObject)
    .populate('class')
    .populate('faculty')
    .populate('course');
  await Dept.populate(classAllotments, { path: 'class.dept' });
  await Dept.populate(classAllotments, { path: 'faculty.dept' });
  res.status(200).send(classAllotments);
}

const createClassAllotment = async (req, res) => {
  console.log(req.body)

  const { dept, year, sem, section, courseCode, faculty } = req.body;
  const classReference = await Class.findOne({ $and: [{ dept, year, sem, section }] });
  if (!classReference)
    throw new Error("Given class doesn't exist");

  delete req.body.dept;
  delete req.body.year;
  delete req.body.sem;
  delete req.body.section;

  req.body.class = classReference._id;

  const courseReference = await Course.findOne({ courseCode });
  if (!courseReference)
    throw new Error("Given course doesn't exist");

  delete req.body.courseCode;

  req.body.course = courseReference._id;

  const facultyReference = await Faculty.findOne({ empid: faculty });
  if (!facultyReference)
    throw new Error("Given faculty doesn't exist");

  req.body.faculty = facultyReference._id;

  console.log(req.body);

  const classExists = await ClassAllotment.findOne({ $and: [{ class: req.body.class }, { course: req.body.course }] });
  if (classExists)
    throw new Error('Given allotment already exists');

  const newClassAllotment = await ClassAllotment.create(req.body);

  const response = await ClassAllotment.findById(newClassAllotment._id).populate('class').populate('course').populate('faculty');
  await Dept.populate(response, { path: 'class.dept' });
  await Dept.populate(response, { path: 'faculty.dept' });
  console.log(response);
  // await Dept.populate(response, { path: 'course.dept' });
  res.status(200).send(response);
}

const editClassAllotment = async (req, res) => {
  console.log(req.body)

  const { _id, dept, year, sem, section, courseCode, facultyDept, faculty } = req.body;
  if (!_id)
    throw new Error("Allotment id not provided");

  const classReference = await Class.findOne({ $and: [{ dept, year, sem, section }] });
  if (!classReference)
    throw new Error("Given class doesn't exist");

  delete req.body.dept;
  delete req.body.year;
  delete req.body.sem;
  delete req.body.section;

  req.body.class = classReference._id;

  const courseReference = await Course.findOne({ courseCode });
  if (!courseReference)
    throw new Error("Given course doesn't exist");

  delete req.body.courseCode;

  req.body.course = courseReference._id;

  const facultyReference = await Faculty.findOne({ $and: [{ empid: faculty }, { dept: facultyDept }] });
  if (!facultyReference)
    throw new Error("Given faculty doesn't exist");

  req.body.faculty = facultyReference._id;
  console.log(req.body);

  const classExists = await ClassAllotment.findOne({ $and: [{ class: req.body.class }, { course: req.body.course }, { faculty: req.body.faculty }] });
  if (classExists)
    throw new Error('Given allotment already exists');

  const updatedClassAllotment = await ClassAllotment.findByIdAndUpdate(_id, req.body, { new: true });

  if (!updatedClassAllotment)
    throw new Error("Given allotment doesn't exist");

  const response = await ClassAllotment.findById(updatedClassAllotment._id)
    .populate('class')
    .populate('course')
    .populate('faculty');
  await Dept.populate(response, { path: 'class.dept' });
  await Dept.populate(response, { path: 'faculty.dept' });
  await Dept.populate(response, { path: 'course.dept' });

  res.status(200).send(response);
}

const deleteClassAllotment = async (req, res) => {
  if (!req.body || !req.body._id)
    throw new Error("Empty request body");

  const deletedClassAllotment = await ClassAllotment.findByIdAndDelete(req.body._id);
  if (!deleteClassAllotment)
    throw new Error("Given allotment doesn't exist");

  res.status(200).send(deletedClassAllotment);
}

module.exports = {
  fetchClassAllotments,
  createClassAllotment,
  editClassAllotment,
  deleteClassAllotment,
};