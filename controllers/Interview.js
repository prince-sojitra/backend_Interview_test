var INTERVIEW = require('../model/Interview')
var ADMIN = require('../model/Admin')
exports.Create = async function (req, res, next) {
    try {
        req.body.userID = req.user
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
        let data = await INTERVIEW.find().populate(["studentname", "companyname", "userID"])
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
            status: {
                $eq: "Pending"
            }
        }).populate(["studentname", "companyname",'userID']);

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

exports.countFacultywiseJobDonewithinMonth = async function (req, res, next) {
    try {
        const startOfMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
  const endOfMonth = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0, 23, 59, 59, 999);

  const result = await ADMIN.aggregate([
    // Look up interviews for each admin
    {
      $lookup: {
        from: 'interviews', // Ensure this matches your interview collection name
        localField: '_id',
        foreignField: 'userID',
        as: 'interviews'
      }
    },
    // Unwind the interviews array to process each interview
    {
      $unwind: {
        path: '$interviews',
        preserveNullAndEmptyArrays: true // Keep admins even if they have no interviews
      }
    },
    // Match interviews that fall within the current month
    {
      $match: {
        $or: [
          { 'interviews.followupdate': { $gte: startOfMonth, $lte: endOfMonth } },
          { 'interviews': { $eq: null } } // Keep admins with no interviews
        ]
      }
    },
    // Group by admin and status, counting how many interviews each admin has for each status
    {
      $group: {
        _id: {
          userID: '$_id',
          username: '$username',
          status: '$interviews.status'
        },
        count: { $sum: 1 }
      }
    },
    // Group by admin to accumulate interview counts by status
    {
      $group: {
        _id: { userID: '$_id.userID', username: '$_id.username' },
        pending: {
          $sum: {
            $cond: [{ $eq: ['$_id.status', 'Pending'] }, '$count', 0]
          }
        },
        reject: {
          $sum: {
            $cond: [{ $eq: ['$_id.status', 'Reject'] }, '$count', 0]
          }
        },
        done: {
          $sum: {
            $cond: [{ $eq: ['$_id.status', 'Done'] }, '$count', 0]
          }
        }
      }
    },
    // Add 0 for counts where an admin has no interviews
    {
      $project: {
        _id: 0,
        userID: '$_id.username',
        pending: { $ifNull: ['$pending', 0] },
        reject: { $ifNull: ['$reject', 0] },
        done: { $ifNull: ['$done', 0] }
      }
    }
  ]);

        res.status(200).json({
            status: "success",
            message: "Faculty-wise jobs done within the current month",
            data: result
        });
    } catch (error) {
        res.status(404).json({
            status: "Fail",
            message: error.message
        });
    }
}



exports.countAlldataFollow = async function (req, res, next) {
    try {

  const result = await ADMIN.aggregate([
    // Look up interviews for each admin
    {
      $lookup: {
        from: 'interviews', // Ensure this matches your interview collection name
        localField: '_id',
        foreignField: 'userID',
        as: 'interviews'
      }
    },
    // Unwind the interviews array to process each interview
    {
      $unwind: {
        path: '$interviews',
        preserveNullAndEmptyArrays: true // Keep admins even if they have no interviews
      }
    },
    // Match interviews that fall within the current month
   
    // Group by admin and status, counting how many interviews each admin has for each status
    {
      $group: {
        _id: {
          userID: '$_id',
          username: '$username',
          status: '$interviews.status'
        },
        count: { $sum: 1 }
      }
    },
    // Group by admin to accumulate interview counts by status
    {
      $group: {
        _id: { userID: '$_id.userID', username: '$_id.username' },
        pending: {
          $sum: {
            $cond: [{ $eq: ['$_id.status', 'Pending'] }, '$count', 0]
          }
        },
        reject: {
          $sum: {
            $cond: [{ $eq: ['$_id.status', 'Reject'] }, '$count', 0]
          }
        },
        done: {
          $sum: {
            $cond: [{ $eq: ['$_id.status', 'Done'] }, '$count', 0]
          }
        }
      }
    },
    // Add 0 for counts where an admin has no interviews
    {
      $project: {
        _id: 0,
        userID: '$_id.username',
        pending: { $ifNull: ['$pending', 0] },
        reject: { $ifNull: ['$reject', 0] },
        done: { $ifNull: ['$done', 0] }
      }
    }
  ]);

        res.status(200).json({
            status: "success",
            message: "Faculty-wise jobs done within the current month",
            data: result
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
            status: {
                $eq: "Pending"
            }
        }).countDocuments()

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
            status: {
                $eq: "Pending"
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
                status: {
                    $eq: "Pending"
                }
            }).countDocuments()

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

