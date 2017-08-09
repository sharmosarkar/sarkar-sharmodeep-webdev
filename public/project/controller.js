/**
 * Created by Sharmo on 8/2/2017.
 */

(function () {
    angular
        .module("omdbApp")
        .controller("searchController", searchController)
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



    function searchController(movieService) {
        var model = this;

        model.searchMovieByTitle = searchMovieByTitle;

        function init() {

        }
        init();

        function searchMovieByTitle(movieTitle) {
            movieService
                .searchMovieByTitle(movieTitle)
                .then(renderMovies);
        }

        function renderMovies(movies) {
            model.movies = movies;
            console.log(model.movies);
        }
    }

})();