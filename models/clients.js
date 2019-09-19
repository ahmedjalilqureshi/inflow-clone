var mongoose = require('mongoose');
  var Schema = mongoose.Schema;

  var ClientSchema = new Schema({
    name:  String,
    company_name: String,
    street:   String,
    city:   String,
    phone:   String,
    email:   String


  });

  module.exports = mongoose.model('clients',ClientSchema);