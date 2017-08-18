/**
 * Created by sharmo on 8/17/17.
 */


(function () {

    angular
        .module("musicHub")
        .factory("cacheService", cacheService);


    function cacheService($http, $q) {

        var api = {

            'findArtistByUserId': findArtistByUserId,
            'findArtistById': findArtistById,
            'addArtist': addArtist,
            'findArtistByIdandUserId': findArtistByIdandUserId
        };
        return api;

        function addArtist(artist_from_api, userId) {
            var artist = {
                country_of_origin : artist_from_api.country_of_origin,
                decade : artist_from_api.decade,
                id : artist_from_api.id,
                imageUrl : artist_from_api.imageUrl,
                main_genre : artist_from_api.main_genre,
                name : artist_from_api.name,
                spotify_id : artist_from_api.spotify_id,
                youtube_id : artist_from_api.youtube_id,
                userId : userId
            };
            var url = '/api/musichub/cache/addArtist';
            return $http.post(url, artist);
        }

        function findArtistById(artistId) {

        }

        function findArtistByUserId(userId) {
            var url = '/api/musichub/cache/findArtistByUserId?userId='+userId;
            return $http.get(url);
        }

        function findArtistByIdandUserId(artistId, userId) {
            var url = '/api/musichub/cache/findArtistByIdandUserId?artistId='+artistId+'&userId='+userId;
            return $http.get(url);
        }


    }

})();