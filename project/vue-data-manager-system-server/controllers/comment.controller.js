var mongoose = require("mongoose");
var Comment = require("../models/comment.model");

exports.create = function(req,res,next){
    const comment = new Comment(req.body);

    console.log(req.body)
    comment.save().then(function(data){
        console.log(data)
        res.json(data)
    })
}

exports.update = function(req,res,next){
    const comment = new Comment(req.body);
    const id = req.params.id
    console.log("这里")
    comment.findByIdAndUpdate(id,{$set:req.body},
        {new:false}).then(function(data){
        console.log("80000");
        res.json(data)
    })
}

exports.list = function(req,res,next){
    var page = req.body.page ? req.body.page : 1;
    var limit = req.body.limit ? Number(req.body.limit) : 4;
    //这里的limit要记得转换成数字
    var queryCondition = {};
    // if(req.body.title && req.body.title.trim().length>0){
    //     title = req.body.title;
    //
    //     queryCondition = {
    //         "title":new RegExp(title,"i")
    //     }
    // }
    // console.log(req.body.cateId)
    console.log("newsId"+req.body.newsId)
    if (req.body.newsId && req.body.newsId.trim()
            .length > 0) {
        newsId = req.body.newsId;
        queryCondition = {
            "newsId": newsId
        }
    }
    Comment.paginate(queryCondition, { page: page, limit: limit }, function (err, result) {
        // console.log(result);
        // console.log(result)
        res.json(result);
    });
}

exports.remove = function (req, res, next) {
    console.log(600)
    var id = req.params.id;
    Comment.findByIdAndRemove(id, function (err, doc) {
        res.json({ "message": "delete ok" });
    })

};

exports.removes = function (req, res, next) {
    var ids = req.body.ids;
    if (ids.length > 0) {
        Comment.remove({ _id: { $in: ids } })
            .then(deletedNewss => {
            res.json({ "message": "delete ok" });
    })
    } else {
        res.status(404)
            .send({ "message": "404" });
    }

};