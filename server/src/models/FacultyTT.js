const mongoose = require('mongoose');

const facultyTTSchema = mongoose.Schema({
    facultyId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    dataId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'timetables',
        required: true,
    }
});

const FacultyTT = mongoose.model("facultytt", facultyTTSchema);

module.exports = FacultyTT;