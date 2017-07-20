/**
 * Created by Sharmo on 7/19/2017.
 */

( function () {
                angular.module("WamApp")
                    // the configuration occurs at startup of the app
                    .config(configurationFunction);

    function configurationFunction($routeProvider) {
        $routeProvider
            .when("/login", {
                templateUrl: "../assignment/user/login_partial.html",
                controller:  "loginController",
                controllerAs : "model"
            }) // means, if you login in url .. render the corresponding html
            .when("/register", {
                templateUrl: "../assignment/user/register.html"
            })
            .when("/profile/:userId", {
                templateUrl: "../assignment/user/profile_partial.html"
            })

            ///
            .when("/user/:userId/website",{
                // put in the templateUrl
                // put in the controller
                // put in the controllerAs
            })
    }

})();