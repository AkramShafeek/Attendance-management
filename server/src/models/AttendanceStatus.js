const mongoose = require('mongoose');
const AttendanceRecord = require('./AttendanceRecord');

const attendanceStatusSchema = mongoose.Schema({
    attendanceRecord: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'attendancerecords',
        required: true
    },
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'students',
        required: true
    },
    status: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

attendanceStatusSchema.pre('save', async function (next) {
    if (!this.isModified)
        return next();

    const attendanceRecord = await AttendanceRecord.findById(this.attendanceRecord);

    if (!attendanceRecord)
        throw new Error("Attendance record doesn't exist");

    attendanceRecord.held = attendanceRecord.held + 1;
    attendanceRecord.attended = this.status ? attendanceRecord.attended + 1 : attendanceRecord.attended + 0;

    attendanceRecord.save();
})

const AttendanceStatus = mongoose.model('attendancestatuses', attendanceStatusSchema);

module.exports = AttendanceStatus;