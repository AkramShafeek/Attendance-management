const AttendanceRecord = require('../../models/AttendanceRecord');

const fetchAttendanceRecords = async (req, res) => {
    const attendanceRecords = await AttendanceRecord.find();
    res.status(200).send(attendanceRecords);
}

const createAttendanceRecord = async (req, res) => {   
    const newAttendanceRecord = await AttendanceRecord.create(req.body);
    res.status(200).send(newAttendanceRecord);
}

const editAttendanceRecord = async (req, res) => { }

const deleteAttendanceRecord = async (req, res) => { }

module.exports = {
    fetchAttendanceRecords,
    createAttendanceRecord,
    editAttendanceRecord,
    deleteAttendanceRecord,
};