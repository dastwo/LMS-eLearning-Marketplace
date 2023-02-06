const express = require('express')
const {makeInstructor, getAccountStatus, currentInstructor, instructorCourses} = require('../controllers/instructor')
const {requireSignIn} = require('../middleware/index')
const router = express.Router()

router.post('/make-instructor', requireSignIn, makeInstructor)
router.post('/get-account-status', requireSignIn, getAccountStatus)
router.get('/current-instructor', requireSignIn, currentInstructor)
router.get('/instructor-courses', requireSignIn, instructorCourses)


module.exports = router