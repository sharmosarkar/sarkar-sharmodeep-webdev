/**
 * Created by sharmo on 8/11/17.
 */


(function () {
    angular
        .module("musicHub")
        .controller("loginController", loginController);

    function loginController($location, userService, $rootScope){

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