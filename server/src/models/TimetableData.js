const mongoose = require('mongoose');

const daySchema = mongoose.Schema({
  _1: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "classAllotments",
    default: null

  },
  _2: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "classAllotments",
    default: null
  },
  _3: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "classAllotments",
    default: null
  },
  _4: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "classAllotments",
    default: null
  },
  _5: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "classAllotments",
    default: null
  },
  _6: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "classAllotments",
    default: null
  },
  _7: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "classAllotments",
    default: null
  },
  _8: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "classAllotments",
    default: null
  },
  _9: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "classAllotments",
    default: null
  },
})

const timetableSchema = mongoose.Schema({
  mon: daySchema,
  tue: daySchema,
  wed: daySchema,
  thu: daySchema,
  fri: daySchema,
  sat: daySchema,
});

// pre function
timetableSchema.pre('save', async function (next) {
  const periods = {};
  const payload = {};
  const days = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
  for (let i = 1; i <= 9; i++)
    periods['_' + i] = null;
  for (let day of days)
    payload[day] = periods;
  const { mon, tue, wed, thu, fri, sat } = payload;
  this.mon = mon;
  this.tue = tue;
  this.wed = wed;
  this.thu = thu;
  this.fri = fri;
  this.sat = sat;
  console.log(payload);
})

const Timetable = mongoose.model("timetables", timetableSchema);

module.exports = Timetable;


// example timetable
const data = {
  "mon": {
    "_2": "OS",
    "_3": "TFCS",
    "_5": "CN",
    "_6": "LA",
  },
  "tue": {
    "_2": "CN",
    "_3": "ADA",
    "_5": "OS",
    "_6": "TFCS",
    "_8": "LA",
  },
  "wed": {
    "_2": "UHV",
    "_3": "UHV",
    "_5": "OS LAB",
    "_6": "OS LAB",
    "_8": "TFCS TUTORIALS",
    "_9": "TFCS TUTORIALS",
  },
  "thu": {
    "_2": "CN LAB",
    "_3": "CN LAB",
    "_5": "ADA",
    "_6": "OS",
    "_8": "ADA LAB",
    "_9": "ADA LAB",
  },
  "fri": {
    "_3": "CN",
    "_5": "DEVOPS LAB",
    "_6": "DEVOPS LAB",
  },
  "sat": {
    "_2": "LA TUTORIAL",
    "_3": "LA TUTORIAL",
    "_5": "ADA",
    "_6": "KAN",
  },
}