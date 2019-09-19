var mongoose = require('mongoose');
  var Schema = mongoose.Schema;

  var Schema = new Schema({
    username:  String,
    name:String,
    password:String
    
  });

  module.exports = mongoose.model('users',Schema);