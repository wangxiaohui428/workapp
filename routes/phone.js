var express=require("express");
var path=require("path");
var mysql=require("../mysql");
var router=express.Router();

router.get("/addPhone",function(req,res){
res.render("phone/addPhone");
})
router.get("/addPhoneInfo",function(req,res){
    var name=req.query.name;
    var phone=req.query.phone;
    mysql.query(`insert into phone (name,phone) values ('${name}',${phone})`,function () {

        res.redirect("/phone/addPhone");
        res.end();
    })
})
router.get("/select",function(req,res){
   mysql.query("select * from phone",function(error,result){

         res.send(JSON.stringify(result));
   })
})


module.exports=router;