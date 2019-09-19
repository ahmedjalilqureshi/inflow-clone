var mongoose = require('mongoose');
  var Schema = mongoose.Schema;

  var PackingSchema = new Schema({
    lpo_ref:  String,
    number: String,
    items_list:String

  });

  module.exports = mongoose.model('packing_lists',PackingSchema);