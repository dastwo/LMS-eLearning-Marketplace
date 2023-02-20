const express = require('express')
const formidableMiddleware = require('express-formidable');

const {uploadImage, removeImage, createCourse, getCourse, uploadVideo, removeVideo, addLesson, updateCourse, removeLesson, updateLesson, publishCourse, unpublishCourse, coursesPublish, checkEnrollment, freeEnrollment, paidEnrollment, stripeSuccess} = require('../controllers/course')
const {requireSignIn, isInstructor} = require('../middleware/index')
const router = express.Router()


router.get('/courses', coursesPublish)

// image 
router.post('/course/upload-image', requireSignIn, uploadImage)
router.post('/course/remove-image', requireSignIn, removeImage)

// course 
router.post('/course', requireSignIn,isInstructor,   createCourse)
router.get('/course/:slug', getCourse)
router.put('/course/:slug', requireSignIn, updateCourse)

// video 
router.post(`/course/video-upload/:instructorId`, requireSignIn, formidableMiddleware(), uploadVideo )
router.post('/course/video-remove/:instructorId', requireSignIn, removeVideo)

// lessons
router.post('/course/lesson/:slug/:instructorId', requireSignIn, addLesson)
router.put('/course/lesson-remove/:slug/:lessonId', requireSignIn, removeLesson)
router.put('/course/lesson/:slug/:lessonId', requireSignIn, updateLesson)

// publish 
router.put('/course/publish/:courseId', requireSignIn, publishCourse)
router.put('/course/unpublish/:courseId', requireSignIn, unpublishCourse)


// enrollment
router.get('/check-enrollment/:courseId', requireSignIn, checkEnrollment)
router.post('/free-enrollment/:courseId', requireSignIn, freeEnrollment)
router.post('/paid-enrollment/:courseId', requireSignIn, paidEnrollment)

router.get('/stripe-success/:courseId', requireSignIn, stripeSuccess)


module.exports = router