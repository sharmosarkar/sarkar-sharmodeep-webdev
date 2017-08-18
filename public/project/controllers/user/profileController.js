/**
 * Created by sharmo on 8/11/17.
 */



(function () {
    angular
        .module("musicHub")
        .controller("profileController", profileController);

    function profileController($location, $routeParams, userService, $rootScope,
                               playlistService, musicSearchService, cacheService){

        var model = this;
        // var userId = $routeParams["userId"];

        model.updateUser = updateUser;
        model.unregister = unregister;
        model.searchEntity = searchEntity;
        model.renderPlaylist = renderPlaylist;
        model.selectedArtistDetails = selectedArtistDetails;
        model.selectedUserDetails = selectedUserDetails;

        function init() {
            // var promise = userService.findUserById(userId);
            // promise.then(function (response) {
            //     model.user = response.data;
            //     $rootScope.user = model.user;
            // });
            if ($rootScope.user === undefined){
                $location.url("/");
            }
            model.user = $rootScope.user;
            model.selected_User = $rootScope.selected_User;
            console.log(model.user);
            playlistService
                .getAllPlaylistsForUser(model.user._id)
                .then(function (response) {
                    model.user.playlist = response.data;
                });
            var promises = [];
            userService
                .findById_array(model.user.followers)
                .then(function (responses) {
                    model.user.followers_details = [];
                    for(i=0; i<=responses.length; i++){
                        if (responses[i] != undefined){
                            model.user.followers_details.push(responses[i].data);
                        }
                    }
                    console.log(model.user.followers_details);
                });
            userService
                .findById_array(model.user.following)
                .then(function (response) {
                    model.user.following_details = [];
                    for(i=0; i<=response.length; i++){
                        if (response[i] != undefined){
                            model.user.following_details.push(response[i].data);
                        }
                    }
                    console.log(model.user.following_details);
                });
            cacheService
                .findArtistByUserId(model.user._id)
                .then(function (response) {
                    model.user.fav_artists_details = response.data;
                })


        }
        init();

        function selectedArtistDetails(selected_artist) {
            $rootScope.selected_Artist = selected_artist;
            $location.url('artist');
        }

        function selectedUserDetails(selected_User) {
            $rootScope.selected_User = selected_User;
            $location.url('user');
        }

        function updateUser(user) {
            var result = userService.updateUser(user._id, user);
            // console.log(result);
            // console.log(result.$$state);
            // console.log(result.$$state.status);
            var status = result.$$state.status;
            if (status === 0){
                model.updateResult = '  Awesome, your Profile data has been updated !!'
                $location.url("profile");
            }
            else{
                model.updateResult = '  Oops!! Something went wrong! We couldn\'t find your Id in the database';
            }
            // model.updateResult = result;
            console.log(model.updateResult);
        }

        function unregister() {
            userService.deleteUser(userId);
            $location.url('login');
        }
        
        function searchEntity() {
            $location.url('search');
        }

        function renderPlaylist(playlist){
            var track_list = playlist.tracks;
            console.log(playlist.tracks);
            var track_details_list = [];
            for (var i=0; i<track_list.length; i++){
                musicSearchService
                    .searchiTunesById(track_list[i])
                    .then(function (response) {
                        track_details_list.push(response.results[0]);
                    });
            }

            model.track_details_list = track_details_list;
            console.log(model.track_details_list);
            closeAccordian(playlist);
        }

        function closeAccordian(playlist){
            for (i=0;i<model.user.playlist;i++){
                id = model.user.playlist[i].name;
                if (id != playlist.name){
                    $("#"+id).attr('aria-expanded', 'false');
                    $("#"+id+id).removeClass('show');
                }
            }
            $("#"+playlist.name+playlist.name).addClass('show');
            $("#"+playlist.name).attr('aria-expanded', 'true');
        }
    }



})();