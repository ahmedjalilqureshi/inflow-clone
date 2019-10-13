var mongoose = require('mongoose');
  var Schema = mongoose.Schema;

  var LpoSchema = new Schema({
    client:  String,
    client_id: String,
    date: String,
    due_date: String,
    lpo_number:   String,
    ref: String,
    items_array: String,
    flag:String,
    // vendor:  String,
    // purchase_array :String,
    // recieved_array:String,
    // po_num: String,
    // requisitioner: String,
    total:String,
    tax:String,
    discount:String,
    currency:String,
    status:{type:String,default:"draft"}
  });

  module.exports = mongoose.model('lpos',LpoSchema);