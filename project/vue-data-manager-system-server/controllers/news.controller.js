var mongoose = require("mongoose");
var News = require("../models/news.model");
var Comment = require("../models/comment.model");
async = require("async");

exports.create = function(req,res,next){
    const news = new News(req.body);

    console.log(req.body)
    news.save().then(function(data){
        res.json(data)
    })
}

exports.update = function(req,res,next){
    const news = new News(req.body);
    const id = req.params.id;
    // console.log("王伟");
    console.log(id)
    console.log(req.body)
    News.findByIdAndUpdate(id,{$set:req.body},
        {new:false}).then(function(data){
        console.log("80000");
        res.json(data)
    })
}

exports.list = function(req,res,next){
    var page = req.body.page ? req.body.page : 1;
    var limit = req.body.limit ? Number(req.body.limit) : 3;
    //这里的limit要记得转换成数字
    var queryCondition = {};
    if(req.body.name && req.body.name.trim().length>0){
        title = req.body.name;

        queryCondition = {
            "title":new RegExp(title,"i")
        }
    }
    console.log(req.body.cateId)
    if (req.body.cateId && req.body.cateId.trim()
            .length > 0) {
        cateId = req.body.cateId;
        queryCondition = {
            "cateId": cateId
        }
    }
    News.paginate(queryCondition, { page: page, limit: limit }, function (err, result) {
        console.log(result);

        async.map(result.docs, function(news, done) {
            Comment.count({ newsId: news._id }, function(err, count) {
                if (err)
                    done(err);
                else {
                    news.commentCount = count;
                    done(null, news);
                }
            });
        }, function(err) {
            if (err) {
                console.log(err)
            } else {
                res.json(result);
            }
        });
    });

    // });
}

exports.remove = function (req, res, next) {
    console.log(600)
    var id = req.params.id;
    News.findByIdAndRemove(id, function (err, doc) {
        res.json({ "message": "delete ok" });
    })

};

exports.removes = function (req, res, next) {
    var ids = req.body.ids;
    if (ids.length > 0) {
        News.remove({ _id: { $in: ids } })
            .then(deletedNewss => {
            res.json({ "message": "delete ok" });
    })
    } else {
        res.status(404)
            .send({ "message": "404" });
    }

};