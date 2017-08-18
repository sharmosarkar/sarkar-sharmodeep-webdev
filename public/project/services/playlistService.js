/**
 * Created by Sharmo on 8/13/2017.
 */

(function () {

    angular
        .module("musicHub")
        .factory("playlistService", playlistService);


    function playlistService($http, $q, $rootScope) {

        var api =  {

            'getPlaylist' : getPlaylist
        };
        return api;

        function getPlaylist() {

        }

    }

})();