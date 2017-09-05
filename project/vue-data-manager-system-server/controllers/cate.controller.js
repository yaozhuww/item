var mongoose = require("mongoose");
var Cate = require("../models/cate.model");

exports.create = function(req,res,next){
    const cate = new Cate(req.body);

    console.log("2000")
    console.log(req.body);
    console.log(cate)
    cate.save().then(function(data){
        console.log(100)
        res.json(data)
    })
}

function reverseTree(data,id){
    var result = [];
    var temp;
    var data = JSON.parse(JSON.stringify(data));
    for(var i in data){
        if(data[i].parentId == id){
            result.push(data[i])
            temp = reverseTree(data,data[i]._id);
            if(temp.length > 0){
                data[i].children = temp;
            }
        }
    }
    return result;
}
exports.getall = function(req,res,next){
    var type = req.query.type;
    Cate.find({type:type},function(err,data){
        var rpTree = reverseTree(data,null);
        res.json(rpTree)
    })
}

exports.update = function(req, res, next) {
    const cate = new Cate(req.body);
    const id = req.params.id;

    Cate.findByIdAndUpdate(id, { $set: req.body }, { new: false })
        .then((data) => {
        res.send({ data });
})
};

exports.remove = function(req,res,next){
    const id = req.params.id;
    var ids = [];
    Cate.findOne({_id:id},function(err,data){
        if(data){
            ids = [data._id];
            data.getChildren().then(function(docs) {
                for (var i = 0; i < docs.length; i++) {
                    ids.push(docs[i]._id);
                }

                Cate.remove({ _id: { $in: ids } }).then(deleted => {
                    res.json({ "message": "delete ok" });
                })
            });
        }

    })
}