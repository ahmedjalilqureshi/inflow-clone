var mongoose = require('mongoose');
  var Schema = mongoose.Schema;

  var InfoSchema = new Schema({
    last_number:  Number,
    po_num:Number,
    sizes:Array,
    invoice_num:Number,
    sales_terms:String,
    purchase_terms:String,
    USD:Number,
    GBP:Number,
    EURO:Number,
    AED:Number
    
  });

  module.exports = mongoose.model('infos',InfoSchema);