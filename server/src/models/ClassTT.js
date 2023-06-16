const mongoose = require('mongoose');

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

const ClassTT = mongoose.model("classtt", classTTSchema);

module.exports = ClassTT;