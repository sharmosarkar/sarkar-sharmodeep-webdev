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
            var promise = userService.findUserById(userId);
            promise.then(function (response) {
                model.user = response.data;
            });
        }
        init();

        function updateUser(user) {
            var result = userService.updateUser(user._id, user);
            // console.log(result);
            // console.log(result.$$state);
            // console.log(result.$$state.status);
            var status = result.$$state.status;
            if (status === 0){
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