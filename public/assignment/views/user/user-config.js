/**
 * Created by Sharmo on 7/22/2017.
 */


( function () {
    angular.module("WamApp")
    // the configuration occurs at startup of the app
        .config(configurationFunction);

    function configurationFunction($routeProvider) {
        $routeProvider
            .when("/register", {
                templateUrl: "../assignment/views/user/templates/register.view.client.html",
                controller: "registerController",
                controllerAs: "model"
            })
            .when("/profile/:userId", {
                templateUrl: "../assignment/views/user/templates/profile.view.client.html",
                controller:  "profileController",
                controllerAs : "model"
            })

            // ///
            // .when("/user/:userId/website",{
            //     // put in the templateUrl
            //     // put in the controller
            //     // put in the controllerAs
            // })
    }

})();