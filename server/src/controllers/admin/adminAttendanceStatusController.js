const AttendanceStatus = require('../../models/AttendanceStatus');

const fetchAttendanceStatuses = async (req, res) => {
    const attendanceStatuses = await AttendanceStatus.find();
    res.status(200).send(attendanceStatuses);
}

const createAttendanceStatus = async (req, res) => {
    if (!req.body.student)
        throw new Error("Student not provided");
    if (!req.body.attendanceRecord)
        throw new Error("Attendance record not provided");

    const newAttendanceStatus = await AttendanceStatus.create(req.body);
    res.status(200).send(newAttendanceStatus);
}

const editAttendanceStatus = async (req, res) => { }

const deleteAttendanceStatus = async (req, res) => { }

module.exports = {
    fetchAttendanceStatuses,
    createAttendanceStatus,
    editAttendanceStatus,
    deleteAttendanceStatus,
};