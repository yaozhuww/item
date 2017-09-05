var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');

var schema = new mongoose.Schema({
    name:String,
    pwd:String,
    // mail:String,
    city:String,
    // date:{type:Date},
    gender:String,
    interest:[],
    desc:String
});
schema.plugin(mongoosePaginate);

var Model = mongoose.model('member',  schema);
module.exports = Model;