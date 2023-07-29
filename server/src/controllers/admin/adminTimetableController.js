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
  const { _class, faculty, target } = req.query;
  if (!target)
    throw new Error("Target not specified");

  var Target;
  if (target === 'class')
    Target = ClassTT;
  else if (target === 'faculty')
    Target = FacultyTT;
  else
    throw new Error("Invalid target");

  const queryObject = {};
  if (_class)
    queryObject.class = _class;
  if (faculty)
    queryObject.faculty = faculty;

  const timetables = await Target.find(queryObject).populate(target);
  await Dept.populate(timetables, { path: `${target}.dept` });
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
    if (!req.body.facultyId)
      throw new Error("Faculty id not provided");
    const facultyRef = await Faculty.findOne({ empid: req.body.facultyId });
    if (!facultyRef)
      throw new Error("Faculty doesn't exist");
    const existingTT = await FacultyTT.findOne({ faculty: facultyRef._id });
    if (existingTT)
      throw new Error("Timetable already exists");
    payload.faculty = facultyRef._id;
    Target = FacultyTT;
  }
  else if (req.body.target === 'class') {
    const { dept, year, sem, section } = req.body;
    const classRef = await Class.findOne({ $and: [{ dept, sem, year, section }] });
    if (!classRef)
      throw new Error("Class not available");
    console.log(classRef);
    const existingTT = await ClassTT.findOne({ class: classRef._id });
    if (existingTT)
      throw new Error("Timetable already exists");
    payload.class = classRef;
    Target = ClassTT;
  }
  else
    throw new Error("Invalid target");  

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
  else {
    await Faculty.populate(response, { path: 'faculty' });
    await Dept.populate(response, { path: 'faculty.dept' });
    // delete response.faculty.password;
    response.faculty.password = undefined;
  }
  console.log(response);
  // return response
  res.status(200).send(response);
}

const editTimetable = async (req, res) => {

  const { timetable, day, period, classAllotment, target, } = req.body;

  if (target !== 'faculty' && target !== 'class')
    throw new Error("Invalid target");

  const days = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
  if (!days.includes(day))
    throw new Error("Invalid day");

  const periodParam = period.split('');
  if (periodParam[0] != '_')
    throw new Error("Invalid period");

  const periodNum = Number.parseInt(periodParam[1]);
  if (periodNum < 1 || periodNum > 9)
    throw new Error("Invalid period");

  // if target is class, I have to check for vacancy in
  // the respective faculty's timetable  
  if (target === 'class') {
    const { faculty } = await ClassAllotment.findOne({ _id: classAllotment }).select('faculty');
    const facultyTimetable = await FacultyTT.findOne({ faculty: faculty });
    if(!facultyTimetable)
      throw new Error("The respective faculty doesn't have a timetable, kindly create one before scheduling a class");
    await Timetable.populate(facultyTimetable, { path: 'data' });
    if (facultyTimetable.data[day][period] && facultyTimetable.data[day][period] !== classAllotment) {
      const clashingAllotment = await ClassAllotment.findOne({ _id: facultyTimetable.data[day][period] })
        .populate('class')
        .populate('course')
        .populate('faculty');
        throw new Error(`Allotment clashing with Period: ${clashingAllotment.course.courseShortName} \nFaculty: ${clashingAllotment.faculty.firstname} \nin class ${clashingAllotment.class.sem} ${clashingAllotment.class.section}, kindly resolve`);
    }
    // no clash errors, changes can be reflected in
    // respective faculty's timetable

    // get the respective faculty's timetable
    const updatedFacultyTT = await Timetable.findByIdAndUpdate(facultyTimetable.data._id,{ [`${day}.${period}`]: classAllotment }, { new: true });    
  }

  // if target is faculty, I have to check for vacancy in
  // the respective class's timetable
  else if (target === 'faculty') {
    const classRef = await ClassAllotment.findOne({ _id: classAllotment }).select('class');
    console.log(classRef)
    const classTimetable = await ClassTT.findOne({ class: classRef.class });
    if(!classTimetable)
      throw new Error("The respective class doesn't have a timetable, kindly create one before scheduling a class");
    await Timetable.populate(classTimetable, { path: 'data' });
    if (classTimetable.data[day][period] && classTimetable.data[day][period] !== classAllotment) {
      const clashingAllotment = await ClassAllotment.findOne({ _id: classTimetable.data[day][period] })
        .populate('class')
        .populate('course')
        .populate('faculty');
      throw new Error(`Allotment clashing with Period: ${clashingAllotment.course.courseShortName} \nFaculty: ${clashingAllotment.faculty.firstname} \nin class ${clashingAllotment.class.sem} ${clashingAllotment.class.section}, kindly resolve`);
    }
    // no clash errors, changes can be reflected in
    // respective class's timetable
    const updatedClassTT = await Timetable.findByIdAndUpdate(classTimetable.data._id,{ [`${day}.${period}`]: classAllotment }, { new: true });    
  }

  const timetableDoc = await Timetable.findByIdAndUpdate(timetable, { [`${day}.${period}`]: classAllotment }, { new: true });
  if (!timetableDoc)
    throw new Error("Given timetable doesn't exist");

  if (target === 'class')
    responseTimetable = await ClassTT.findOne({ class: req.body.class }).populate('class');
  else
    responseTimetable = await FacultyTT.findOne({ faculty: req.body.faculty }).populate('faculty');

  await Dept.populate(responseTimetable, { path: `${target}.dept` });
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
  // console.log(req.body);
  if (!req.body._id)
    throw new Error("Timetable id not provided");
  if (!req.body.target)
    throw new Error("target not provided");

  var Target;

  if (req.body.target === 'class')
    Target = ClassTT;
  else if (req.body.target === 'faculty')
    Target = FacultyTT;
  else
    throw new Error("Invalid target");

  const deletedClassTT = await Target.deleteOne({ _id: req.body._id });

  if (!deletedClassTT)
    throw new Error("Timetable doesn't exist");

  res.status(200).send(deletedClassTT);
}

module.exports = {
  fetchTimetables,
  createTimetable,
  editTimetable,
  deleteTimetable,
};