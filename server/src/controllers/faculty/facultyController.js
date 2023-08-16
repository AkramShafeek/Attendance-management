const Class = require("../../models/Class");
const ClassAllotment = require("../../models/ClassAllotment");
const Course = require("../../models/Course");
const Dept = require("../../models/Department");
const FacultyTT = require("../../models/FacultyTT");
const Student = require("../../models/Student");
const Timetable = require("../../models/TimetableData");

const getClassAllotments = async (req, res) => {
  const classAllotments = await ClassAllotment.find({ faculty: req.user._id })
    .populate('class')
    .populate('course');
  await Dept.populate(classAllotments, { path: 'class.dept' });
  await Dept.populate(classAllotments, { path: 'course.dept' });

  res.status(200).send(classAllotments);
}

const getTodayClasses = async (req, res) => {
  const facultyTimetable = await FacultyTT.findOne({ faculty: req.user._id });
  if (!facultyTimetable)
    throw new Error("You do not have a timetable, contact admin for creating one");

  const days = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
  const today = new Date('August 15, 2023 03:24:00').getDay();
  console.log(days[today]);
  await Timetable.populate(facultyTimetable, { path: 'data', select: days[today] });
  console.log(facultyTimetable.data[days[today]]);
  for (let period = 1; period <= 9; period++) {
    if (facultyTimetable.data[days[today]]['_' + period]) {
      await ClassAllotment.populate(facultyTimetable, { path: `data.${[days[today]]}._${period}` });
      await Class.populate(facultyTimetable, { path: `data.${[days[today]]}._${period}.class` });
      await Course.populate(facultyTimetable, { path: `data.${[days[today]]}._${period}.course` });
      await Dept.populate(facultyTimetable, { path: `data.${[days[today]]}._${period}.class.dept` });
      await Dept.populate(facultyTimetable, { path: `data.${[days[today]]}._${period}.course.dept` });
    }
  }

  // here create the required object of classes and period
  // no need of entire timetable
  const response = {};
  for (let period = 1; period <= 9; period++) {
    if (facultyTimetable.data[days[today]]['_' + period]) {
      const allotment = facultyTimetable.data[days[today]]['_' + period];
      if (response[allotment._id])
        response[allotment._id].push({ period: period, class: allotment.class, course: allotment.course })
      else
        response[allotment._id] = [{ period: period, class: allotment.class, course: allotment.course }]
    }
  }  

  console.log(response);
  res.status(200).send(response);
}

const getStudentsFromClass = async (req, res) => {
  console.log(req.params);
  const students = await Student.find({ class: req.params.class });

  res.status(200).send(students);
}

module.exports = { getClassAllotments, getTodayClasses, getStudentsFromClass };