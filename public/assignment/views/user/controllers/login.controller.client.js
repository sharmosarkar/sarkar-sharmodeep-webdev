/**
 * Created by Sharmo on 7/23/2017.
 */

( function () {
    angular
        .module("WamApp")
        .controller("loginController", loginController);


// $scope is the variable that binds the view and the controller
    function loginController($location, userService, $rootScope) {

        //
        var model = this;

        // event handlers declarations
        model.login = login;

        // onload functions
        function init() {

        }
        init();

        // event handler definitions
        function login (user) {
            if(!user) {
                model.errorMessage = "User not found";
                return;
            }
            // user = userService.findUserByCredentials(user.username, user.password);
            var promise = userService.findUserByCredentials(user.username, user.password);
            promise
                .then(function (response) {
                    user = response.data;
                    console.log(user);
                    if(user === null) {
                        model.errorMessage = "Wrong Username or Password";
                    } else {
                        $rootScope.currentUser = user;
                        $location.url("profile/"+user._id);
                    }
                });
        }
    }

})();