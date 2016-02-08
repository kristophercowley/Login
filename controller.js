/* global Firebase */
app.controller('InputController', function ($scope, FBREF) {

    var db = new Firebase(FBREF);
    console.log("What is FB obj?", db)

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
        //This line saves user to DB
        db.child('users').child(authData.uid).update(userToSave)
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



})