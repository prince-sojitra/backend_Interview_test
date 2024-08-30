const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StudentSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  contact: {
    type: String,
    required: true,
    unique : true
  },
  course: {
    type: mongoose.Types.ObjectId,
    ref: "course"
  },
  jobstatus : {
    type: String,
    enum: ['Pending','Reject','Done'],
    default: 'Pending',
    required: true,
  },
  experience : {
    type : String,
    require : true
  },
  branch : {
    type : String,
    require : true
  },
  note : {
    type : String,
    require : true
  }
});

const STUDENT = mongoose.model("student", StudentSchema)
module.exports = STUDENT