/**
 * Created by Sharmo on 7/19/2017.
 */

( function () {
    angular
        .module("WamApp")
        .controller("loginController", loginController)
        .controller("profileController", profileController);


// $scope is the variable that binds the view and the controller
    function loginController($location, userService) {

        //
        var model = this;

        // event handlers declarations
        model.login = login;

        // onload functions
        function init() {

        }
        init();

        // event handler definitions
        model.hello = "Hello from loginController";
        function login (user) {
            // alert(user.username + "  :   "+user.password);
            var user = userService.findUserByUsernameAndPassword(user.username, user.password);
            if (user == null){
                model.errorMessage = "Wrong Username or Password";
                return;
            }
            else{
                // wrong username or passwrord
                // if ($scope.welcomeUser === undefined) {
                model.welcomeUser = user;
                $location.url("profile/" + user._id);
                //  }
            }
        }
    }


    function profileController($scope, $routeParams) {
        var user_id = $routeParams['userId'];
        alert(user_id);

    }

})();