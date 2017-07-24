/**
 * Created by Sharmo on 7/23/2017.
 */

( function () {
    angular.module("WamApp")
    // the configuration occurs at startup of the app
        .config(configurationFunction);

    function configurationFunction($routeProvider) {
        $routeProvider
            .when("/user/:userId/website", {
                templateUrl: "views/website/templates/website-list.view.client.html",
                controller:  "websiteListController",
                controllerAs : "model"
            })
            .when("/user/:userId/website/new", {
                templateUrl: "views/website/templates/website-new.view.client.html",
                controller:  "websiteNewController",
                controllerAs : "model"
            })
    }

})();