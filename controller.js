/* global Firebase */
app.controller('InputController', function ($scope, FBREF, $firebaseArray) {

    var db = new Firebase(FBREF);
    console.log("What is FB obj?", db)
    $scope.itemList = $firebaseArray(new Firebase(FBREF + 'items'))
    $scope.test = "testy";

    function handleDBResponse(err, authData) {
        console.log('Did we get here?')
        if (err) {
            console.log(err)
            return;
        }
        console.log(authData);
        var userToSave = {
            username: $scope.user.email,
            reputation: 0,
            created: Date.now()
        }
        //This makes the login form disapear without clicking input field again//workaround for ng-show/hide issue
        $scope.$apply(function(){
            $scope.member = userToSave;
        })
        
        //This line saves user to DB
        db.child('users').child(authData.uid).update(userToSave);
    }
    
    $scope.register = function(user){
        db.createUser(user, handleDBResponse)
    }
    // We need to take the input from our form and pass it to our database
    // db is responsible for authentication
    // after user is authenticated db will send back either error or auth data
    //We want authData.uid
    
    $scope.login = function(user){
    db.authWithPassword(user, handleDBResponse)
    }
    
   // $scope.itemList = [];
    $scope.newItem = function(){
        if(!$scope.addItem){
            return
        }
        $scope.itemList.push($scope.addItem);
        $scope.addItem = '';
    }
    $scope.remove = function(i){
        $scope.itemList.splice(i,1)
    }

})