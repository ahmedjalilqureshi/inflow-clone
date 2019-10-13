var mongoose = require('mongoose');
  var Schema = mongoose.Schema;

  var JobSchema = new Schema({
    lpo_id: String,
    ref:  String,
    date: String,
    number: String,
    product:   String,
    style:   String,
    style_id : String,
    size:String,
    person:String,
    measurements:String,
    quantity : Number,
    printed : Number,
    cutting : Number,
    cutting_arr: Array,
    cutting_by:String,
    cutting_on:String,
    stitching : Number,
    stitching_arr : Array,
    stitching_by:String,
    stitching_on:String,
    packing : Number,
    packing_arr:Array,
    packing_by:String,
    packing_on:String, 
    qc:Number,
    qc_arr:Array,
    qc_by:String,
    qc_on:String,
    ready_to_deliver:Boolean,
    in_packing_list:Boolean,
    delivered : Number,
    delivery_by:String,
    delivery_on:String,
    starting_number : Number

  });

  module.exports = mongoose.model('job_slips',JobSchema);