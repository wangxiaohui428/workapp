var express=require("express");
var path=require("path");
var nodegrass=require("nodegrass")
var mysql=require("../mysql");
var router=express.Router();

function  middle (req,res,next){


    // if(!req.session.user){
    //     res.redirect("/login");
    // }else {
    //
    //     next();
    // }


    next();
}


router.get("/",middle,function(req,res,next){
    next();
},function(req,res){

   res.render("index")
})

router.get("/login",middle,function(req,res){
    res.render("login")
})


router.get("/indexData",middle,function(req,res){
        mysql.query("select * from shows  order by catid asc limit 0,10",function(error,result){
            res.send(result);
        });
})
router.get("/welcome",middle,function(req,res){
    res.render("welcome")
})
router.get("/tpl/:name",middle,function(req,res){


   // res.sendFile(path.join(process.cwd(),"public/tpl/"+req.params.name))
    res.sendFile(path.join(process.argv[1].slice(0,process.argv[1].lastIndexOf("\\")),"publicl/"+req.params.name))
})

router.get("/getCon",middle,function(req,res){
    var url=req.query.url;
    console.log(url);
    nodegrass.get(url,function(body){
        //console.log(body);
        res.send(body);
    },"gbk");

})

router.get("/userInfo",middle,function(req,res){
      console.log(req.session.user)
      res.send(JSON.stringify(req.session.user));
})

module.exports=router;