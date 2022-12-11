const teacherModel = require('../models/teacherModel')
const studentMOdel = require('../models/studentModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')

const isValid = function (value) {
    if (typeof value === "undefined" || value === null) return false;
    if (typeof value === "string" && value.trim().length === 0) return false;
    if (typeof value === "object" && Object.keys(value).length === 0) return false;
    return true;
};

const register = async function (req, res) {
    try {
        let data = req.body
        let { name, email, password } = data
        if (!isValid(data)) {
            return res.status(400).send({ status: false, message: "You have not provided any data" })
        }
        if (!isValid(name)) {
            return res.status(400).send({ status: false, message: "Please provide name. it's mandatory" })
        }
        if (!isValid(email)) {
            return res.status(400).send({ status: false, message: "Please provide email" })
        }
        if (!(/^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/).test(email)) {
            return res.status(400).send({ status: false, message: "Enter valid email" })
        }
        let teacheremail = await teacherModel.findOne({ email: email })
        if (teacheremail) {
            return res.status(400).send({ status: false, message: "this email is already exist" })
        }
        if (!isValid(password)) {
            return res.status(400).send({ status: false, message: "Please provide password" })
        }
        if (!(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,15}$/).test(password)) {
            return res.status(400).send({ status: false, message: "Minimum eight characters, at least one uppercase letter, one lowercase letter and one number" })
        }
        const salt = await bcrypt.genSalt(12)
        data.password = await bcrypt.hash(password, salt)

        let savedata = await teacherModel.create(data)
        return res.status(201).send({ status: true, data: savedata })
    } catch (error) {
        return res.status(500).send({ status: false, error: error.message })
    }
}

const login = async function (req, res) {
    try {
        let userName = req.body.email
        let password = req.body.password
        if (!isValid(userName)) {
            return res.status(400).send({ status: false, message: "Please provide email" })
        }
        if (!isValid(password)) {
            return res.status(400).send({ status: false, message: "Please provide password" })
        }
        if (!(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,15}$/).test(password)) {
            return res.status(400).send({ status: false, message: "Minimum eight characters, at least one uppercase letter, one lowercase letter and one number" })
        }
        let teacherDetails = await teacherModel.findOne({ email: userName.trim() })
        if (teacherDetails) {
            let validpassword = await bcrypt.compare(password.trim(), teacherDetails.password)
            if (!validpassword) {
                return res.status(401).send({ status: false, message: "Emaild or the password is not correct" });
            }
        } else {
            return res.status(401).send({ status: false, message: "Emaild or the password is not correct" });
        }

        const token = jwt.sign({
            teacherId: teacherDetails._id.toString(),
            project: 'task-1'
        },
            "this is secret key ##########*********???????????",
            { expiresIn: "24h" }, { iat: Date.now() }
        )
        return res.status(200).send({ status: true, msg: "login successfully", data: token })
    } catch (error) {
        return res.status(500).send({ status: false, error: error.message })
    }
}

const addStudent = async function (req, res) {
    try {
        let teacherId = req.params.teacherId
        if (!teacherId) {
            return res.status(400).send({ status: false, message: "teacher Id is required in path params !" })
        }
        if (!mongoose.Types.ObjectId.isValid(teacherId)) {
            return res.status(400).send({ status: false, message: "teacher id is invalid!" })
        }
        let teacherPresent = await teacherModel.findOne({ _id: teacherId });
        if (!teacherPresent) {
            return res.status(404).send({ status: false, message: "No teacher is present with this id !" });
        }

        let data = req.body
        data.teacher = teacherId
        let {name, subject, marks} = data
        if (!isValid(name)) {
            return res.status(400).send({ status: false, message: "Please provide name. it's mandatory" })
        }
        if (!isValid(subject)) {
            return res.status(400).send({ status: false, message: "Please provide subject name. it's mandatory" })
        }
        if (!isValid(marks)) {
            return res.status(400).send({ status: false, message: "Please provide marks. it's mandatory" })
        }
        if (!(/^([0-9]{0,15}((.)[0-9]{0,2}))$/).test(marks)) {
            return res.status(400).send({ status: false, message: "marks field contain only number." })
        }
         let studentDetails = await studentMOdel.findOne({name: name, subject: subject})
         if (studentDetails) {
            let updatedData = await studentMOdel.findOneAndUpdate(
                {name: name, subject: subject},
                {$inc: {marks: marks}},
                {new: true})
                return res.status(201).send({status: true, data: updatedData})
         }
        let savedata = await studentMOdel.create(data)
        return res.status(201).send({ status: true, data: savedata })
    } catch (error) {
        return res.status(500).send({ status: false, error: error.message })
    }
}

const getStudent = async function (req, res) {
    try {
        let teacherId = req.params.teacherId
        if (!teacherId) {
            return res.status(400).send({ status: false, message: "teacher Id is required in path params !" })
        }
        if (!mongoose.Types.ObjectId.isValid(teacherId)) {
            return res.status(400).send({ status: false, message: "teacher id is invalid!" })
        }
        let teacherPresent = await teacherModel.findOne({ _id: teacherId, isDeleted: false});
        if (!teacherPresent) {
            return res.status(404).send({ status: false, message: "No teacher is present with this id !" });
        }

        let filter = { isDeleted: false, teacher: teacherId}
        let data = req.query
        if (data.name) {
            filter.name = data.name
        }
        if (data.subject) {
            filter.subject = data.subject
        }
         
        let studentlist = await studentMOdel.find(filter)
        return res.status(200).send({ status: true, data: studentlist })
    } catch (error) {
        return res.status(500).send({ status: false, error: error })
    }
}

const updateStudent = async function (req, res) {
    try {
        let teacherId = req.params.teacherId
        if (!teacherId) {
            return res.status(400).send({ status: false, message: "teacher Id is required in path params !" })
        }
        if (!mongoose.Types.ObjectId.isValid(teacherId)) {
            return res.status(400).send({ status: false, message: "teacher id is invalid!" })
        }
        let teacherPresent = await teacherModel.findOne({ _id: teacherId, isDeleted: false });
        if (!teacherPresent) {
            return res.status(404).send({ status: false, message: "No teacher is present with this id !" });
        }

        let studentId = req.params.studentId
        if (!studentId) {
            return res.status(400).send({ status: false, message: "student Id is required in path params !" })
        }
        if (!mongoose.Types.ObjectId.isValid(studentId)) {
            return res.status(400).send({ status: false, message: "student id is invalid!" })
        }
        let studentPresent = await studentMOdel.findOne({ _id: studentId, isDeleted: false });
        if (!studentPresent) {
            return res.status(404).send({ status: false, message: "No student is present with this id !" });
        }
        if (req.pass.teacherId !== studentPresent.teacher.toString()) {
            return res.status(403).send({ status: false, message: "you are not authorised !!" })
        }

        let data = req.body
        if(data.marks){
            if (!(/^([0-9]{0,15}((.)[0-9]{0,2}))$/).test(data.marks)) {
                return res.status(400).send({ status: false, message: "marks field contain only number." })
            }
        }
        let updatedData = await studentMOdel.findOneAndUpdate({ _id: studentId }, data,{new: true})
        return res.status(200).send({ status: true, data: updatedData })
    } catch (error) {
        return res.status(500).send({ status: false, error: error })
    }
}

const deleteStudent = async function (req, res) {
    try {
        let teacherId = req.params.teacherId
        if (!teacherId) {
            return res.status(400).send({ status: false, message: "teacher Id is required in path params !" })
        }
        if (!mongoose.Types.ObjectId.isValid(teacherId)) {
            return res.status(400).send({ status: false, message: "teacher id is invalid!" })
        }
        let teacherPresent = await teacherModel.findOne({ _id: teacherId, isDeleted: false });
        if (!teacherPresent) {
            return res.status(404).send({ status: false, message: "No teacher is present with this id !" });
        }

        let studentId = req.params.studentId
        if (!studentId) {
            return res.status(400).send({ status: false, message: "student Id is required in path params !" })
        }
        if (!mongoose.Types.ObjectId.isValid(studentId)) {
            return res.status(400).send({ status: false, message: "student id is invalid!" })
        }
        let studentPresent = await studentMOdel.findOne({ _id: studentId, isDeleted: false });
        if (!studentPresent) {
            return res.status(404).send({ status: false, message: "No student is present with this id !" });
        }
        if (req.pass.teacherId !== studentPresent.teacher.toString()) {
            return res.status(403).send({ status: false, message: "you are not authorised !!" })
        }

        await studentMOdel.findOneAndUpdate({ _id: studentId }, { $set: { isDeleted: true } })
        return res.status(200).send({ status: true, msg: 'deleted successfully' })
    } catch (error) {
        return res.status(500).send({ status: false, error: error })
    }
}


module.exports = { register, login, addStudent, getStudent, updateStudent, deleteStudent }