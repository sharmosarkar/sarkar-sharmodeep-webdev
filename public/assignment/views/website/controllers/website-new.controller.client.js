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
            // model.websites = websiteService.findWebsitesByUser(model.userId);
            websiteService.findWebsitesByUser(model.userId)
                .then(function (websites) {
                    model.websites = websites;
                });
        }
        init();

        function createWebsite(user_id, website) {
            // websiteService.createWebsite(userId, website);
            // $location.url('/user/'+model.userId+'/website');
            websiteService
                .createWebsite(user_id, website)
                .then(function () {
                    $location.url("/user/"+model.userId+"/website");
                });
        }
    }
})();

