/**
 * Created by Sharmo on 8/2/2017.
 */


( function () {
    angular.module("omdbApp")
    // the configuration occurs at startup of the app
        .config(configurationFunction);

    function configurationFunction($routeProvider) {
        $routeProvider
            .when("/", {
                templateUrl: "search.html",
                controller: "searchController",
                controllerAs: "model"
            })
            .when("/details/:imdbID", {
                templateUrl: "details.html",
                controller: "detailsController",
                controllerAs: "model"
            })
    }

})();