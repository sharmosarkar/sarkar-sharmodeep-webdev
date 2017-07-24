/**
 * Created by Sharmo on 7/23/2017.
 */

(function () {
    angular
        .module("WamApp")
        .controller("websiteNewController", websiteNewController);

    function websiteNewController($location, $routeParams, websiteService) {
        var model = this;

        model.userId = $routeParams.userId;

        model.createWebsite = createWebsite;

        function init() {
            model.websites = websiteService.findWebsitesByUser(model.userId);
        }
        init();

        function createWebsite(userId, website) {
            websiteService.createWebsite(userId, website);
            $location.url('/user/'+model.userId+'/website');
        }
    }
})();

