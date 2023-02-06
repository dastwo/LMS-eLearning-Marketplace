const express = require('express')
const {uploadImage, removeImage, createCourse, getCourse} = require('../controllers/course')
const {requireSignIn, isInstructor} = require('../middleware/index')
const router = express.Router()

router.post('/course/upload-image', requireSignIn, uploadImage)
router.post('/course/remove-image', requireSignIn, removeImage)
router.post('/course', requireSignIn,isInstructor,   createCourse)
router.get('/course/:slug', getCourse)




module.exports = router