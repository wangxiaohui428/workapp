var mysql=require("./mysql");
var md5=require("./md5");
console.log(md5("admin"));


//创建库
mysql.query("create database abcdefg",function(error,result){
    console.log("库创建成功");
    if(!error){
       mysql.query("use abcdefg",function(){
                console.log("使用 abcdefg");
           mysql.query(`create table abcd (
                         id int(11) auto_increment primary key,
                         name varchar(255),
                         age char(2))default charset=utf8;`,function(){
               console.log("表创建成功");
               mysql.query("insert into abcd (name,age) values ('111','男')",function(){
                    console.log("插入数据成功");
                    mysql.end();
               })
           })
       })
    }
})