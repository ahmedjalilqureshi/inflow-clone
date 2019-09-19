var mongoose = require('mongoose');
  var Schema = mongoose.Schema;

  var GR_NoteSchema = new Schema({
    po_ref:  String,
    invoice_num: String,
    date:String,
    recieved_by:String,
    items_list:String,
    vendor : String,
    payment : {type:String,default:'0.00'},
    total : {type:String,default:'0.00'}
  });

  module.exports = mongoose.model('gr_notes',GR_NoteSchema);