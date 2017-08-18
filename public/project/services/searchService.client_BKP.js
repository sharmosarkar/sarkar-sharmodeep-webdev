/**
 * Created by Sharmo on 8/2/2017.
 */

(function () {

    angular
        .module("musicHub")
        .factory("musicSearchService", musicSearchService);


    function musicSearchService($http, $q, $rootScope) {

        var musicxmatch_apiKey = '830c5ab5fa0278e0d7762458b9c9e2dc';
        var musicxmatch_endpoint = 'http://api.musixmatch.com/ws/1.1/';
        var itunes_lookup_url = 'https://itunes.apple.com/lookup';
        var itunes_search_url = 'https://itunes.apple.com/search';

        var api = {

            'searchArtist': searchArtist,
            'searchTrack': searchTrack,
            'searchiTunesById': searchiTunesById,
            'searchMusicxmatch_id': searchMusicxmatch_id,
            'searchmusicxmatch_lyrics': searchmusicxmatch_lyrics
        };
        return api;


        // itunes methods

        function searchArtist(entityKeyword) {
            var url = itunes_search_url + "?term=" + entityKeyword + "&entity=musicArtist&limit=10";
            return $http.get(url)
                .then(function (response) {
                    return {'type': 'ARTIST', 'data': response.data};
                });
        }

        function searchTrack(entityKeyword) {
            var url = itunes_search_url + "?term=" + entityKeyword + "&entity=musicTrack&limit=10";
            return $http.get(url)
                .then(function (response) {
                    return {'type': 'TRACK', 'data': response.data};
                });
        }

        function searchiTunesById(iTunes_id) {
            var url = itunes_lookup_url + '?id=' + iTunes_id;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }


        // musicxmatch methods

        function searchMusicxmatch_id(entityType, keyword) {
            var request_data = {
                apikey: musicxmatch_apiKey,
                f_has_lyrics: 1,
                s_track_rating: "desc",
                format: "jsonp",
                callback: "jsonp_callback"
            };
            if (entityType === 'TRACK') {
                var trackName = keyword.trackName;
                var artistName = keyword.artistName;
                request_data.q_track = trackName;
                request_data.q_artist = artistName;
            }
            var def = $q.defer();
            $.ajax({
                type: "GET",
                data: request_data,
                url: musicxmatch_endpoint + "track.search",
                dataType: "jsonp",
                jsonpCallback: 'jsonp_callback',
                contentType: 'application/json'
            }).done(function (data) {
                $rootScope.$apply(function () {
                    def.resolve(data.message.body);
                })

            }).fail(function (response) {
                $rootScope.$apply(function () {
                    def.reject(response);
                });
            });
            return def.promise;
        }


        function searchmusicxmatch_lyrics(track_id) {
            var request_data = {
                apikey: musicxmatch_apiKey,
                track_id: track_id,
                format: "jsonp",
                callback: "jsonp_callback"
            };
            var def = $q.defer();
            $.ajax({
                type: "GET",
                data: request_data,
                url: musicxmatch_endpoint + "track.lyrics.get",
                dataType: "jsonp",
                jsonpCallback: 'jsonp_callback',
                contentType: 'application/json'
            }).done(function (data) {
                $rootScope.$apply(function () {
                    def.resolve(data.message.body);
                })

            }).fail(function (response) {
                $rootScope.$apply(function () {
                    def.reject(response);
                });
            });
            return def.promise;

        }


    }

})();