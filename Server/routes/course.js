const express = require('express')
const {uploadImage, removeImage, createCourse} = require('../controllers/course')
const {requireSignIn, isInstructor} = require('../middleware/index')
const router = express.Router()

router.post('/course/upload-image', requireSignIn, uploadImage)
router.post('/course/remove-image', requireSignIn, removeImage)
router.post('/course', requireSignIn,isInstructor,   createCourse)




module.exports = router