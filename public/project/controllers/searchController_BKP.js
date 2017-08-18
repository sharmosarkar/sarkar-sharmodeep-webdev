/**
 * Created by Sharmo on 8/2/2017.
 */

(function () {
    angular
        .module("musicHub")
        .controller("searchController", searchController);


    function searchController(musicSearchService, playlistService, userService, $rootScope) {
        var model = this;

        model.searchArtist = searchArtist;
        model.searchTrack = searchTrack;
        model.searchLyrics = searchLyrics;
        model.addToPlayList = addToPlayList;
        model.getAllPlaylistsForUser = getAllPlaylistsForUser;
        model.updatePlayList = updatePlayList;
        model.searchUser = searchUser;
        model.addFollow = addFollow;


        function init() {
            model.user = $rootScope.user;
            console.log(model.user);
        }
        init();

        function getAllPlaylistsForUser() {
            playlistService
                .getAllPlaylistsForUser(model.user._id)
                .then(function (response) {
                    console.log(response);
                    model.user.playlist = response.data;
                });
        }

        function searchUser(keyword) {
            model.entityType = "USER";
            var retrieved_user_list = [];
            userService
                .findUserByUsername(keyword)
                .then(function (response) {
                    console.log(response);
                    if (response.data != "0"){
                        var user_list = response.data;
                        for (var i=0; i<user_list.length; i++){
                            var _user = user_list[i];
                            retrieved_user_list.push(_user);
                        }
                    }
                    userService
                        .findByFirstName(keyword)
                        .then(function (response) {
                            if (response.data != "0") {
                                var user_list = response.data;
                                for (var i = 0; i < user_list.length; i++) {
                                    var _user = user_list[i];
                                    retrieved_user_list.push(_user);
                                }
                            }
                            userService
                                .findByLastName(keyword)
                                .then(function (response) {
                                    if (response.data != "0") {
                                        var user_list = response.data;
                                        for (var i = 0; i < user_list.length; i++) {
                                            var _user = user_list[i];
                                            retrieved_user_list.push(_user);
                                        }
                                    }
                                    console.log(retrieved_user_list);
                                    model.retrieved_user_list = retrieved_user_list;
                                });
                        });

                });


        }

        function addToPlayList(playlist, trackId) {
            console.log(playlist + '\t'+ trackId);
            playlistService
                .createPlaylist(playlist, trackId, model.user._id)
                .then(function (data) {
                    console.log(data);
                });
        }


        function addFollow(userId_following){
            console.log(userId_following);
            console.log(model.user._id);
            userService
                .findUserById(model.user._id)
                .then(function (data) {
                    var _user = data.data;
                    var following_list = _user.following;
                    if (!following_list.includes(userId_following)){
                        following_list.push(userId_following);
                    }
                    _user.following = following_list;
                    userService
                        .updateUser(model.user._id, _user)
                        .then(function(data){
                            userService
                                .findUserById(userId_following)
                                .then(function (data) {
                                    var _friend = data.data;
                                    // console.log(_friend);
                                    var follower_list = _friend.followers;
                                    if (!follower_list.includes(userId_following)){
                                        follower_list.push(model.user._id);
                                    }
                                    _friend.followers = follower_list;
                                    userService
                                        .updateUser(userId_following, _friend)
                                        .then(function (response) {
                                            // console.log(response);
                                        })
                                })
                        })
                })
        }


        function updatePlayList(playlist, trackId){
            console.log(playlist + '\t'+ trackId);
            console.log(playlist);
            if (!playlist.tracks.includes(trackId)){
                playlist.tracks.push(trackId);
                playlistService
                    .updatePlaylist(playlist._id, playlist)
                    .then(function (response) {
                        console.log('updated playlist');
                        console.log(response);
                    })
            }
            else{
                console.log('Playlist already contains this track');
            }

        }

        function searchArtist(entityKeyword) {
            musicSearchService
                .searchArtist(entityKeyword)
                .then(renderResults);
        }

        function searchTrack(entityKeyword) {
            musicSearchService
                .searchTrack(entityKeyword)
                .then(renderResults);
        }

        function renderResults(entities) {
            model.entities = entities.data;
            model.entityType = entities.type;
            // console.log(model.entities);
            console.log(model.entityType);
        }

        function searchLyrics(trackName, artistName) {
            var keyword = {};
            keyword.trackName = trackName.replace(/ /g, "+");
            keyword.artistName = artistName.replace(/ /g, "+");
            var entityType = "TRACK";
            musicSearchService
                .searchMusicxmatch_id(entityType, keyword)
                .then(function (response) {
                    var track_list = response.track_list;
                    console.log(track_list);
                    var musicxmatch_id = '';
                    for (i=0; i<track_list.length; i++ ){
                        if (track_list[i] != undefined){
                            musicxmatch_id =  track_list[i].track.track_id;
                            break;
                        }
                    }
                    if (musicxmatch_id === ''){
                        model.lyrics = 'Sorry, Lyrics for this song is not available with our lyrics partner  (MusicXmatch.com)';
                        console.log(model.lyrics);
                        return;
                    }
                    musicSearchService
                        .searchmusicxmatch_lyrics(musicxmatch_id)
                        .then(function (response) {
                            model.lyrics = response.lyrics.lyrics_body;
                            if (model.lyrics === ""){
                                model.lyrics = 'Sorry, Lyrics for this song is not available with our lyrics partner  (MusicXmatch.com)';
                            }
                            console.log(model.lyrics);
                            console.log(response);
                        });
                });
        }
    }

})();