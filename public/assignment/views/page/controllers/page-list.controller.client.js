/**
 * Created by Sharmo on 7/24/2017.
 */

(function () {
    angular
        .module("WamApp")
        .controller("pageListController", pageListController);

    function pageListController($routeParams, pageService) {
        var model = this;

        model.userId = $routeParams.userId;
        model.wid = $routeParams.wid;

        function init() {
                pageService
                    .findPageByWebsiteId(model.wid)
                    .then(function (websites) {
                        model.pages = websites;
                    });
        }
        init();
    }
})();
