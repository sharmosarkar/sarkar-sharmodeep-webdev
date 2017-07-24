/**
 * Created by Sharmo on 7/24/2017.
 */

( function () {
    angular.module("WamApp")
    // the configuration occurs at startup of the app
        .config(configurationFunction);

    function configurationFunction($routeProvider) {
        $routeProvider
            .when("/user/:userId/website/:wid/page", {
                templateUrl: "views/page/templates/page-list.view.client.html",
                controller:  "pageListController",
                controllerAs : "model"
            })
            .when("/user/:userId/website/:wid/page/new", {
                templateUrl: "views/page/templates/page-new.view.client.html",
                controller:  "pageNewController",
                controllerAs : "model"
            })
            .when("/user/:userId/website/:wid/page/:pid", {
                templateUrl: "views/page/templates/page-edit.view.client.html",
                controller:  "pageEditController",
                controllerAs : "model"
            })
    }

})();