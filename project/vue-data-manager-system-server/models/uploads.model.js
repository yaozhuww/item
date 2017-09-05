var mongoose = require('mongoose'); // 引入的是mongoose
var mongoosePaginate = require('mongoose-paginate');
var Schema = mongoose.Schema; // 利用mongoose下的Schema(架构、模型)
var ObjectId = Schema.ObjectId;
var UploadsSchema = new Schema({
    fieldname: String,
    originalname: String,
    filename: String,
    encoding: String,
    cateId: ObjectId,
    path: String,
    size: 0,
    mimetype: String,
    date: { type: Date, default: Date.now },
    destination: String,
    des:{ type: String, default: "该图片没有描述" },
});

UploadsSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('Uplo', UploadsSchema);