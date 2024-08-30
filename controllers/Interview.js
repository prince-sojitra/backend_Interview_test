var INTERVIEW = require('../model/Interview')
exports.Create = async function (req, res, next) {
    try {
        let InterviewCreate = await INTERVIEW.create(req.body)
        res.status(201).json({
            status: "success",
            message: "Interview create Successfull",
            data: InterviewCreate
        })
    } catch (error) {
        res.status(404).json({
            status: "Fail",
            message: error.message
        })
    }
}

exports.AllInterview = async function (req, res, next) {
    try {
        let data = await INTERVIEW.find().populate(["studentname", "companyname"])
        res.status(200).json({
            status: "success",
            message: "Interview All Data Successfull",
            data
        })
    } catch (error) {
        res.status(404).json({
            status: "Fail",
            message: error.message
        })
    }
}

exports.FollowUpdate = async function (req, res, next) {
    try {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const tomorrow = new Date(today);
        tomorrow.setDate(today.getDate() + 1);

        let data = await INTERVIEW.find({
            followupdate: {
                $gte: today,
                $lt: tomorrow
            },
            status : {
                $eq : "Pending"
            }
        }).populate(["studentname", "companyname"]);

        res.status(200).json({
            status: "success",
            message: "Today Follow update Interview Successful",
            data
        });
    } catch (error) {
        res.status(404).json({
            status: "Fail",
            message: error.message
        });
    }
}

exports.FollowUpdateCount = async function (req, res, next) {
    try {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const tomorrow = new Date(today);
        tomorrow.setDate(today.getDate() + 1);

        let data = await INTERVIEW.find({
            followupdate: {
                $gte: today,
                $lt: tomorrow
            },
            status : {
                $eq : "Pending"
            }
        }).count()

        res.status(200).json({
            status: "success",
            message: "Today Follow update Count Successful",
            data
        });
    } catch (error) {
        res.status(404).json({
            status: "Fail",
            message: error.message
        });
    }
}


exports.DueInterview = async function (req, res, next) {
    try {
        const today = new Date();
        today.setHours(0, 0, 0, 0);



        let data = await INTERVIEW.find({
            followupdate: {
                $lt: today
            },
            status : {
                $eq : "Pending"
            }
        }).populate(["studentname", "companyname"]);

        res.status(200).json({
            status: "success",
            message: "Due Follow update Interview Successful",
            data
        });
    } catch (error) {
        res.status(404).json({
            status: "Fail",
            message: error.message
        });
    }
}
exports.DueInterviewCount = async function (req, res, next) {
    try {
        const today = new Date();
        today.setHours(0, 0, 0, 0);



        // let data = await INTERVIEW.find([{
        //     followupdate: {
        //         $lt: today
        //     }
        // },{
        //     status : {
        //         $in : 'Pending'
        //     }
        // }]).count()

        let data = await INTERVIEW.find(
            {
                followupdate: {
                    $lt: today
                },
                status : {
                    $eq : "Pending"
                }
            }).count()

        console.log(data);

        res.status(200).json({
            status: "success",
            message: "Due Follow update Count Successful",
            data
        });
    } catch (error) {
        res.status(404).json({
            status: "Fail",
            message: error.message
        });
    }
}

exports.Delete = async function (req, res, next) {
    try {
        await INTERVIEW.findByIdAndDelete(req.params.id)
        res.status(204).json({
            status: "success",
            message: "Interview delete Successfull",
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
        let InterviewUpdate = await INTERVIEW.findByIdAndUpdate(req.params.id, req.body, { new: true })
        res.status(200).json({
            status: "success",
            message: "Interview update Successfull",
            data: InterviewUpdate
        })
    } catch (error) {
        res.status(404).json({
            status: "Fail",
            message: error.message
        })
    }
}

