/**
 * Created by Sharmo on 7/17/2017.
 */


// iife
(function () {

    var app = angular.module("WamApp", ["ngRoute"]);

//     app.controller("loginController", loginController);
//     app.controller("profileController", profileController);
//
// // the configuration occurs at startup of the app
//     app.config(configurationFunction);
//
//     function configurationFunction($routeProvider) {
//         $routeProvider
//             .when("/login", {
//                 templateUrl: "user/login_partial.html"
//             }) // means, if you login in url .. render the corresponding html
//             .when("/register", {
//                 templateUrl: "user/register.html"
//             })
//             .when("/profile/:userId", {
//                 templateUrl: "user/profile_partial.html"
//             })
//     }
//
// // $scope is the variable that binds the view and the controller
//     function loginController($scope, $location) {
//         var valid_users = [
//             {_id: "123", username: "alice", password: "alice", firstName: "Alice", lastName: "Wonder"},
//             {_id: "234", username: "bob", password: "bob", firstName: "Bob", lastName: "Marley"},
//             {_id: "345", username: "charly", password: "charly", firstName: "Charly", lastName: "Garcia"},
//             {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose", lastName: "Annunzi"}
//         ];
//
//         $scope.hello = "Hello from loginController";
//         $scope.login = function (user) {
//             // alert(user.username + "  :   "+user.password);
//             for (var u in valid_users) {
//                 var _user = valid_users[u];
//                 if (_user.username === user.username && _user.password === user.password) {
//                     $scope.welcomeUser = _user;
//                     $location.url("profile/" + _user._id)
//                 }
//             }
//             // we have looped over all the valid users and not routed out,
//             //      hence wrong username or passwrord
//             if ($scope.welcomeUser === undefined) {
//                 $scope.errorMessage = "Wrong Username or Password"
//             }
//         }
//     }
//
//
//     function profileController($scope, $routeParams) {
//         var user_id = $routeParams['userId']
//         alert(user_id);
//     }

})();

