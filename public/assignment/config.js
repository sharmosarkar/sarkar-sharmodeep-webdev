/**
 * Created by Sharmo on 7/19/2017.
 */

( function () {
                angular.module("WamApp")
                    // the configuration occurs at startup of the app
                    .config(configurationFunction);

    function configurationFunction($routeProvider) {
        $routeProvider
            .when("/", {
                templateUrl: "views/user/templates/login.view.client.html",
                controller:  "loginController",
                controllerAs : "model"
            }) // means, if you login in url .. render the corresponding html
            .when("/login", {
                templateUrl: "views/user/templates/login.view.client.html",
                controller:  "loginController",
                controllerAs : "model"
            })

    }

})();