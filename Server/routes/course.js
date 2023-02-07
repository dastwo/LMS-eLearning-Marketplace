const express = require('express')
const formidableMiddleware = require('express-formidable');

const {uploadImage, removeImage, createCourse, getCourse, uploadVideo, removeVideo, addLesson} = require('../controllers/course')
const {requireSignIn, isInstructor} = require('../middleware/index')
const router = express.Router()

router.post('/course/upload-image', requireSignIn, uploadImage)
router.post('/course/remove-image', requireSignIn, removeImage)
router.post('/course', requireSignIn,isInstructor,   createCourse)
router.get('/course/:slug', getCourse)
router.post(`/course/video-upload/:instructorId`, requireSignIn, formidableMiddleware(), uploadVideo )
router.post('/course/video-remove/:instructorId', requireSignIn, removeVideo)
router.post('/course/lesson/:slug/:instructorId', requireSignIn, addLesson)




module.exports = router