const mongoose = require('mongoose');
const Course = require('./Course');
const Class = require('./Class');
const Faculty = require('./Faculty');
const Student = require('./Student');

const departmentSchema = mongoose.Schema({
    deptName: {
        type: String,
        required: true,
    },
    deptShortName: {
        type: String,
        required: true,
    },
});

departmentSchema.pre('deleteOne', async function (next) {

    const referenceError = 'Dept is referenced and cannot be deleted';

    // validate course references
    const existingCourse = await Course.findOne({ dept: this._id });
    if (existingCourse)
        throw new Error(referenceError);
    
    // validate class references
    const existingClass = await Class.findOne({ dept: this._id });
    if (existingClass)
        throw new Error(referenceError);
    
    // validate faculty references
    const existingFaculty = await Faculty.findOne({ dept: this._id });
    if (existingFaculty)
        throw new Error(referenceError);
    
    // validate student references
    const existingStudent = await Student.findOne({ dept: this._id });
    if (existingStudent)
        throw new Error(referenceError);
})

const Dept = mongoose.model('departments', departmentSchema);

module.exports = Dept;