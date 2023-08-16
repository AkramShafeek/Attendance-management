const express = require('express');
const router = express.Router();
const emptyReqBodyValidator = require('../middlewares/emptyReqBodyValidator');
const { facultyAuthMiddleware } = require('../middlewares/auth');
const { login, testController } = require('../controllers/faculty/authController');
const { getClassAllotments, getTodayClasses, getStudentsFromClass } = require('../controllers/faculty/facultyController');

router.route('/login').post(emptyReqBodyValidator, login);
router.route('/test').get(facultyAuthMiddleware, testController);

router.route('/classallotments').get(facultyAuthMiddleware, getClassAllotments);
router.route('/todayclasses').get(facultyAuthMiddleware, getTodayClasses);
router.route('/getstudentsfromclass/:class').get(facultyAuthMiddleware,getStudentsFromClass);

module.exports = router;