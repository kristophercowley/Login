var app = angular.module('myapp',['firebase']);

//Declares constant for database reference so if i need to change where it points, I only have to change it here
app.constant('FBREF', 'https://test-two.firebaseio.com/')