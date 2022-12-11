const express = require('express')
const router = express.Router()
const teacherController = require('../controllers/techercontroller')
 

router.post('/register', teacherController.register)
router.post('/login', teacherController.login)
router.post('/addStudent', teacherController.addStudent)
router.get('/student/:teacherId', teacherController.getStudent)
router.put('/student/:teacherId/student/:studentId', teacherController.updateStudent)
router.delete('/student/:teacherId/student/:studentId', teacherController.deleteStudent)


module.exports = router