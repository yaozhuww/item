var mongoose = require('mongoose'),
    materializedPlugin = require('mongoose-materialized'),
    Schema = mongoose.Schema;
var CatSchema = new Schema({
    type:Number,
    title: {type: String},
    parentId:Object
});
CatSchema.plugin(materializedPlugin);

module.exports = mongoose.model("Cate",CatSchema);

