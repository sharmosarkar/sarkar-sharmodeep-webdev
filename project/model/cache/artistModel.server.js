/**
 * Created by sharmo on 8/17/17.
 */


(function () {

    var artistSchema = require("./artistSchema.server");
    var db = require("./../../model/database_project");
    var artistCache_project = db.model("artistCache_project", artistSchema);

    artistCache_project.findArtistById = findArtistById;
    artistCache_project.addArtist = addArtist;
    artistCache_project.findArtistByUserId = findArtistByUserId;

    function findArtistById(artistId){
        var result =  artistCache_project.find({id : artistId});
        return result;
    }

    function addArtist(artist) {
        return artistCache_project
            .create(artist);
    }

    function findArtistByUserId(userId){
        var result =  artistCache_project.find({userId : userId});
        return result;
    }

    module.exports = artistCache_project;

})();