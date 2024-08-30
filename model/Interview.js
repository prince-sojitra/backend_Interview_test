const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const InterviewSchema = new Schema({
  companyname: { type: mongoose.Types.ObjectId, ref: "company" , required: true },
  studentname: { type: mongoose.Types.ObjectId, ref: "student" , required : true},
  followupdate: { type: Date , required : true},
  status: {
    type: String,
    enum: ['Pending', 'Reject', 'Done'],
    default: 'Pending',
    required: true,
  },
  description: { type: String }

});

const INTERVIEW = mongoose.model("interview", InterviewSchema)
module.exports = INTERVIEW