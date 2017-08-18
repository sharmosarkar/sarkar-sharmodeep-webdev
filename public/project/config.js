/**
 * Created by Sharmo on 8/2/2017.
 */


( function () {
    angular.module("musicHub")
    // the configuration occurs at startup of the app
        .config(configurationFunction);

    function configurationFunction($routeProvider) {
        $routeProvider
            .when("/", {
                templateUrl: "views/HomePage.html",
                controller: "welcomeController",
                controllerAs: "model"
            })
            .when("/profile/manage", {
                templateUrl: "views/manageprofile.html",
                controller: "profileController",
                controllerAs: "model"
            })
            .when("/admin", {
                templateUrl: "views/admin/adminProfile.html",
                controller: "adminController",
                controllerAs: "model"
            })
            .when("/profile", {
                templateUrl: "views/userProfile.html",
                controller: "profileController",
                controllerAs: "model"
            })
            .when("/search", {
                templateUrl: "views/search.html",
                controller: "searchController",
                controllerAs: "model"
            })
            .when("/test", {
                templateUrl: "views/test.html",
                controller: "welcomeController",
                controllerAs: "model"
            })
            .when("/admin", {
                templateUrl: "views/admin/adminProfile.html",
                controller: "adminController",
                controllerAs: "model"
            })
            .when("/artist", {
                templateUrl: "views/artistdetails.html",
                controller: "searchController",
                controllerAs: "model"
            })
            .when("/user", {
                templateUrl: "views/userDetails.html",
                controller: "detailsController",
                controllerAs: "model"
            })
    }

})();