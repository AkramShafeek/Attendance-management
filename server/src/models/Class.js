const mongoose = require('mongoose');
const ClassAllotment = require('./ClassAllotment');
const Student = require('./Student');
const ClassTT = require('./ClassTT');

const classSchema = mongoose.Schema({
    dept: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'departments',
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    sem: {
        type: Number,
        required: true
    },
    section: {
        type: String,
        required: true
    }
});

classSchema.pre('deleteOne', async function (next) {

    const referenceError = 'Class is referenced and cannot be deleted';
    const doc = await Class.findOne(this.getFilter());

    if (!doc)
        throw new Error("Class doesn't exist");

    // validate class allotment references
    const existingClassAllotment = await ClassAllotment.findOne({ class: doc._id });
    if (existingClassAllotment) {
        console.log("class allotment is referenced");
        throw new Error(referenceError);
    }

    // validate class timetable references
    const existingClassTT = await ClassTT.findOne({ class: doc._id });
    if (existingClassTT) {
        console.log("class timetable is referenced");
        throw new Error(referenceError);
    }

    // validate student references
    const existingStudent = await Student.findOne({ class: doc._id });
    if (existingStudent) {
        console.log("student is referenced");
        throw new Error(referenceError);
    }
        
})


const Class = mongoose.model('classes', classSchema);

module.exports = Class;