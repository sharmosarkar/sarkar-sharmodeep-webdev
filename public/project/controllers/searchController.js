/**
 * Created by Sharmo on 8/2/2017.
 */

(function () {
    angular
        .module("musicHub")
        .controller("searchController", searchController);


    function searchController(musicSearchService, playlistService, userService, $rootScope, $q,
                              $location, $sce, cacheService) {
        var model = this;

        model.searchArtist = searchArtist;
        model.searchTrack = searchTrack;
        model.searchLyrics = searchLyrics;
        model.addToPlayList = addToPlayList;
        model.getAllPlaylistsForUser = getAllPlaylistsForUser;
        model.updatePlayList = updatePlayList;
        model.searchUser = searchUser;
        model.addFollow = addFollow;
        model.artistDetailsView = artistDetailsView;
        model.userDetails = userDetails;
        model.addFavArtist = addFavArtist;


        function init() {
            // if ($rootScope.selected_Artist === undefined && $rootScope.user === undefined){
            //     $location.url("/");
            // }
            model.user = $rootScope.user;
            model.selected_artist = $rootScope.selected_Artist;
            console.log(model.user);
        }
        init();


        function addFavArtist(favArtist, userId) {
            cacheService
                .findArtistByIdandUserId(favArtist.id, userId)
                .then(function (data) {
                    if (data.data.length === 0){
                        cacheService
                            .addArtist(favArtist, userId)
                            .then(function (data) {
                                console.log(data);
                            })
                    }
                })
        }



        function userDetails(selectedUserId) {
            userService
                .findUserById(selectedUserId)
                .then(function (data) {
                    $rootScope.selected_User = data.data;
                    console.log(data);
                    $location.url('user');
                })
        }

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
            playlist.tracks.push(trackId);
            playlistService
                .updatePlaylist(playlist._id, playlist)
                .then(function (response) {
                    console.log('updated playlist');
                    console.log(response);
                })
        }

        function searchArtist(entityKeyword) {
            entityKeyword = entityKeyword.replace(/ /g, "+");
            var valid_artists = [];
            musicSearchService
                .searchArtist(entityKeyword)
                // .then(renderResults);
                .then(function (response) {
                    var retrieved_artists = response.data;
                    for (i=0; i<retrieved_artists.length; i++){
                        if(retrieved_artists[i].hasOwnProperty('spotify_id') || retrieved_artists[i].hasOwnProperty('youtube_id')){
                            if(retrieved_artists[i].hasOwnProperty('musicbrainz_image_url')){
                                var fileName =  retrieved_artists[i].musicbrainz_image_url.split('File:')[1];
                                retrieved_artists[i].imageUrl = fileName;
                            }
                            else{
                                retrieved_artists[i].imageUrl = 'images/fall_back_img.png';
                            }
                            if (retrieved_artists[i].hasOwnProperty('youtube_id'))
                            {
                                var embed_url = 'https://www.youtube.com/embed/' + retrieved_artists[i].youtube_id;
                                var trusted_url = $sce.trustAsResourceUrl(embed_url);
                                retrieved_artists[i].youtubeUrl = trusted_url;
                            }
                            valid_artists.push(retrieved_artists[i]);
                        }
                    }
                   musicSearchService
                        .getWikipediaImages(valid_artists)
                        .then(function(results){
                            for(i=0; i<results.length; i++){
                                if(results[i].query.pages != undefined){
                                    Object.keys(results[i].query.pages).forEach(function(key){
                                        var value = results[i].query.pages[key];
                                        valid_artists[i].imageUrl = value.imageinfo[0].url;
                                    });
                                }
                            }
                        });
                   console.log(valid_artists);
                   var entities = {type:"ARTIST", data:valid_artists};
                    renderResults(entities);

                });
        }

        function searchTrack(entityKeyword) {
            musicSearchService
                .searchTrack(entityKeyword)
                .then(renderResults);
        }

        function artistDetailsView(entity){
            $rootScope.selected_Artist = entity;
            $location.url("/artist");

        }

        function renderResults(entities) {
            console.log('FROM RENDER :::');
            console.log(entities);
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