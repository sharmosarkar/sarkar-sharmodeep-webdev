/**
 * Created by sharmo on 8/11/17.
 */



(function () {
    angular
        .module("musicHub")
        .controller("adminController", adminController);

    function adminController(userService, $rootScope, playlistService) {

        var model = this;

        model.deletePlaylist = deleteUserPlaylist;
        model.deleteUser = deleteUser;

        function init() {
            model.admin = $rootScope.user;
            userService
                .getAllUsers()
                .then(function (response) {
                    model.admin.users = response.data;
                    console.log(model.admin.users);
                });
            playlistService
                .getAllPlaylist()
                .then(function (response) {
                    model.admin.playlist = response.data;
                    console.log(model.admin.playlist);
                    for(i=0;i<model.admin.playlist.length;i++){
                        model.admin.playlist[i].trackCount = model.admin.playlist[i].tracks.length;
                    }
                    var user_playlists;
                    userService
                        .getUserNames_array(model.admin.playlist)
                        .then(function (response) {
                            user_playlists = response;
                            console.log(user_playlists);
                            for (i=0; i<user_playlists.length; i++){
                                if (user_playlists[i].data != null){
                                    model.admin.playlist[i].username = user_playlists[i].data.username;
                                }
                            }
                        })
                });


        }

        init();


        function deleteUserPlaylist(playlistId) {
            playlistService
                .deletePlaylistById(playlistId)
                .then(function (response) {
                    console.log(response);
                })
        }
        
        function deleteUser(userId) {
            userService
                .deleteUser(userId)
                .then(function (response) {
                    console.log(response);
                    playlistService
                        .deletePlaylistByUserId(userId)
                        .then(function (response) {
                            console.log(response);
                        })
                })
        }

    }


})();