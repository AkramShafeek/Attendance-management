const express = require('express');
const router = express.Router();

// controllers
const {
    fetchFaculties,
    createFaculty,
    editFaculty,
    deleteFaculty,
} = require('../controllers/adminFacultyControllers');
const {
    fetchStudents,
    createStudent,
    editStudent,
    deleteStudent,
} = require('../controllers/adminStudentControllers');
const {
    fetchTimetables,
    createTimetable,
    editTimetable,
    deleteTimetable,
} = require('../controllers/adminTimetableController');


// yet to include authentication middleware
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
 */

module.exports = router;