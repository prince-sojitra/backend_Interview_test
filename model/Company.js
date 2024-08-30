const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CompanySchema = new Schema({
  company : {
    type : String,
    required : true,
    unique : true
  },
  contact : {
    type : String,
    require : true,
    unique : true
  },
  url : {
    type : String,
  },
  address : {
    type : String,
  },
  area : {
    type : String,
  },
  city : {
    type : String
  },
  note : {
    type : String
  }
});

const COMPANY = mongoose.model("company",CompanySchema)
module.exports = COMPANY