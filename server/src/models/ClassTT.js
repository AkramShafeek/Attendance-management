const mongoose = require('mongoose');
const Timetable = require('./TimetableData');

const classTTSchema = mongoose.Schema({
    class: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'classes',
        required: true
    },
    data: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'timetables',
        required: true,
    }
});

classTTSchema.pre('deleteOne', async function (next) {    
    const doc = await ClassTT.findOne(this.getFilter());

    if (!doc)
        throw new Error("Class Timetable doesn't exist");

    const deletedTimetable = await Timetable.findByIdAndDelete(doc.data);
    if(!deletedTimetable)    
        throw new Error("Timetable data doesn't exist");

})

const ClassTT = mongoose.model("classtt", classTTSchema);

module.exports = ClassTT;