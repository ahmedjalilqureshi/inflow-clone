var mongoose = require('mongoose');
  var Schema = mongoose.Schema;

  var FabricSchema = new Schema({
    name:  String,
    fabric_code: String,
    width:   String,
    detail: String,
    color:   String
   

  });

  module.exports = mongoose.model('fabrics',FabricSchema);