var COMPANY = require('../model/Company')
exports.Create = async function (req, res, next) {
    try {
        let CompanyCreate = await COMPANY.create(req.body)
        res.status(201).json({
            status: "success",
            message: "Company Create Successfull",
            data: CompanyCreate
        })
    } catch (error) {
        res.status(404).json({
            status: "Fail",
            message: error.message
        })
    }
}

exports.AllCompany = async function (req, res, next) {
    try {
        let data = await COMPANY.find()
        res.status(200).json({
            status: "success",
            message: "Company All Data Successfull",
            data
        })
    } catch (error) {
        res.status(404).json({
            status: "Fail",
            message: error.message
        })
    }
}

exports.CompanyCount = async function (req, res, next) {
    try {
        
        let data = await COMPANY.find().count()
        res.status(200).json({
            status: "success",
            message: "Company Count Successfull",
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
        await COMPANY.findByIdAndDelete(req.params.id)
        res.status(204).json({
            status: "success",
            message: "Company delete Successfull",
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
        let CompanyUpdate = await COMPANY.findByIdAndUpdate(req.params.id, req.body, { new: true })
        res.status(200).json({
            status: "success",
            message: "Company update Successfull",
            data: CompanyUpdate
        })
    } catch (error) {
        res.status(404).json({
            status: "Fail",
            message: error.message
        })
    }
}

