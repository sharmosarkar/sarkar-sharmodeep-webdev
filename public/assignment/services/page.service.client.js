/**
 * Created by Sharmo on 7/24/2017.
 */

(function () {

    angular
        .module("WamApp")
        .factory("pageService", pageService);

    function pageService($http) {


        var api =  {

            'createPage' : createPage,
            'findPageByWebsiteId' : findPageByWebsiteId,
            'findPageById' : findPageById,
            'updatePage': updatePage,
            'deletePage': deletePage
        };
        return api;

        function createPage(websiteId, page) {
            // page.websiteId = websiteId;
            // var total_existing_pages = pages.length;
            // var new_page_id = (total_existing_pages+1)+''+(total_existing_pages+2)+''+(total_existing_pages+3);
            // page._id = new_page_id;
            // pages.push(page);
            var url = "/api/website/" + websiteId + "/page";
            return $http.post(url, page);
        }
        
        function findPageByWebsiteId(websiteId)  {
            // var page_list = [];
            // for (var u in pages) {
            //     var _page = pages[u];
            //     if (_page.websiteId === websiteId ) {
            //         page_list.push(_page);
            //     }
            // }
            // return page_list;
            var url = "/api/website/" + websiteId + "/page";
            return $http.get(url)
                .then(function (response) {
                    // console.log(response.data);
                    return response.data;
                });
        }

        function findPageById(pageId) {
            // for (var u in pages) {
            //     var _page = pages[u];
            //     if (_page._id === pageId) {
            //         return _page
            //     }
            // }
            var url = "/api/page/" + pageId;
            return $http.get(url);
        }

        function updatePage(pageId, page)  {
            // for (var u in pages) {
            //     var _page = pages[u];
            //     if (_page._id === pageId) {
            //         _page.name = page.name;
            //         _page.description = page.description;
            //     }
            // }
            var url = "/api/page/" + pageId;
            return $http.put(url, page);
        }
        
        function deletePage(pageId) {
            // for (var u in pages) {
            //     var _page = pages[u];
            //     if (pageId === _page._id) {
            //         pages.splice(u, 1);
            //     }
            // }
            var url = "/api/page/" + pageId;
            return $http.delete(url);
        }
    }

})();

