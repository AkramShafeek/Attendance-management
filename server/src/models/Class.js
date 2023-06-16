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
        type: String,
        required: true
    },
    sem: {
        type: String,
        required: true
    },
    section: {
        type: String,
        required: true
    }
});

classSchema.pre('deleteOne', async function (next) {

    const referenceError = 'Class is referenced and cannot be deleted';

    // validate class allotment references
    const existingClassAllotment = await ClassAllotment.findOne({ class: this._id });
    if (existingClassAllotment)
        throw new Error(referenceError);
    
    // validate class timetable references
    const existingClassTT = await ClassTT.findOne({ class: this._id });
    if (existingClassTT)
        throw new Error(referenceError);
    
    // validate student references
    const existingStudent = await Student.findOne({ class: this._id });
    if (existingStudent)
        throw new Error(referenceError);
})


const Class = mongoose.model('classes', classSchema);

module.exports = Class;