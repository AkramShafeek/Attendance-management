const Timetable = require('../../models/TimetableData');
const FacultyTT = require('../../models/FacultyTT');
const ClassTT = require('../../models/ClassTT');
const Class = require('../../models/Class');
const Dept = require('../../models/Department');
const Course = require('../../models/Course');
const ClassAllotment = require('../../models/ClassAllotment');
const Faculty = require('../../models/Faculty');

// add filters later
const fetchTimetables = async (req, res) => {
  console.log('reached request');
  const { _class, faculty } = req.query;
  const queryObject = {};
  if (_class)
    queryObject.class = _class;

  const timetables = await ClassTT.find(queryObject).populate('class');
  await Dept.populate(timetables, { path: 'class.dept' });
  await Timetable.populate(timetables, { path: 'data' });
  const days = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
  for (let day of days) {
    for (let i = 1; i <= 9; i++) {
      // populate each period in each day;
      await ClassAllotment.populate(timetables, { path: `data.${day}._${i}` });
      await Course.populate(timetables, { path: `data.${day}._${i}.course` });
      await Faculty.populate(timetables, { path: `data.${day}._${i}.faculty` });
    }
  }
  // await ClassAllotment.populate(timetables, { path: 'data.mon._1' });
  // await Course.populate(timetables, { path: 'data.mon._1.course' });
  // await Faculty.populate(timetables, { path: 'data.mon._1.faculty' });
  console.log('reached response');
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
  const newTimetableData = new Timetable();
  await newTimetableData.save();
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
  // const updatedTimetable = await Timetable.findByIdAndUpdate(req.body._id, req.body, { new: true });

  // if (!updatedTimetable)
  //   throw new Error("User doesn't exist");
  const { timetable, day, period, classAllotment } = req.body;

  const days = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
  if (!days.includes(day))
    throw new Error("Invalid day");

  const periodParam = period.split('');
  if (periodParam[0] != '_')
    throw new Error("Invalid period");

  const periodNum = Number.parseInt(periodParam[1]);
  if (periodNum < 1 || periodNum > 9)
    throw new Error("Invalid period");

  // const periodPath = `${day}.${period}`
  const timetableDoc = await Timetable.findByIdAndUpdate(timetable, { [`${day}.${period}`] : classAllotment }, { new: true });
  // const timetableDoc = await Timetable.findById(timetable);
  if (!timetableDoc)
  throw new Error("Give timetable doesn't exist");
  // console.log(day);
  // // console.log(timetableDoc.);
  // timetableDoc[day][period] = classAllotment;
  // await timetableDoc.save();

  const responseTimetable = await ClassTT.findOne({class: req.body.class}).populate('class');
  await Dept.populate(responseTimetable, { path: 'class.dept' });
  await Timetable.populate(responseTimetable, { path: 'data' });  
  for (let day of days) {
    for (let i = 1; i <= 9; i++) {
      // populate each period in each day;
      await ClassAllotment.populate(responseTimetable, { path: `data.${day}._${i}` });
      await Course.populate(responseTimetable, { path: `data.${day}._${i}.course` });
      await Faculty.populate(responseTimetable, { path: `data.${day}._${i}.faculty` });
    }
  }

  console.log(timetableDoc);
  res.status(200).send(responseTimetable);
}

const deleteTimetable = async (req, res) => {
  // if (!req.body || !req.body._id)
  //   throw new Error("Empty request body");
  console.log(req.body);
  if (!req.body._id || !req.body.data)
    throw new Error("Timetable id not provided");
  if (!req.body.target)
    throw new Error("target not provided");

  if (req.body.target === 'class') {
    const deletedClassTT = await ClassTT.deleteOne({ _id: req.body._id });
    if (!deletedClassTT)
      throw new Error("Timetable doesn't exist");

    res.status(200).send(deletedClassTT);
  }
}

module.exports = {
  fetchTimetables,
  createTimetable,
  editTimetable,
  deleteTimetable,
};