const express = require('express')
const router = express.Router()
const teacherController = require('../controllers/techercontroller')
const mw = require('../middelwares/auth')
 

router.post('/register', teacherController.register)
router.post('/login', teacherController.login)
router.post('/Student/:teacherId', teacherController.addStudent)
router.get('/student/:teacherId', teacherController.getStudent)
router.put('/student/:teacherId/student/:studentId',mw.auth, teacherController.updateStudent)
router.delete('/student/:teacherId/student/:studentId',mw.auth, teacherController.deleteStudent)


module.exports = router