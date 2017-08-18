/**
 * Created by sharmo on 8/10/17.
 */


(function () {
    angular
        .module("musicHub")
        .controller("detailsController", detailsController);

    function detailsController($routeParams, movieService) {
        var model = this;

        var imdbID = $routeParams.imdbID;

        function init() {
            movieService
                .searchMovieByImdbId(imdbID)
                .then(renderMovie);
        }
        init();

        function renderMovie(movie) {
            model.movie = movie;
        }
    }


})();