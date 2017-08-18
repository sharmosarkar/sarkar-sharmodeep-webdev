/**
 * Created by Sharmo on 8/13/2017.
 */

(function () {

    var express = require("express");
    var Q = require("q");
    var router = express.Router();
    var playlistModel = require("../model/playlist/playlistModel.server");

    router.get('/findbyname', findPlaylistbyname);
    router.get('/getAllPlaylistsForUser', getAllPlaylistsForUser);
    router.get('/allplaylist', getAllPlaylist);
    router.post("/create", createPlaylist);
    router.put("/:playlistId", updatePlayList);
    router.delete("/deleteByUserId/:userId", deletePlaylistByUserId);
    router.delete("/:playlistId", deletePlaylistById);

    function getAllPlaylist(req, res) {
        playlistModel
            .getAllPlaylist()
            .then(function (response) {
                res.json(response);
            })
    }

    function deletePlaylistByUserId(req, res) {
        var userId = req.params.userId;
        playlistModel
            .deletePlaylistByUserId(userId)
            .then(function (response) {
                res.json(response);
            },function (err) {
                res.send(err);
            })
    }

    function deletePlaylistById(req, res) {
        var playlistId = req.params.playlistId;
        playlistModel
            .deletePlaylistById(playlistId)
            .then(function (response) {
                res.json(response);
            })
    }

    function findPlaylistbyname(req, res) {
        var playlistname = req.query.playlist;
        var userId = req.query.userId;
        if (playlistname && userId){
            playlistModel
                .findPlaylist(playlistname, userId)
                .then (function (playlist) {
                    res.json(playlist)
                }, function (err) {
                    res.send("0");
                })
        }
    }


    function getAllPlaylistsForUser(req, res) {
        var userId = req.query.userId;
        if (userId){
            playlistModel
                .getAllPlaylistsForUser(userId)
                .then(function (data) {
                    res.send(data);
                }, function (error) {
                    res.send("0");
                });
        }

    }



    function createPlaylist (req, res){
        var playlist = req.body;
        playlistModel
            .createPlaylist(playlist)
            .then(function (playlist) {
                res.json(playlist);
            })
    }


    function updatePlayList(req, res) {
        var playlist = req.body;
        var playlistId = req.params.playlistId;
        playlistModel
            .updatePlaylist(playlistId, playlist)
            .then(function (playlist) {
                res.json(playlist);
            })
    }


    module.exports = router;
})();
