const express = require('express')
const {makeInstructor } = require('../controllers/instructor')
const {requireSignIn} = require('../middleware/index')
const router = express.Router()

router.post('/make-instructor', requireSignIn, makeInstructor)


module.exports = router