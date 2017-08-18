/**
 * Created by Sharmo on 8/13/2017.
 */

(function () {
    var db = require("../database_project");

    var playlistSchema = db.Schema({
        name : String,
        userId : String,
        tracks : []
    } , {collection: "playlist_musichub"});

    module.exports = playlistSchema;

})();