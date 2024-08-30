const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CoursesSchema = new Schema({
  course : {
    type : String,
    required : true,
    unique : true
  }
});

const COURSE = mongoose.model("course",CoursesSchema)
module.exports = COURSE