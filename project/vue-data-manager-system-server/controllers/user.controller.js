var mongoose = require("mongoose");
var User = require("../models/user.model");

exports.create = function(req,res,next){
    const user = new User(req.body);
    console.log("1")
    console.log(req.body)
    console.log(2)
    user.save().then(function(data){
        console.log(900)
        console.log(data)
        res.json(data)
    })
}

exports.update = function(req,res,next){
    const user = new User(req.body);
    const id = req.params.id
    console.log("这里2")
    User.findByIdAndUpdate(id,{$set:req.body},
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
        name = req.body.name;

        queryCondition = {
            "name":new RegExp(name,"i")
        }
    }
    if(req.body.password && req.body.password.trim().length>0){
        var password = req.body.password;
        queryCondition.pwd = password;
    }
    User.paginate(queryCondition, { page: page, limit: limit }, function (err, result) {
        console.log(result)
        res.json(result);
    });
}

exports.remove = function (req, res, next) {
    console.log(600)
    var id = req.params.id;
    User.findByIdAndRemove(id, function (err, doc) {
        res.json({ "message": "delete ok" });
    })

};

exports.removes = function (req, res, next) {
    var ids = req.body.ids;
    if (ids.length > 0) {
        User.remove({ _id: { $in: ids } })
            .then(deletedUsers => {
            res.json({ "message": "delete ok" });
    })
    } else {
        res.status(404)
            .send({ "message": "404" });
    }

};