var express = require("express");
var router = express.Router();
var dataCtrl = require("../controllers/cate.controller");
//
router.get("/",dataCtrl.getall);
router.post("/data",dataCtrl.create);
router.put('/data/:id', dataCtrl.update);
router.delete('/:id', dataCtrl.remove);

module.exports = router;