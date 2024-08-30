var STUDENT = require('../model/Student')
exports.Create = async function (req, res, next) {
    try {
        let StudentCreate = await STUDENT.create(req.body)
        res.status(201).json({
            status: "success",
            message: "Student Create Successfull",
            data: StudentCreate
        })
    } catch (error) {
        res.status(404).json({
            status: "Fail",
            message: error.message
        })
    }
}

exports.AllStudent = async function (req, res, next) {
    try {
        
        let data = await STUDENT.find().populate("course")
        res.status(200).json({
            status: "success",
            message: "Student All Data Successfull",
            data
        })
    } catch (error) {
        res.status(404).json({
            status: "Fail",
            message: error.message
        })
    }
}


exports.StudentCount = async function (req, res, next) {
    try {
        
        let data = await STUDENT.find().count()
        res.status(200).json({
            status: "success",
            message: "Student Count Successfull",
            data
        })
    } catch (error) {
        res.status(404).json({
            status: "Fail",
            message: error.message
        })
    }
}

exports.StudentPendingCount = async function (req, res, next) {
    try {
        
        let data = await STUDENT.find({jobstatus : "Pending"}).count()
        res.status(200).json({
            status: "success",
            message: "Pending Count Successfull",
            data
        })
    } catch (error) {
        res.status(404).json({
            status: "Fail",
            message: error.message
        })
    }
}

exports.StudentDoneCount = async function (req, res, next) {
    try {
        
        let data = await STUDENT.find({jobstatus : "Done"}).count()
        res.status(200).json({
            status: "success",
            message: "Pending Count Successfull",
            data
        })
    } catch (error) {
        res.status(404).json({
            status: "Fail",
            message: error.message
        })
    }
}


exports.Delete = async function (req, res, next) {
    try {
        await STUDENT.findByIdAndDelete(req.params.id)
        res.status(204).json({
            status: "success",
            message: "Student delete Successfull",
        })
    } catch (error) {
        res.status(404).json({
            status: "Fail",
            message: error.message
        })
    }
}

exports.Update = async function (req, res, next) {
    try {
        let StudentUpdate = await STUDENT.findByIdAndUpdate(req.params.id, req.body, { new: true })
        res.status(201).json({
            status: "success",
            message: "student update Successfull",
            data: StudentUpdate
        })
    } catch (error) {
        res.status(404).json({
            status: "Fail",
            message: error.message
        })
    }
}

