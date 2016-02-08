app.controller('InputController',function($scope){
    $scope.test = "testy";
    $scope.login = function(){
        console.log($scope.email,$scope.name)
    }
})