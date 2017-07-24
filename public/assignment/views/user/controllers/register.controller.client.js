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
        function registerUser (user_reg) {
            if (user_reg.password === user_reg.password_2){
                var user_id = userService.createUser(user_reg);
                $location.url("profile/"+user_id);
            }
            else{
                model.passwordMismatch = 'Please Verify your password again. The two passwords don\'t match';
                console.log('Wrong');
            }

        }
    }

})();