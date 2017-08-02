/**
 * Created by Sharmo on 7/24/2017.
 */

(function () {
    angular
        .module("WamApp")
        .controller("pageNewController", pageNewController);

    function pageNewController($location, $routeParams, pageService) {
        var model = this;

        model.userId = $routeParams.userId;
        model.wid = $routeParams.wid;

        model.createPage = createPage;

        function init() {
            pageService
                .findPageByWebsiteId(model.wid)
                .then(function (pages) {
                    model.pages = pages;
                });
        }
        init();
        
        function createPage(websiteId, page) {
            // pageService.createPage(websiteId, page);
            // $location.url('/user/'+model.userId+'/website/'+model.wid+'/page');
            pageService
                .createPage(websiteId, page)
                .then(function () {
                    $location.url('/user/'+model.userId+'/website/'+model.wid+'/page');
                });
        }
    }
})();