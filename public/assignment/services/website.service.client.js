/**
 * Created by Sharmo on 7/23/2017.
 */

(function () {

    angular
        .module("WamApp")
        .factory("websiteService", websiteService);

    function websiteService($http) {


        var api =  {

            'createWebsite' : createWebsite,
            'findWebsitesByUser' : findWebsitesByUser,
            'findWebsiteById' : findWebsiteById,
            'updateWebsite': updateWebsite,
            'deleteWebsite': deleteWebsite
        };
        return api;
        
        function createWebsite(userId, website) {
            // var total_existing_websites = websites.length;
            // var new_website_id = (total_existing_websites+1)+''+(total_existing_websites+2)+''+(total_existing_websites+3);
            // var website_new = {};
            // website_new._id = new_website_id;
            // website_new.name = website.name;
            // website_new.description = website.description;
            // website_new.developerId = userId;
            // websites.push(website_new);
            // console.log(websites);
            var url = "/api/user/" + userId + "/website";
            return $http.post(url, website);
        }

        function findWebsitesByUser(userId) {
            // var website_list = [];
            // for (var u in websites) {
            //     var _website = websites[u];
            //     if (_website.developerId === userId ) {
            //         website_list.push(_website);
            //     }
            // }
            // return website_list;
            var url = "/api/user/" + userId + "/website";
            return $http.get(url)
                .then(function (response) {
                    // console.log(response.data);
                    return response.data;
                });
        }
        
        function findWebsiteById(userId, websiteId){
            // for (var u in websites) {
            //     var _website = websites[u];
            //     if (websiteId === _website._id){
            //         return _website;
            //     }
            // }
            var url = "/api/website/" + websiteId;
            return $http.get(url);
        }
        
        function updateWebsite(websiteId, website) {
            // for (var u in websites) {
            //     var _website = websites[u];
            //     if (websiteId === _website._id){
            //         _website.name = website.name;
            //         _website.description = website.description;
            //     }
            // }
            var url = "/api/website/" + websiteId;
            return $http.put(url, website);
        }
        
        function deleteWebsite(websiteId) {
            // for (var u in websites) {
            //     var _website = websites[u];
            //     if (websiteId === _website._id) {
            //         websites.splice(u, 1);
            //     }
            // }
            var url = "/api/website/" + websiteId;
            return $http.delete(url);
        }


    }

})();
