var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;


var schema = new Schema({
    title:String,
    author:String,
    // date: { type: Date },
    content:String,
    cateId:ObjectId,
    cate:String,
    commentCount:Number
});
schema.plugin(mongoosePaginate);

var Model = mongoose.model('ne',  schema);
module.exports = Model;