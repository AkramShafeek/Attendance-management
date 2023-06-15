const mongoose = require('mongoose');

const classTTSchema = mongoose.Schema({
    dept: {
        type: String,
        required: true,
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
    },
    dataId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'timetables',
        required: true,
    }
});

const ClassTT = mongoose.model("classtt", classTTSchema);

module.exports = ClassTT;