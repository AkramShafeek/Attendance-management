const mongoose = require('mongoose');

const daySchema = mongoose.Schema({
  _1: {
    type: String,
    default: ""
  },
  _2: {
    type: String,
    default: ""
  },
  _3: {
    type: String,
    default: ""
  },
  _4: {
    type: String,
    default: "SHORT BREAK"
  },
  _5: {
    type: String,
    default: ""
  },
  _6: {
    type: String,
    default: ""
  },
  _7: {
    type: String,
    default: "LUNCH BREAK"
  },
  _8: {
    type: String,
    default: ""
  },
  _9: {
    type: String,
    default: ""
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