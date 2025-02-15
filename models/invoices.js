var mongoose = require('mongoose');
  var Schema = mongoose.Schema;

  var InvoiceSchema = new Schema({
    lpo_ref:  String,
    lpo_id:  String,
    number: String,
    items_list:String,
    date:String,
    ref:String,
    company:String,
    company_id:String,
    payment : {type:String,default:'0.00'},
    total : {type:String,default:'0.00'}

  });

  module.exports = mongoose.model('invoices',InvoiceSchema);