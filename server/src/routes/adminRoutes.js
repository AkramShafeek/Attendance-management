const express = require('express');
const router = express.Router();
const emptyReqBodyValidator = require('../middlewares/emptyReqBodyValidator');

// controllers
const {
    fetchFaculties,
    createFaculty,
    editFaculty,
    deleteFaculty,
} = require('../controllers/admin/adminFacultyControllers');
const {
    fetchStudents,
    createStudent,
    editStudent,
    deleteStudent,
} = require('../controllers/admin/adminStudentControllers');
const {
    fetchTimetables,
    createTimetable,
    editTimetable,
    deleteTimetable,
} = require('../controllers/admin/adminTimetableController');
const {
    createDept,
    fetchDepts,
    editDept,
    deleteDept
} = require('../controllers/admin/adminDeptController');
const {
    fetchAttendanceStatuses,
    createAttendanceStatus,
    editAttendanceStatus,
    deleteAttendanceStatus,
} = require('../controllers/admin/adminAttendanceStatusController');
const {
    fetchAttendanceRecords,
    createAttendanceRecord,
    editAttendanceRecord,
    deleteAttendanceRecord,
} = require('../controllers/admin/adminAttendanceRecordController');



// yet to include authentication middleware
router.route('/dept/create').post(emptyReqBodyValidator, createDept);
router.route('/dept/read').get(fetchDepts);
router.route('/dept/update').put(emptyReqBodyValidator, editDept);
router.route('/dept/delete').delete(emptyReqBodyValidator, deleteDept);

router.route('/faculty/create').post(emptyReqBodyValidator, createFaculty);
router.route('/faculty/read').get(emptyReqBodyValidator, fetchFaculties);
router.route('/faculty/update').put(emptyReqBodyValidator, editFaculty);
router.route('/faculty/delete').delete(emptyReqBodyValidator, deleteFaculty);

router.route('/student/create').post(emptyReqBodyValidator, createStudent);
router.route('/student/read').get(fetchStudents);
router.route('/student/update').put(emptyReqBodyValidator, editStudent);
router.route('/student/delete').delete(emptyReqBodyValidator, deleteStudent);

router.route('/timetable/create').post(createTimetable);
router.route('/timetable/read').get(fetchTimetables);
router.route('/timetable/update').put(editTimetable);
router.route('/timetable/delete').delete(deleteTimetable);

router.route('/attendancestatus/create').post(emptyReqBodyValidator, createAttendanceStatus);
router.route('/attendancestatus/read').get(emptyReqBodyValidator, fetchAttendanceStatuses);
router.route('/attendancestatus/update').put(emptyReqBodyValidator, editAttendanceStatus);
router.route('/attendancestatus/delete').delete(emptyReqBodyValidator, deleteAttendanceStatus);

router.route('/attendancerecord/create').post(emptyReqBodyValidator, createAttendanceRecord);
router.route('/attendancerecord/read').get(emptyReqBodyValidator, fetchAttendanceRecords);
router.route('/attendancerecord/update').put(emptyReqBodyValidator, editAttendanceRecord);
router.route('/attendancerecord/delete').delete(emptyReqBodyValidator, deleteAttendanceRecord);

/**
 * What can admin do?
 * step 1:
 * CRUD faculties (done)
 * CRUD students (done)
 * 
 * step 2:
 * Approve students
 * ...yet to be designed
 * 
 * task now:
 * CRUD dept
 * CRUD course
 * CRUD class
 * CRUD classAllotment
 */

module.exports = router;