const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FacultySchema = new Schema({
  faculty : {
    type : String,
    required : true,
    unique : true
  }
});

const FACULTY = mongoose.model("faculty",FacultySchema)
module.exports = FACULTY