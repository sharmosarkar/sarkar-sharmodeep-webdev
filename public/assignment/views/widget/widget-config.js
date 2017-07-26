/**
 * Created by Sharmo on 7/24/2017.
 */


( function () {
    angular.module("WamApp")
    // the configuration occurs at startup of the app
        .config(configurationFunction);

    function configurationFunction($routeProvider) {
        $routeProvider
            .when("/user/:userId/website/:wid/page/:pid/widget", {
                templateUrl: "views/widget/templates/widget-list.view.client.html",
                controller:  "widgetListController",
                controllerAs : "model"
            })
            .when("/user/:userId/website/:wid/page/:pid/widget/new", {
                templateUrl: "views/widget/templates/widget-chooser.view.client.html",
                controller:  "widgetNewController",
                controllerAs : "model"
            })
            .when("/user/:userId/website/:wid/page/:pid/widget/:wgid", {
                templateUrl: "views/widget/templates/widget-edit.view.client.html",
                controller:  "widgetEditController",
                controllerAs : "model"
            })
    }

})();