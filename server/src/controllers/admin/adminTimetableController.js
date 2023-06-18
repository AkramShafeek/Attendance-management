const Timetable = require('../../models/TimetableData');
const FacultyTT = require('../../models/FacultyTT');
const ClassTT = require('../../models/ClassTT');

// add filters later
const fetchTimetables = async (req, res) => {
  const timetables = await ClassTT.findOne().populate('data');
  res.status(200).send(timetables);
}

const createTimetable = async (req, res) => {
  console.log(req.body)
  if (!req.body)
    throw new Error("Empty request body");
  if (!req.body.target)
    throw new Error("No target specified");

  let Target;
  if (req.body.target === 'faculty')
    Target = FacultyTT;
  else if (req.body.target === 'class')
    Target = ClassTT;
  else
    throw new Error("Invalid target");

  // yet to implement already exists logic

  const { targetData } = req.body;
  const { timetableData } = req.body;

  if(!targetData || !timetableData)
    throw new Error("Insufficient data");

  // first store time table data
  const newTimetableData = await Timetable.create(timetableData);
  // take the id as reference in target
  targetData.dataId = newTimetableData._id;  
  // store target
  const newTimetable = await Target.create(targetData);
  // return target
  res.status(200).send(newTimetable);
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