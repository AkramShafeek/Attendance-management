const Timetable = require('../../models/TimetableData');
const FacultyTT = require('../../models/FacultyTT');
const ClassTT = require('../../models/ClassTT');
const Class = require('../../models/Class');
const Dept = require('../../models/Department');

// add filters later
const fetchTimetables = async (req, res) => {
  const timetables = await ClassTT.find().populate('class');
  await Dept.populate(timetables, { path: 'class.dept' });
  res.status(200).send(timetables);
}

const createTimetable = async (req, res) => {
  console.log(req.body)
  const payload = {};
  if (!req.body)
    throw new Error("Empty request body");
  if (!req.body.target)
    throw new Error("No target specified");

  let Target;
  if (req.body.target === 'faculty') {
    Target = FacultyTT;
    // Target.faculty = req.body.faculty;
  }
  else if (req.body.target === 'class') {
    const { dept, year, sem, section } = req.body;
    const classRef = await Class.findOne({ $and: [{ dept, sem, year, section }] });
    if (!classRef)
      throw new Error("Class not available");
    const existingTT = await ClassTT.findOne({ class: classRef });
    if (existingTT)
      throw new Error("Timetable already exists");
    payload.class = classRef;
    Target = ClassTT;
  }
  else
    throw new Error("Invalid target");

  // yet to implement already exists logic

  const { targetData } = req.body;
  const { timetableData } = req.body;

  // if (!targetData || !timetableData)
  //   throw new Error("Insufficient data");

  // first store time table data
  const newTimetableData = await Timetable.create(payload);
  // take the id as reference in target
  payload.data = newTimetableData._id;
  // store target
  const newTimetable = await Target.create(payload);

  const response = await Target.findById(newTimetable._id);
  if (req.body.target === 'class') {
    await Class.populate(response, { path: 'class' });
    await Dept.populate(response, { path: 'class.dept' });
  }

  // return response
  res.status(200).send(response);
}

const editTimetable = async (req, res) => {
  // if (!req.body)
  //   throw new Error("Empty request body");

  // if (req.body.password)
  //   delete req.body.password;

  // const updatedTimetable = await Timetable.findByIdAndUpdate(req.body._id, req.body, { new: true });

  // if (!updatedTimetable)
  //   throw new Error("User doesn't exist");

  // res.status(200).send(updatedTimetable);
}

const deleteTimetable = async (req, res) => {
  // if (!req.body || !req.body._id)
  //   throw new Error("Empty request body");

  // const deletedTimetable = await Timetable.findByIdAndDelete(req.body._id);
  // res.status(200).send(deletedTimetable);
}

module.exports = {
  fetchTimetables,
  createTimetable,
  editTimetable,
  deleteTimetable,
};