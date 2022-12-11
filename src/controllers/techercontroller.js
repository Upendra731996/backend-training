const teacherModel = require('../models/teacherModel')
const studentMOdel = require('../models/studentModel')
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
        let {name, email, password} = data
        
        let savedata = await teacherModel.create(data)
        return res.status(201).send({ status: true, data: savedata })
    } catch (error) {
        return res.status(500).send({ status: false, error: error })
    }
}

const login = async function (req, res) {
    try {
        let userName = req.body.email
        let password = req.body.password
        let teacherDetails = await teacherModel.findOne({ email: userName.trim() })

        const token = jwt.sign({
            userId: teacherDetails._id.toString(),
            project: 'task-1'
        },
            "this is secret key ##########*********???????????",
            { expiresIn: "24h" }, { iat: Date.now() }
        )
        return res.status(200).send({ status: true, msg: "login successfully", data: token })
    } catch (error) {
        return res.status(500).send({ status: false, error: error })
    }
}

const addStudent = async function (req, res) {
    try {
        let data = req.body
        let savedata = await studentMOdel.create(data)
        return res.status(201).send({ status: true, data: savedata })
    } catch (error) {
        return res.status(500).send({ status: false, error: error })
    }
}

const getStudent = async function (req, res) {
    try {
        let teacherId = req.params.teacherId
        let data = req.query
        let studentlist = await studentMOdel.find({ teacher: teacherId })
        return res.status(200).send({ status: true, data: studentlist })
    } catch (error) {
        return res.status(500).send({ status: false, error: error })
    }
}

const updateStudent = async function (req, res) {
    try {
        let teacherId = req.params.teacherId
        let studentId = req.params.studentId
        let data = req.body
        let updatedData = await studentMOdel.findOneAndUpdate({ _id: studentId }, {})
        return res.status(200).send({ status: true, data: updatedData })
    } catch (error) {
        return res.status(500).send({ status: false, error: error })
    }
}

const deleteStudent = async function (req, res) {
    try {
        let teacherId = req.params.teacherId
        let studentId = req.params.studentId
        await studentMOdel.findOneAndUpdate({ _id: studentId }, {$set: { isDeleted: true }})
        return res.status(200).send({ status: true, msg: 'deleted successfully' })
    } catch (error) {
        return res.status(500).send({ status: false, error: error })
    }
}
 

module.exports = { register, login, addStudent, getStudent, updateStudent, deleteStudent }