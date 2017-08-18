/**
 * Created by sharmo on 8/17/17.
 */

(function () {

    var express = require("express");
    var Q = require("q");
    var router = express.Router();
    var artistCacheModel = require("../model/cache/artistModel.server");

    router.get('/findArtistByUserId', findArtistByUserId);
    router.get('/findArtistById', findArtistById);
    router.get('/findArtistByIdandUserId', findArtistByIdandUserId);
    router.post("/addArtist", addArtist);

    function findArtistByUserId(req, res) {
        var userId = req.query.userId;
        artistCacheModel
            .findArtistByUserId(userId)
            .then(function (data) {
                res.json(data);
            })
    }

    function findArtistById(req, res) {
        var artistId = req.query.artistId;
        artistCacheModel
            .findArtistById(artistId)
            .then(function (data) {
                res.json(data);
            })

    }

    function addArtist(req, res) {
        var artist = req.body;
        artistCacheModel
            .addArtist(artist)
            .then(function (data) {
                res.json(data);
            })
    }

    function findArtistByIdandUserId(req, res){
        var artistId = req.query.artistId;
        var userId = req.query.userId;
        artistCacheModel
            .find({
                id:artistId,
                userId:userId
            })
            .then(function (data) {
                res.json(data);
            })
    }


    module.exports = router;

})();
