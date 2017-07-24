/**
 * Created by Sharmo on 7/23/2017.
 */

(function () {
    angular
        .module("WamApp")
        .controller("websiteListController", websiteListController);

    function websiteListController($routeParams, websiteService) {
        var model = this;

        model.userId = $routeParams.userId;

        function init() {
            model.websites = websiteService.findWebsitesByUser(model.userId);
            model._id = model.userId;
        }
        init();
    }
})();

