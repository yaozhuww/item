var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;


var schema = new Schema({
    newsId:ObjectId,
    author:"",
    // date: { type: Date, default: Date.now},
    date:String,
    content:String
});
schema.plugin(mongoosePaginate);

var Model = mongoose.model('comment',  schema);
module.exports = Model;