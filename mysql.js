var mysql=require("mysql");

var obj=mysql.createConnection({
    host:"localhost",
    port:"3306",
    user:"root",
    password:"",
    database:"work"
});

obj.query("set names utf8");

module.exports=obj;