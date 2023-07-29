const mongoose = require('mongoose');
const Timetable = require('./TimetableData');

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

facultyTTSchema.pre('deleteOne', async function (next) {
    const doc = await FacultyTT.findOne(this.getFilter());

    if (!doc)
        throw new Error("Class Timetable doesn't exist");

    const deletedTimetable = await Timetable.findByIdAndDelete(doc.data);
    if (!deletedTimetable)
        throw new Error("Timetable data doesn't exist");

})

const FacultyTT = mongoose.model("facultytt", facultyTTSchema);

module.exports = FacultyTT;