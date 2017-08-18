/**
 * Created by sharmo on 8/17/17.
 */


(function () {
    var db = require("../database_project");

    var artistSchema = db.Schema({
        country_of_origin : String,
        decade : String,
        id : String,
        imageUrl : String,
        main_genre : String,
        name : String,
        spotify_id : String,
        youtube_id : String,
        userId : String
    } , {collection: "artist_cache_musichub"});

    module.exports = artistSchema;

})();