var request=require("request");
for(var i=0;i<100000;i++){
    request.get("http://localhost:8888/admin/addUserInfo?uname=111&upass=1&uroot=0",function(error){
        console.log(error);
        console.log("ok");
    })
}