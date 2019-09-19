var mongoose = require('mongoose');
  var Schema = mongoose.Schema;

  var EmployeeSchema = new Schema({
    name:  String,
    role: String,
    phone:   String,
    email:   String,
    department : String


  });

  module.exports = mongoose.model('employees',EmployeeSchema);