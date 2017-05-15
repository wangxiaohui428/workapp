angular.module("services",[])
.factory("Todo",function(){
    return localStorage.todo?JSON.parse(localStorage.todo):[];
}).factory("userInfo",function($http){
    return $http({url:"/userInfo"});
})