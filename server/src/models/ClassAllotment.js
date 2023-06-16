const mongoose = require('mongoose');

const classAllotmentSchema = mongoose.Schema({
    class: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'classes',
        required: true
    },
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'courses',
        required: true
    },
    faculty: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'faculties',
        required: true
    }
});

const ClassAllotment = mongoose.model('classAllotments', classAllotmentSchema);

module.exports = ClassAllotment;