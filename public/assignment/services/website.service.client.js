/**
 * Created by Sharmo on 7/23/2017.
 */

(function () {

    angular
        .module("WamApp")
        .factory("websiteService", websiteService);

    function websiteService() {

        // data in service
        var websites = [
                { "_id": "123", "name": "Facebook",    "developerId": "456", "description": "Lorem" },
                { "_id": "234", "name": "Tweeter",     "developerId": "456", "description": "Lorem" },
                { "_id": "456", "name": "Gizmodo",     "developerId": "456", "description": "Lorem" },
                { "_id": "890", "name": "Go",          "developerId": "123", "description": "Lorem" },
                { "_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "Lorem" },
                { "_id": "678", "name": "Checkers",    "developerId": "123", "description": "Lorem" },
                { "_id": "789", "name": "Chess",       "developerId": "234", "description": "Lorem" }
            ];

        var api =  {

            'createWebsite' : createWebsite,
            'findWebsitesByUser' : findWebsitesByUser,
            'findWebsiteById' : findWebsiteById,
            'updateWebsite': updateWebsite,
            'deleteWebsite': deleteWebsite
        };
        return api;
        
        function createWebsite(userId, website) {
            var total_existing_websites = websites.length;
            var new_website_id = (total_existing_websites+1)+''+(total_existing_websites+2)+''+(total_existing_websites+3);
            var website_new = {};
            website_new._id = new_website_id;
            website_new.name = website.name;
            website_new.description = website.description;
            website_new.developerId = userId;
            websites.push(website_new);
            // console.log(websites);
        }

        function findWebsitesByUser(userId) {
            var website_list = [];
            for (var u in websites) {
                var _website = websites[u];
                if (_website.developerId === userId ) {
                    website_list.push(_website);
                }
            }
            return website_list;
        }
        
        function findWebsiteById(websiteId){
            for (var u in websites) {
                var _website = websites[u];
                if (websiteId === _website._id){
                    return _website;
                }
            }
        }
        
        function updateWebsite(websiteId, website) {
            for (var u in websites) {
                var _website = websites[u];
                if (websiteId === _website._id){
                    _website.name = website.name;
                    _website.description = website.description;
                }
            }
        }
        
        function deleteWebsite(websiteId) {
            for (var u in websites) {
                var _website = websites[u];
                if (websiteId === _website._id) {
                    websites.splice(u, 1);
                }
            }
        }


    }

})();
