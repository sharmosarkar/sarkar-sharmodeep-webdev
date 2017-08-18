/**
 * Created by Sharmo on 8/13/2017.
 */

(function () {

    angular
        .module("musicHub")
        .factory("playlistService", playlistService);


    function playlistService($http, $q) {

        var api =  {

            'findPlaylistByName' : findPlaylistByName,
            'createPlaylist': createPlaylist,
            'getAllPlaylistsForUser': getAllPlaylistsForUser,
            'updatePlaylist':updatePlaylist,
            'getAllPlaylist' : getAllPlaylist,
            'deletePlaylistById': deletePlaylistById,
            'deletePlaylistByUserId' : deletePlaylistByUserId
        };
        return api;

        function deletePlaylistByUserId(userId) {
            var url = '/api/musichub/playlist/deleteByUserId'+userId;
            return $http.delete(url);
        }

        function deletePlaylistById(playlistId) {
            var url = '/api/musichub/playlist/'+playlistId;
            return $http.delete(url);
        }

        function getAllPlaylist() {
            var url = '/api/musichub/playlist/allplaylist';
            return $http.get(url);
        }

        function findPlaylistByName(playlist_name, userId) {
            var url = '/api/musichub/playlist/findbyname?playlist='+playlist_name+'&userId='+userId;
            return $http.get(url);
        }

        function createPlaylist(playlist_name, trackId, userId){
            var track_list = [trackId];
            var playlist = {
                name : playlist_name,
                userId: userId,
                tracks : track_list
            };
            console.log('FROM PLAYLIST SERVICE CLIENT ');
            console.log(playlist);
            var url = '/api/musichub/playlist/create';
            return $http.post(url, playlist);
        }

        function getAllPlaylistsForUser(userId) {
            var url = '/api/musichub/playlist/getAllPlaylistsForUser?userId='+userId;
            var response =  $http.get(url);
            return response;
        }

        function updatePlaylist(playlistId, playlist){
            var url = "/api/musichub/playlist/" + playlistId;
            return $http.put(url, playlist);
        }

    }

})();