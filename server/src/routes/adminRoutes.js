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
const {
    fetchClass,
    createClass,
    editClass,
    deleteClass
} = require('../controllers/admin/adminClassController');
const {
    fetchCourse,
    createCourse,
    deleteCourse,
    editCourse,
} = require('../controllers/admin/adminCourseController');
const {
    fetchClassAllotments,
    createClassAllotment,
    editClassAllotment,
    deleteClassAllotment
} = require('../controllers/admin/adminClassAllotmentController');



// yet to include authentication middleware
router.route('/dept/create').post(emptyReqBodyValidator, createDept);
router.route('/dept/read').get(fetchDepts);
router.route('/dept/update').put(emptyReqBodyValidator, editDept);
router.route('/dept/delete').delete(emptyReqBodyValidator, deleteDept);

router.route('/course/read').get(fetchCourse);
router.route('/course/create').post(emptyReqBodyValidator, createCourse);
router.route('/course/update').put(emptyReqBodyValidator, editCourse);
router.route('/course/delete').delete(emptyReqBodyValidator, deleteCourse);

router.route('/class/read').get(fetchClass);
router.route('/class/create').post(emptyReqBodyValidator, createClass);
router.route('/class/update').put(emptyReqBodyValidator, editClass);
router.route('/class/delete').delete(emptyReqBodyValidator, deleteClass);

router.route('/faculty/create').post(emptyReqBodyValidator, createFaculty);
router.route('/faculty/read').get(fetchFaculties);
router.route('/faculty/update').put(emptyReqBodyValidator, editFaculty);
router.route('/faculty/delete').delete(emptyReqBodyValidator, deleteFaculty);

router.route('/student/create').post(emptyReqBodyValidator, createStudent);
router.route('/student/read').get(fetchStudents);
router.route('/student/update').put(emptyReqBodyValidator, editStudent);
router.route('/student/delete').delete(emptyReqBodyValidator, deleteStudent);

router.route('/allotment/create').post(emptyReqBodyValidator, createClassAllotment);
router.route('/allotment/read').get(fetchClassAllotments);
router.route('/allotment/update').put(emptyReqBodyValidator, editClassAllotment);
router.route('/allotment/delete').delete(emptyReqBodyValidator, deleteClassAllotment);

router.route('/timetable/create').post(emptyReqBodyValidator,createTimetable);
router.route('/timetable/read').get(fetchTimetables);
router.route('/timetable/update').put(emptyReqBodyValidator,editTimetable);
router.route('/timetable/delete').delete(emptyReqBodyValidator,deleteTimetable);

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