/**
 * Created by Sharmo on 7/23/2017.
 */


( function () {
    angular
        .module("WamApp")
        .controller("profileController", profileController);


    function profileController($location, $routeParams, userService) {
        var model = this;
        var userId = $routeParams["userId"];

        model.updateUser = updateUser;
        model.unregister = unregister;

        function init() {
            model.user = userService.findUserById(userId);
        }
        init();

        function updateUser(user) {
            var result = userService.updateUser(userId, user);
            if (result === "Updated"){
                model.updateResult = '  Awesome, your Profile data has been updated !!'
            }
            else{
                model.updateResult = '  Oops!! Something went wrong! We couldn\'t find your Id in the database';
            }
            // model.updateResult = result;
            console.log(model.updateResult);
        }

        function unregister() {
            userService.deleteUser(userId);
            $location.url('login');
        }
    }


})();