var mongoose = require('mongoose');
  var Schema = mongoose.Schema;

  var ClientSchema = new Schema({
    sales_agreement:  String,
  });

  module.exports = mongoose.model('clients',ClientSchema);