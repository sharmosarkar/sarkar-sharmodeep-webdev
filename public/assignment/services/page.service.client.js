/**
 * Created by Sharmo on 7/24/2017.
 */

(function () {

    angular
        .module("WamApp")
        .factory("pageService", pageService);

    function pageService() {

        // data in service
        var pages = [
                { "_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem" },
                { "_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem" },
                { "_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem" }
            ];

        var api =  {

            'createPage' : createPage,
            'findPageByWebsiteId' : findPageByWebsiteId,
            'findPageById' : findPageById,
            'updatePage': updatePage,
            'deletePage': deletePage
        };
        return api;

        function createPage(websiteId, page) {
            page.websiteId = websiteId;
            var total_existing_pages = pages.length;
            var new_page_id = (total_existing_pages+1)+''+(total_existing_pages+2)+''+(total_existing_pages+3);
            page._id = new_page_id;
            pages.push(page);
        }
        
        function findPageByWebsiteId(websiteId)  {
            var page_list = [];
            for (var u in pages) {
                var _page = pages[u];
                if (_page.websiteId === websiteId ) {
                    page_list.push(_page);
                }
            }
            return page_list;
        }

        function findPageById(pageId) {
            for (var u in pages) {
                var _page = pages[u];
                if (_page._id === pageId) {
                    return _page
                }
            }
        }

        function updatePage(pageId, page)  {
            for (var u in pages) {
                var _page = pages[u];
                if (_page._id === pageId) {
                    _page.name = page.name;
                    _page.description = page.description;
                }
            }
        }
        
        function deletePage(pageId) {
            for (var u in pages) {
                var _page = pages[u];
                if (pageId === _page._id) {
                    pages.splice(u, 1);
                }
            }
        }
    }

})();

