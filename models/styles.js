var mongoose = require('mongoose');
  var Schema = mongoose.Schema;

  var StyleSchema = new Schema({
    title:  String,
    client:String,
    fabric_code: String,
    product:   String,
    details: String,
    measurements:   String,
    picture: String,
    logo:   String,
    gender: String

  });

  module.exports = mongoose.model('styles',StyleSchema);