var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var ejs=require("ejs");
var session = require('express-session');
var bodyParser = require('body-parser');
var index=require("./routes/index.js");
var admin=require("./routes/admin.js");
var login=require("./routes/login.js");
var phone=require("./routes/phone.js");
var log=require("./routes/log.js");
var app = express();


app.use(session({
    secret: '123456',
    resave:true,
    saveUninitialized:true
}))

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));

//进入登陆

app.use("/login",login);

//中间件 检测登陆


//正常应用
app.use("/",index);
app.use("/admin",admin);
app.use("/phone",phone);
app.use("/log",log);

app.listen(8888,function(){
  console.log("start")
});
