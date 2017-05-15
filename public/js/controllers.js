angular.module("Controllers",["services"])
.controller("main",["$scope","$http",function($scope,$http){

    var swiper = new Swiper('.swiper-container',{
        pagination : '.swiper-pagination',
        scrollbar:'.swiper-scrollbar',
        effect : 'flip',
        onTransitionEnd:function(){

        }
    });

    $http({url:"/indexData"}).then(function(data){
       $scope.data=data.data;

       console.log($scope.data);
    })

}]).controller("phone",["$scope","$http",function($scope,$http){

    $http({url:"/phone/select"}).then(function(data){
        $scope.data=data.data;

    })



}]).controller("index",["$scope",function($scope){

    $scope.active="one";
    $scope.change=function(name){
        $scope.active=name;
    }

}]).controller("todo",["$scope","Todo",function($scope,Todo){

    $scope.data=Todo;

    $scope.del=function(index){
         $scope.data.splice(index,1);
         localStorage.todo=JSON.stringify($scope.data);
    }
     var list=$(".mui-navigate-right");
     var currentLeft=0;
    touch.on(".mui-navigate-right","dragstart",function(e){
        currentLeft= parseInt($(this).css("left"))?parseInt($(this).css("left")):0;
    })

     touch.on("body","drag",".mui-navigate-right",function(e){

            if(e.direction=="left") {
                var left=currentLeft+e.x;

                if(left<-50){
                    left=-50
                }
                // console.log(left);
                $(this).css("left",left);
            }else if(e.direction=="right"){
                var left=currentLeft+e.x;

                if(left>0){
                    left=0
                }
                // console.log(left);
                $(this).css("left",left);
            }
     })
}]).controller("todocon",["$scope","Todo",function($scope,Todo){

      $scope.data=Todo;

      $scope.con="";

      $scope.add=function(){
            $scope.data.push($scope.con);
            $scope.con="";
            localStorage.todo=JSON.stringify($scope.data);
      }
}]).controller("todoinfo",["$scope","$routeParams","Todo",function($scope,$routeParams,Todo){
    let id=$routeParams.id;
    $scope.data=Todo;

    $scope.currentData=$scope.data[id];
    $scope.$watch("currentData",function(){
        $scope.data[id]=$scope.currentData;
    })

    $scope.edit=function(){
        localStorage.todo=JSON.stringify($scope.data);

    }










}]).controller("list",["$scope","$location","$http",function($scope,$location,$http){




    $http({url:"/getCon",params:{url:Object.keys($location.$$search)[0]},responseType:"text"}).then(function(e){
        $scope.data=e.data;
        document.querySelector(".con").innerHTML=($scope.data);
    })
}]).controller("log",["$scope","$location","$http",function($scope,$location,$http){


}]).controller("send",["$scope","$location","$http",function($scope,$location,$http){

           $http({url:"/log/selectSend"}).then(function(data){
            $scope.data=data.data;
           })



}]).controller("jieshou",["$scope","$location","$http",function($scope,$location,$http){


    $http({url:"/log/selectdu"}).then(function(data){
            $scope.du=data.data
    })

    $http({url:"/log/selectun"}).then(function(data){
            $scope.un=data.data;
    })

    $scope.allFun=function(){
        $http({url:"/log/selectdu"}).then(function(data){
            $scope.du=data.data
        })

        $http({url:"/log/selectun"}).then(function(data){
            $scope.un=data.data;
        })
    }

    $scope.duFun=function(){
        $http({url:"/log/selectdu"}).then(function(data){
            $scope.du=data.data;
            $scope.un=[];
        })
    }

    $scope.unFun=function(){
        $http({url:"/log/selectun"}).then(function(data){
            $scope.un=data.data;
            $scope.du=[];
        })
    }



}]).controller("write",["$scope","$http","userInfo",function($scope,$http,userInfo){

    $http({url:"/log/selectUser"}).then(function(data){
        $scope.user=data.data;
    })

    /*
    userInfo.then(function(data){
        $scope.uid=data.data.uid;

    })

    */

      $scope.jieshouid="";
      $scope.title="";
      $scope.con="";

    $scope.send=function(){

        $http({url:"/log/addLog",params:{jieshouid:$scope.jieshouid,title:$scope.title,con:$scope.con}}).then(function (data) {
            if(data.data>0){
                $scope.jieshouid="";
                $scope.title="";
                $scope.con="";
            }
        })
    }



}]).controller("logshow",["$scope","$routeParams","$http",function($scope,$routeParams,$http){
   var id=$routeParams.logid;



   $http({url:"/log/logshow",params:{id:id}}).then(function(data){
       $scope.data=data.data;
   })
}])
