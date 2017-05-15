var express=require("express");
var path=require("path");
var mysql=require("../mysql");
var router=express.Router();

router.get("/selectUser",function(req,res){
    mysql.query("select * from user where uid>0",function(error,result){
        res.send(result);
    })
})

router.get("/addLog",function(req,res){
    var title=req.query.title;
    var con=req.query.con;
    var jieshouid=req.query.jieshouid;
    var sendid=req.session.user.uid;
    var state=1;
    mysql.query(`insert into logs (title,con,jieshouid,sendid,state) values ('${title}','${con}','${jieshouid}','${sendid}','${state}')`,function(error,result){
        res.send(result.affectedRows.toString());
    })
})

router.get("/selectSend",function(req,res){
    var uid=req.session.user.uid;
    mysql.query("select * from logs where sendid="+uid,function(error,result){
       res.send(JSON.stringify(result));
    })
})

router.get("/selectdu",function(req,res){
    var uid=req.session.user.uid;
    mysql.query("select * from logs where jieshouid="+uid+" and state=2",function(error,result){
        res.send(JSON.stringify(result));
    })
})

router.get("/selectun",function(req,res){
    var uid=req.session.user.uid;
    mysql.query("select * from logs where jieshouid="+uid+" and state=1",function(error,result){
        res.send(JSON.stringify(result));
    })

})

router.get("/logshow",function(req,res){
    var id=req.query.id;
    mysql.query("select * from logs where id="+id,function(error,result){
        mysql.query("update logs set state=2 where id="+id,function(){
            res.send(JSON.stringify(result[0]));
        })

    })

})




module.exports=router;