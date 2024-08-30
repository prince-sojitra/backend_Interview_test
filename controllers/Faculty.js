var FACULTY = require('../model/Faculty')
exports.Create = async function (req, res, next) {
    try {
        let facultyCreate = await FACULTY.create(req.body)
        res.status(201).json({
            status: "success",
            message: "Faculty Create Successfull",
            data: facultyCreate
        })
    } catch (error) {
        res.status(404).json({
            status: "Fail",
            message: error.message
        })
    }
}

exports.AllFaculty = async function (req, res, next) {
    try {
        let data = await FACULTY.find()
        res.status(200).json({
            status: "success",
            message: "Faculty All Data Successfull",
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
        await FACULTY.findByIdAndDelete(req.params.id)
        res.status(204).json({
            status: "success",
            message: "Faculty delete Successfull",
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
        let FacultyUpdate = await FACULTY.findByIdAndUpdate(req.params.id, req.body, { new: true })
        res.status(200).json({
            status: "success",
            message: "Faculty update Successfull",
            data: FacultyUpdate
        })
    } catch (error) {
        res.status(404).json({
            status: "Fail",
            message: error.message
        })
    }
}

