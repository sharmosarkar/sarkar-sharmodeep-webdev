/**
 * Created by Sharmo on 7/23/2017.
 */

( function () {
    angular
        .module("WamApp")
        .controller("registerController", registerController);


// $scope is the variable that binds the view and the controller
    function registerController($location, userService) {

        //
        var model = this;

        // event handlers declarations
        model.registerUser = registerUser;

        // onload functions
        function init() {

        }
        init();

        // event handler definitions
        function registerUser (user) {
            if (user.password === user.password_2){
                var promise = userService.findUserByUsername(user.username);
                promise
                    .then(function (response) {
                        var _user = response.data;
                        if(_user === "0") {
                            return userService.createUser(user)
                        } else {
                            model.error = "User already exists";
                        }
                    })
                    .then(function (response) {
                        _user = response.data;
                        // console.log(_user);
                        $location.url("/profile/" + _user._id);
                    });

            }
            else{
                model.passwordMismatch = 'Please Verify your password again. The two passwords don\'t match';
                console.log('Wrong');
            }

        }
    }

})();