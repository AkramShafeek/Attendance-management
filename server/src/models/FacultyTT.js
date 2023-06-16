const mongoose = require('mongoose');

const facultyTTSchema = mongoose.Schema({
    faculty: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'faculties',
        required: true,
    },
    data: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'timetables',
        required: true,
    }
});

const FacultyTT = mongoose.model("facultytt", facultyTTSchema);

module.exports = FacultyTT;