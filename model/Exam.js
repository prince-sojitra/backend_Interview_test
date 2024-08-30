const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ExamSchema = new Schema({
  examname: { type: String, required: true ,unique : true},
  examdate: { type: Date , required : true},
  FacultyID : { type: mongoose.Types.ObjectId, ref: "faculty" , required : true},
  status: {
    type: String,
    enum: ['Pending', 'Cancel', 'Done' , 'Message Sended'],
    default: 'Pending',
    required: true,
  }
});

const EXAM = mongoose.model("Exam", ExamSchema)
module.exports = EXAM