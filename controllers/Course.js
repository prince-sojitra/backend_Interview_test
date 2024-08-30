var COURSE = require('../model/Course')
exports.Create = async function (req, res, next) {
    try {
        let CourseCreate = await COURSE.create(req.body)
        res.status(201).json({
            status: "success",
            message: "Courses Create Successfull",
            data: CourseCreate
        })
    } catch (error) {
        res.status(404).json({
            status: "Fail",
            message: error.message
        })
    }
}

exports.AllCourses = async function (req, res, next) {
    try {
        let data = await COURSE.find()
        res.status(200).json({
            status: "success",
            message: "Courses All Data Successfull",
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
        await COURSE.findByIdAndDelete(req.params.id)
        res.status(204).json({
            status: "success",
            message: "Courses delete Successfull",
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
        let CoursesUpdate = await COURSE.findByIdAndUpdate(req.params.id, req.body, { new: true })
        res.status(200).json({
            status: "success",
            message: "courses update Successfull",
            data: CoursesUpdate
        })
    } catch (error) {
        res.status(404).json({
            status: "Fail",
            message: error.message
        })
    }
}

