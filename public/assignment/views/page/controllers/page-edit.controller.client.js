/**
 * Created by Sharmo on 7/24/2017.
 */

(function () {
    angular
        .module("WamApp")
        .controller("pageEditController", pageEditController);

    function pageEditController($location, $routeParams, pageService) {
        var model = this;

        model.userId = $routeParams.userId;
        model.wid = $routeParams.wid;
        model.pid = $routeParams.pid;

        model.updatePage = updatePage;
        model.deletePage = deletePage;

        function init() {
            pageService
                .findPageByWebsiteId(model.wid)
                .then(function (pages) {
                    model.pages = pages;
                });
            pageService
                .findPageById(model.pid)
                .then(function (response) {
                    model.page = response.data;
                });
        }
        init();

        function updatePage(pageId, page)  {
            pageService.updatePage(pageId, page);
            $location.url('/user/'+model.userId+'/website/'+model.wid+'/page');

        }
        
        function deletePage(pageId) {
            pageService.deletePage(pageId);
            $location.url('/user/'+model.userId+'/website/'+model.wid+'/page');
        }
    }
})();