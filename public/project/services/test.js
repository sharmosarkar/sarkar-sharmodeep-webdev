/**
 * Created by sharmo on 8/11/17.
 */

/**
 * Created by Sharmo on 8/2/2017.
 */

(function() {

    angular
        .module("musicHub")
        .factory("musicSearchService", musicSearchService);


    function musicSearchService($http) {

        var musicxmatch_apiKey = '830c5ab5fa0278e0d7762458b9c9e2dc';
        var musicxmatch_endpoint = 'http://api.musixmatch.com/ws/1.1/';

        var api = {

            'searchArtist': searchArtist,
            'searchTrack': searchTrack,
            'searchLyrics': searchLyrics
        };
        return api;

        function searchMovieByImdbId(imdbID) {
            var url = "http://www.omdbapi.com/?i=" + imdbID + "&apikey=852159f0";
            return $http.get(url)
                .then(function(response) {
                    return response.data;
                });
        }

        function searchArtist(entityKeyword) {
            // var url = "http://www.omdbapi.com/?s="+movieTitle+"&apikey=852159f0";
            var url = "https://itunes.apple.com/search?term=" + entityKeyword + "&entity=musicArtist&limit=10";
            return $http.get(url)
                .then(function(response) {
                    return { 'type': 'ARTIST', 'data': response.data };
                });
        }

        function searchTrack(entityKeyword) {
            var url = "https://itunes.apple.com/search?term=" + entityKeyword + "&entity=musicTrack&limit=10";
            return $http.get(url)
                .then(function(response) {
                    return { 'type': 'TRACK', 'data': response.data };
                });
        }


        function searchLyrics(trackName, artistName) {
            var data = { 'trackName': trackName, 'artistName': artistName };
            var l = getMusicxmatch_id(data, 'TRACK');
            console.log(l);
            console.log('ss');
        }

        function getMusicxmatch_id(keyword, entityType) {
            if (entityType === 'TRACK') {
                var trackName = keyword.trackName;
                var artistName = keyword.artistName;
            };
            console.log(keyword);
            //Bijesh Changes Start
            $scope.fetch = function() {
                var def = $q.defer();
                $.ajax({
                    type: "GET",
                    data: {
                        apikey: "830c5ab5fa0278e0d7762458b9c9e2dc",
                        q_track: "back to december",
                        q_artist: "taylor%20swift",
                        f_has_lyrics: 1,
                        format: "jsonp",
                        callback: "jsonp_callback"
                    },
                    url: "http://api.musixmatch.com/ws/1.1/track.search",
                    dataType: "jsonp",
                    jsonpCallback: 'jsonp_callback',
                    contentType: 'application/json'
                }).done(function(data) {
                    $scope.$apply(function() {
                        def.resolve(data);
                    });
                })
                    .fail(function(response) {
                        $scope.$apply(function() {
                            def.reject(response);
                        });
                    });
                return def.promise;
            };

            $scope.fetch().then(function(data) {
                    console.log(data);
                    return data;
                },
                function(data) {
                    console.log('albums retrieval failed.')
                    return data;
                });
            //Bijesh Changes End
            // var options = {
            //     type: "GET",
            //     url: 'http://api.musixmatch.com/ws/1.1/track.search',
            //     qs:
            //         {   q_track:trackName,
            //             q_artist:artistName,
            //             s_track_rating: 'desc',
            //             apikey: '830c5ab5fa0278e0d7762458b9c9e2dc',
            //             f_has_lyrics: 1//,
            //             // format:"jsonp",
            //             // callback:"jsonp_callback"
            //         },
            //     // dataType: "jsonp",
            //     // jsonpCallback: 'jsonp_callback',
            //     contentType: 'application/json'
            // };

            // if (entityType === 'TRACK'){
            //     var url = musicxmatch_endpoint+'track.search?q_track='+keyword+'&page_size=1&page=1&s_track_rating=desc&apikey='+musicxmatch_apiKey;
            //     return $http.get(url)
            //         .then(function (response) {
            //             return response.data
            //             // console.log(response.data);
            //         });
            // }

            // return $.ajax({
            //     type: "GET",
            //     data: {
            //         apikey:musicxmatch_apiKey,
            //         q_track:trackName,//"back to december",
            //         q_artist:artistName,//"taylor%20swift",
            //         s_track_rating:"desc",
            //         f_has_lyrics: 1,
            //         format:"jsonp",
            //         callback:"jsonp_callback"
            //     },
            //     url: "http://api.musixmatch.com/ws/1.1/track.search",
            //     dataType: "jsonp",
            //     jsonpCallback: 'jsonp_callback',
            //     contentType: 'application/json'
            // }).then(function (data) {
            //     console.log(data);
            //     //  res.data;
            // })

            return $http({
                method: "GET",
                params: {
                    apikey: musicxmatch_apiKey,
                    q_track: trackName, //"back to december",
                    q_artist: artistName, //"taylor%20swift",
                    s_track_rating: "desc",
                    f_has_lyrics: 1,
                    format: "jsonp",
                    callback: "JSON.parse"
                },
                url: "http://api.musixmatch.com/ws/1.1/track.search",
                dataType: "jsonp",
                jsonpCallback: JSON.parse,
                contentType: 'application/json'
            })
                .then(function(response) {
                    return response.data;
                });



        }
    }

})();















// $(function(){
//
//     $.ajax({
//         type: "GET",
//         data: {
//             apikey:"830c5ab5fa0278e0d7762458b9c9e2dc",
//             q_track:"back to december",
//             q_artist:"taylor%20swift",
//             f_has_lyrics: 1,
//             format:"jsonp",
//             callback:"jsonp_callback"
//         },
//         url: "http://api.musixmatch.com/ws/1.1/track.search",
//         dataType: "jsonp",
//         jsonpCallback: 'jsonp_callback',
//         contentType: 'application/json',
//         success: function(data) {
//             console.log(data);
//         },
//         error: function(jqXHR, textStatus, errorThrown) {
//             console.log(jqXHR);
//             console.log(textStatus);
//             console.log(errorThrown);
//         }
//     });
// });