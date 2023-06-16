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



// yet to include authentication middleware
router.route('/dept/create').post(emptyReqBodyValidator, createDept);
router.route('/dept/read').get(emptyReqBodyValidator, fetchDepts);
router.route('/dept/update').put(emptyReqBodyValidator, editDept);
router.route('/dept/delete').delete(emptyReqBodyValidator, deleteDept);

router.route('/faculty/create').post(createFaculty);
router.route('/faculty/read').get(fetchFaculties);
router.route('/faculty/update').put(editFaculty);
router.route('/faculty/delete').delete(deleteFaculty);

router.route('/student/create').post(createStudent);
router.route('/student/read').get(fetchStudents);
router.route('/student/update').put(editStudent);
router.route('/student/delete').delete(deleteStudent);

router.route('/timetable/create').post(createTimetable);
router.route('/timetable/read').get(fetchTimetables);
router.route('/timetable/update').put(editTimetable);
router.route('/timetable/delete').delete(deleteTimetable);

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