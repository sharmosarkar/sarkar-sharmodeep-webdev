/**
 * Created by Sharmo on 7/23/2017.
 */

(function () {
    angular
        .module("WamApp")
        .controller("websiteEditController", websiteEditController);

    function websiteEditController($location, $routeParams, websiteService) {
        var model = this;

        model.userId = $routeParams.userId;
        model.wid = $routeParams.wid;

        model.findWebsiteById = findWebsiteById;
        model.updateWebsite = updateWebsite;
        model.deleteWebsite = deleteWebsite;

        function init() {
            // model.websites = websiteService.findWebsitesByUser(model.userId);
            // model.website = findWebsiteById(model.wid);
            websiteService
                .findWebsitesByUser(model.userId)
                .then(function (websites) {
                    model.websites = websites;
                });
            websiteService
                .findWebsiteById(model.userId, model.wid)
                .then(function (response) {
                    model.website = response.data;
                });
        }
        init();

        function findWebsiteById(websiteId) {
            var website = websiteService.findWebsiteById(websiteId);
            return website;
        }
        
        function updateWebsite(websiteId, website) {
            // console.log(website);
            websiteService.updateWebsite(websiteId, website);
            $location.url('/user/'+model.userId+'/website');
        }

        function deleteWebsite(websiteId) {
            websiteService.deleteWebsite(websiteId);
            $location.url('/user/'+model.userId+'/website');
        }
    }
})();
