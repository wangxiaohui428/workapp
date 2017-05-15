var express=require("express");
var mysql=require("../mysql");
var md5=require("../md5");
var router=express.Router();




function middle(req,res,next){
    /*
    if(!req.session.admin){
        res.redirect("/admin/login");
    }else {

        next();
    }
    */

    next();
}

router.get("/login",function(req,res){
    res.render("admin/login");
})

router.get("/login/checkLogin",function(req,res){
    var uname=req.query.uname;
    var upass=md5(req.query.upass);
    mysql.query("select * from user",function(error,result){
        if(error){
            console.log(error);
        }else{

            var flag=true;

            for(var i=0;i<result.length;i++){
                var rows=result[i];
                if(rows.uname===uname){
                    if(rows.upass==upass){
                        if(rows.uroot==0) {
                            flag = false;
                            var user = {
                                uname: uname,
                                login: "yes"
                            }
                            req.session.admin = user;

                            res.redirect("/admin");
                            res.end();
                            break;
                        }

                    }
                }
            }

            if(flag){
                res.redirect("/admin/login");
                res.end();
            }

        }
    });
})

router.get("/",middle,function(req,res){

    res.setHeader("content-type","text/html;charset=utf-8");
    res.render("admin/main",{user:req.session.admin.uname})
})

/*
* 网络安全
* */
router.get("/addUser",middle,function(req,res){
     res.render("admin/addUser");
})

router.get("/addUserInfo",middle,function(req,res){

    var uname=req.query.uname;
    var upass=md5(req.query.upass);
    var uroot=req.query.uroot;



    mysql.query(`insert into user (uname,upass,uroot) values ('${uname}','${upass}',${uroot})`,function(error){
        console.log(error);
                    res.redirect("/admin/login");
                    res.end();
    })
})


router.get("/reg",function(req,res){
    var sourceW=(70/1130)*1698;
    req.session.posx=(224-sourceW*2)*Math.random()+sourceW;
    console.log(req.session.posx)
    res.render("admin/addUser",{posx:req.session.posx});
})

router.get("/showCon",middle,function(req,res){
    var page=parseInt(req.query.page)||0;
    var num=10;

    let lastpage=(page-1)<0?0:(page-1);
    let nextpage=page+1;

    console.log(nextpage);
    mysql.query("select * from shows limit "+page*num +", "+num,function(error,result){
        res.render("admin/showCon",{result:result,lastpage:lastpage,nextpage:nextpage});
    });



})



module.exports=router;