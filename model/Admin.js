const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AdminSchema = new Schema({
  email : {
    type : String,
    unique : true,
    required : true
  },
  password : {
    type : String,
    required : true
  }
});

const ADMIN = mongoose.model("admin",AdminSchema)
module.exports = ADMIN