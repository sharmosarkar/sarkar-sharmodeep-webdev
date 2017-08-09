/**
 * Created by Sharmo on 8/2/2017.
 */

(function () {

    angular
        .module("omdbApp")
        .factory("movieService", movieService);


    function movieService($http) {

        var api =  {

            'searchMovieByTitle' : searchMovieByTitle,
            'searchMovieByImdbId' : searchMovieByImdbId
        };
        return api;

        function searchMovieByImdbId(imdbID) {
            var url = "http://www.omdbapi.com/?i="+imdbID+"&apikey=852159f0";
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function searchMovieByTitle(movieTitle) {
            // var url = "http://www.omdbapi.com/?s="+movieTitle+"&apikey=852159f0";
            var url =  "https://itunes.apple.com/search?term="+movieTitle+"&entity=musicArtist&limit=10";
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }
    }

})();