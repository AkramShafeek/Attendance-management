const mongoose = require('mongoose');
const ClassAllotment = require('./ClassAllotment');

const courseSchema = mongoose.Schema({
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
    courseCode: {
        type: String,
        required: true
    },
    courseName: {
        type: String,
        required: true
    },
    courseShortName: {
        type: String,
        required: true
    },
});

courseSchema.pre('deleteOne', async function (next) {

    const referenceError = 'Course is referenced and cannot be deleted';

    // validate class allotment references
    const existingClassAllotment = await ClassAllotment.findOne({ course: this._id });
    if (existingClassAllotment)
        throw new Error(referenceError);
    
})


const Course = mongoose.model('courses', courseSchema);

module.exports = Course;