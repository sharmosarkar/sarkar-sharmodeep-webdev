/**
 * Created by Sharmo on 8/13/2017.
 */

(function () {

    var playlistSchema = require("./playlistSchema.server");
    var db = require("./../../model/database_project");
    var playlistModel_project = db.model("playlistModel_project", playlistSchema);

    playlistModel_project.findPlaylist = findPlaylist;
    playlistModel_project.createPlaylist = createPlaylist;
    playlistModel_project.getAllPlaylistsForUser = getAllPlaylistsForUser;
    playlistModel_project.updatePlaylist = updatePlaylist;
    playlistModel_project.getAllPlaylist = getAllPlaylist;
    playlistModel_project.deletePlaylistById = deletePlaylistById;
    playlistModel_project.deletePlaylistByUserId = deletePlaylistByUserId;

    module.exports = playlistModel_project;

    function findPlaylist(playlist_name, userId) {
        return playlistModel_project
            .find({
            name: playlist_name, userId : userId
        })
    }

    function deletePlaylistById(playlistId) {
        return playlistModel_project
            .remove({
                '_id':playlistId
            })
    }

    function deletePlaylistByUserId(userId) {
        return playlistModel_project
            .remove({
                'userId':userId
            })
    }

    function createPlaylist(playlist) {
        return playlistModel_project
            .create(playlist);
    }

    function getAllPlaylistsForUser(userId) {
        var result =  playlistModel_project.find({userId : userId});
        return result;
    }

    function updatePlaylist(playlistId, playlist) {
        return playlistModel_project.update({_id: playlistId},
            {$set: playlist});
    }

    function getAllPlaylist() {
        return playlistModel_project.find();
    }


})();