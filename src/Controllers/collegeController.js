const collegeModel = require('../models/CollegeModel')
const InternModel = require('../models/InternModel')

//---------------------validations-----------------------

const isValid = function (value) {
    if (typeof value === "undefined" || value === null) return false;
    if (typeof value === "string" && value.trim().length === 0) return false;
    if (typeof value === "object" && Object.keys(value).length === 0) return false;
    return true;
};

//----------------------create-college--------------------

const createCollege = async function (req, res) {
    try {
        let data = req.body

        if (!isValid(data)) {
            return res.status(400).send({ status: false, msg: "You have not provided any data" })
        }
        if (!isValid(data.name)) {
            return res.status(400).send({ status: false, msg: "Please provide name. it's mandatory" })
        } else {
            data.name = data.name.trim().split(" ").filter(word => word).join(" ")
        }
        let college = await collegeModel.findOne({ name: data.name })
        if (college) {
            return res.status(409).send({ status: false, msg: "This college name is already reserved, please provide different college name" })
        }
        if (!isValid(data.fullName)) {
            return res.status(400).send({ status: false, msg: "Please provide fullName. It's mandatory" })
        } else {
            data.fullName = data.fullName.trim().split(" ").filter(word => word).join(" ")
        }
        if (!isValid(data.logoLink)) {
            return res.status(400).send({ status: false, msg: "Please provide logoLink. It's mandatory" })
        }
        let savedata = await collegeModel.create(data)
        return res.status(201).send({ status: true, data: savedata })
    } catch (err) {
        return res.status(500).send({ status: false, error: err.message })
    }
}

//-----------------------------get-details----------------------------

const getcollegeDetails = async function (req, res) {
    try {
        let collegeName = req.query.collegeName
        if (!collegeName) {
            return res.status(400).send({ status: false, msg: "Please Enter college name" })
        }
        let findcollege = await collegeModel.findOne({ name: collegeName, isDeleted: false })
        if (!findcollege) {
            return res.status(404).send({ status: false, msg: "Don't open Internships in this college" })
        }
        let studentdetails = await InternModel.find({ collegeId: findcollege._id, isDeleted: false }).select({ _id: 1, name: 1, email: 1, mobile: 1 })
        if (studentdetails.length === 0) {
            studentdetails.push("Don't have any intern in this college")
        }

        let data = {}
        data.name = findcollege.name
        data.fullName = findcollege.fullName
        data.logoLink = findcollege.logoLink
        data.interns = studentdetails

        res.status(200).send({ status: true, data: data })
    } catch (err) {
        return res.status(500).send({ status: false, error: err.message })
    }
}


module.exports.getcollegeDetails = getcollegeDetails
module.exports.createCollege = createCollege

